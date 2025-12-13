import { fileURLToPath } from 'node:url'
import { getCollection } from 'astro:content'
import fs from 'node:fs/promises'
import lunr from 'lunr'
import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import Compress from 'astro-compress'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import rehypeMermaid from 'rehype-mermaid'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkMath from 'remark-math'
import UnoCSS from 'unocss/astro'
import { base, defaultLocale, themeConfig } from './src/config'
import { langMap } from './src/i18n/config'
import { rehypeCodeCopyButton } from './src/plugins/rehype-code-copy-button.mjs'
import { rehypeExternalLinks } from './src/plugins/rehype-external-links.mjs'
import { rehypeHeadingAnchor } from './src/plugins/rehype-heading-anchor.mjs'
import { rehypeImageProcessor } from './src/plugins/rehype-image-processor.mjs'
import { remarkContainerDirectives } from './src/plugins/remark-container-directives.mjs'
import { remarkLeafDirectives } from './src/plugins/remark-leaf-directives.mjs'
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs'

const { url: site } = themeConfig.site
const { imageHostURL } = themeConfig.preload ?? {}
const imageConfig = imageHostURL
  ? { image: { domains: [imageHostURL], remotePatterns: [{ protocol: 'https' }] } }
  : {}

// Custom Astro Integration for Lunr.js search index generation
function lunrSearchIntegration() {
  return {
    name: 'lunr-search-integration',
    hooks: {
      'build:done': async ({ logger }) => {
        logger.info('Generating Lunr.js search index...');

        // Ensure these imports are correctly resolved by Astro's build system
        // getCollection can only be used in Astro files or build-time integrations
        const { getCollection } = await import('astro:content');

        const allPosts = await getCollection('posts');
        const allAbouts = await getCollection('about');
        const allCasual = await getCollection('casual');

        const documents = [];

        // Process posts
        for (const post of allPosts) {
          documents.push({
            id: post.id,
            title: post.data.title,
            content: post.body,
            url: `/posts/${post.slug}`,
            lang: post.slug.split('/')[0],
          });
        }

        // Process about pages
        for (const about of allAbouts) {
          documents.push({
            id: about.id,
            title: about.data.title,
            content: about.body,
            url: `/about/${about.slug}`,
            lang: about.slug.split('/')[0],
          });
        }

        // Process casual content
        for (const casual of allCasual) {
          documents.push({
            id: casual.id,
            title: casual.data.title,
            content: casual.body,
            url: `/casual/${casual.slug}`,
            lang: casual.slug.split('/')[0],
          });
        }

        const idx = lunr(function () {
          this.ref('id');
          this.field('title', { boost: 10 });
          this.field('content');
          this.field('lang');

          documents.forEach(function (doc) {
            this.add(doc);
          }, this);
        });

        const serializedIdx = JSON.stringify(idx);
        const serializedDocs = JSON.stringify(documents);

        const publicDir = fileURLToPath(new URL('./public', import.meta.url));
        await fs.mkdir(publicDir, { recursive: true });

        await fs.writeFile(new URL('./search-index.json', publicDir), serializedIdx);
        await fs.writeFile(new URL('./search-documents.json', publicDir), serializedDocs);

        logger.info('Lunr.js search index and documents generated successfully!');
      },
    },
  };
}

export default defineConfig({
  adapter: vercel(),
  site,
  base,
  trailingSlash: 'always', // Not recommended to change
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport', // hover, tap, viewport, load
  },
  ...imageConfig,
  i18n: {
    locales: Object.entries(langMap).map(([path, codes]) => ({
      path,
      codes: [...codes] as [string, ...string[]],
    })),
    defaultLocale,
  },
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    mdx(),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag'],
      },
    }),
    sitemap(),
    Compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: false,
    }),
    lunrSearchIntegration(),
  ],
  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkMath,
      remarkContainerDirectives,
      remarkLeafDirectives,
      remarkReadingTime,
    ],
    rehypePlugins: [
      rehypeKatex,
      [rehypeMermaid, { strategy: 'pre-mermaid' }],
      rehypeSlug,
      rehypeHeadingAnchor,
      rehypeImageProcessor,
      rehypeExternalLinks,
      rehypeCodeCopyButton,
    ],
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    shikiConfig: {
      // Available themes: https://shiki.style/themes
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  vite: {
    plugins: [
      {
        name: 'prefix-font-urls-with-base',
        transform(code, id) {
          if (!id.endsWith('src/styles/font.css')) {
            return null
          }

          return code.replace(/url\("\/fonts\//g, `url("${base}/fonts/`)
        },
      },
    ],
  },
  devToolbar: {
    enabled: false,
  },
})
