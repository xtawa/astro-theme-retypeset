---
title: Theme Guide
published: 2025-01-26
updated: 2025-04-13
tags:
  - Blog Theme
  - Guide
pin: 0
lang: en
abbrlink: theme-guide
---

Retypeset is a static blog theme based on the [Astro](https://astro.build/) framework. This article is a guide to getting started with the Retypeset theme, mainly introducing how to modify the theme configuration and create new posts to help you quickly build a personal blog.

## Theme Configuration

Customize your blog by modifying the configuration file [src/config.ts](https://github.com/radishzzz/astro-theme-retypeset/blob/master/src/config.ts).

### Site Information

```ts
site: {
  // Site title
  title: 'Retypeset'
  // Site subtitle
  subtitle: 'Revive the beauty of typography'
  // Site description
  description: 'Retypeset is a static blog theme...'
  // Use i18n title/subtitle/description from src/i18n/ui.ts instead of static ones above
  i18nTitle: true // true | false
  // Author name
  author: 'radishzz'
  // Site URL
  url: 'https://retypeset.radishzz.cc'
  // Base path
  // Root directory for all pages and assets
  base: '/' // e.g., '/blog', '/docs'
  // Favicon URL
  // Recommended formats: svg, png, ico
  favicon: '/icons/favicon.svg' // or https://example.com/favicon.svg
}
```

### Theme Colors

```ts
color: {
  // Default theme mode
  mode: 'light' // light | dark | auto
  // Light mode
  light: {
    // Primary color
    // Used for site title, hover effects, etc.
    primary: 'oklch(25% 0.005 298)'
    // Secondary color
    // Used for normal text
    secondary: 'oklch(40% 0.005 298)'
    // Background color
    background: 'oklch(96% 0.005 298)'
    // Highlight color
    // Used for navbar, selected text, etc.
    highlight: 'oklch(0.93 0.195089 103.2532 / 0.5)'
  }
  // Dark mode
  dark: {
    // Primary color
    primary: 'oklch(92% 0.005 298)'
    // Secondary color
    secondary: 'oklch(77% 0.005 298)'
    // Background color
    background: 'oklch(22% 0.005 298)'
    // Highlight color
    highlight: 'oklch(0.93 0.195089 103.2532 / 0.5)'
  }
}
```

### Global Settings

```ts
global: {
  // Default language
  // Language for the site root path '/'
  locale: 'zh' // de | en | es | fr | ja | ko | pl | pt | ru | zh | zh-tw
  // More languages
  // Generates multi-language paths like '/en/', '/es/'
  // Do not repeat the default language, can be empty []
  moreLocales: ['en', 'es', 'ja', 'ru', 'zh-tw'] // ['de', 'en', 'es', 'fr', 'ja', 'ko', 'pl', 'pt', 'ru', 'zh', 'zh-tw']
  // Font style
  fontStyle: 'sans' // sans | serif
  // Post date format
  // YYYY-MM-DD | MM-DD-YYYY | DD-MM-YYYY | MMM D YYYY | D MMM YYYY
  // 2025-04-13, 04-13-2025, 13-04-2025, Apr 13 2025，13 Apr 2025
  dateFormat: 'YYYY-MM-DD'
  // Enable Table of Contents
  toc: true // true | false
  // Enable KaTeX math rendering
  katex: true // true | false
  // Reduce motion
  reduceMotion: false // true | false
}
```

### Comment System

```ts
comment: {
  // Enable comment system
  enabled: true // true | false
  // Giscus comment system
  giscus: {
    repo: ''
    repoId: ''
    category: ''
    categoryId: ''
    mapping: 'pathname'
    strict: '0'
    reactionsEnabled: '1'
    emitMetadata: '0'
    inputPosition: 'bottom'
  }
  // Twikoo comment system
  twikoo: {
    envId: ''
    // version: Frontend version can be changed in package.json
  }
  // Waline comment system
  waline: {
    // Server URL
    serverURL: 'https://retypeset-comment.radishzz.cc'
    // Emoji URL
    emoji: [
      'https://unpkg.com/@waline/emojis@1.2.0/tw-emoji'
      // 'https://unpkg.com/@waline/emojis@1.2.0/bmoji'
      // More emojis: https://waline.js.org/en/guide/features/emoji.html
    ]
    // GIF search
    search: false // true | false
    // Image uploader
    imageUploader: false // true | false
  }
}
```

### SEO Settings

```ts
seo: {
  // @twitter ID
  twitterID: '@radishzz_'
  // Site verification
  verification: {
    // Google Search Console
    google: 'AUCrz5F1e5qbnmKKDXl2Sf8u6y0kOpEO1wLs6HMMmlM'
    // Bing Webmaster Tools
    bing: '64708CD514011A7965C84DDE1D169F87'
    // Yandex Webmaster
    yandex: ''
    // Baidu Webmaster
    baidu: ''
  }
  // Google Analytics
  googleAnalyticsID: ''
  // Umami Analytics
  umamiAnalyticsID: 'dab0e4b9-9cbf-43c3-af60-b09d3b545c38'
  // Follow verification
  follow: {
    // Feed ID
    feedID: ''
    // User ID
    userID: ''
  }
  // ApiFlash access key
  // Generate website screenshots for open graph images
  // Get access key: https://apiflash.com/
  apiflashKey: ''
}
```

### Custom Footer

```ts
footer: {
  // Social links
  links: [
    {
      name: 'RSS',
      url: '/atom.xml', // or /rss.xml
    },
    {
      name: 'GitHub',
      url: 'https://github.com/radishzzz/astro-theme-retypeset',
    },
    {
      name: 'Email',
      url: 'email@radishzz.cc',
    }
    // {
    //   name: 'X',
    //   url: 'https://x.com/radishzz_',
    // },
  ]
  // Start year
  startYear: 2025
}
```

### Resource Preloading

```ts
preload: {
  // Image hosting URL
  // Optimize remote images and generate low-quality placeholders
  imageHostURL: 'image.radishzz.cc'
  // Custom Google Analytics JS
  // For users who proxy tracking scripts to a custom domain
  customGoogleAnalyticsJS: ''
  // Custom Umami Analytics JS
  // For users who self-deploy Umami or proxy tracking scripts to a custom domain
  customUmamiAnalyticsJS: 'https://views.radishzz.cc/script.js'
}
```

## More Configuration

In addition to the configuration file `src/config.ts`, there are some configuration items located in other files.

### Syntax Highlighting

Syntax highlighting theme for code blocks.

```ts
// astro.config.ts

shikiConfig: {
  // Available themes: https://shiki.style/themes
  // Background color follows the blog theme, not the syntax highlighting theme
  themes: {
    light: 'github-light' // Light theme
    dark: 'github-dark' // Dark theme
  }
}
```

### Post Excerpt

Character count for automatic post excerpts.

```ts
// src/utils/description.ts

const excerptLengths: Record<ExcerptScene, {
  cjk: number // Chinese, Japanese, Korean
  other: number // Other languages
}> = {
  list: { // Homepage post list
    cjk: 120, // First 120 characters for excerpt
    other: 240, // First 240 characters for excerpt
  },
}
```

### Open Graph

[Open Graph Social Card](https://orcascan.com/tools/open-graph-validator?url=https%3A%2F%2Fretypeset.radishzz.cc%2Fposts%2Ftheme-guide%2F) style.

```ts
// src/pages/og/[...image].ts

getImageOptions: (_path, page) => ({
  logo: {
    path: './public/icons/og-logo.png', // Local path to PNG image
    size: [250], // Logo width
  },
  font: {
    title: { // Title
      families: ['Noto Sans SC'], // Font family
      weight: 'Bold', // Font weight
      color: [34, 33, 36], // Color
      lineHeight: 1.5, // Line height
    },
  },
  fonts: [ // Font paths (local or remote)
    'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/SubsetOTF/SC/NotoSansSC-Bold.otf',
    'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/SubsetOTF/SC/NotoSansSC-Regular.otf',
  ],
  bgGradient: [[242, 241, 245]], // Background color
  // More config: https://github.com/delucis/astro-og-canvas/tree/latest/packages/astro-og-canvas
})
```

### RSS Feed

[RSS Feed Page](https://retypeset.radishzz.cc/atom.xml) colors.

```html
<!-- public/feeds/xxx-style.xsl -->

<style type="text/css">
body{color:oklch(25% 0.005 298)} /* Font color */
.bg-white{background-color:oklch(0.96 0.005 298)!important} /* Background color */
.text-gray{color:oklch(0.25 0.005 298 / 75%)!important} /* Secondary font color */
</style>
```

## Create New Post

Run `pnpm new-post <filename>` to create a new post, which can be edited in the `src/content/posts/` directory.

```bash
pnpm new-post                      ->  src/content/posts/new-post.md
pnpm new-post first-post           ->  src/content/posts/first-post.md
pnpm new-post 2025/03/first-post   ->  src/content/posts/2025/03/first-post.md
pnpm new-post first-post.mdx       ->  src/content/posts/first-post.mdx
```

### Front Matter

`title` and `published` are required, other configurations can be deleted.

```md
---
# Required
title: Theme Guide
published: 2025-01-26

# Optional
description: Automatically selects the first 120 characters as the excerpt.
updated: 2025-03-26
tags:
  - Blog Theme
  - Guide

# Advanced, Optional
draft: true/false
pin: 0-99
toc: true/false
lang: de/en/es/fr/ja/ko/pl/pt/ru/zh/zh-tw
abbrlink: theme-guide
---
```

### Advanced Configuration

#### draft

Whether to mark the post as a draft. When set to true, the post cannot be published and is only for local development preview. Default is false.

#### pin

Whether to pin the post. The larger the number, the higher the priority of the pinned post. Default is 0, which means not pinned.

#### toc

Whether to generate a table of contents. Displays h2 to h4 headings. Default is determined by the global configuration item `global.toc`, which can be overridden individually in the post.

#### lang

Specify the post language. Can only specify one language; if not specified, it defaults to displaying under all language paths.

```md
# src/config.ts
# locale: 'en'
# moreLocales: ['es', 'ru']

# lang: ''
src/content/posts/apple.md   ->  example.com/posts/apple/
                             ->  example.com/es/posts/apple/
                             ->  example.com/ru/posts/apple/
# lang: en
src/content/posts/apple.md   ->  example.com/posts/apple/
# lang: es
src/content/posts/apple.md   ->  example.com/es/posts/apple/
# lang: ru
src/content/posts/apple.md   ->  example.com/ru/posts/apple/
```

#### abbrlink

Custom post URL. Can only contain lowercase letters, numbers, and hyphens `-`.

```md
# src/config.ts
# locale: 'en'
# moreLocales: ['es', 'ru']
# lang: 'es'

# abbrlink: ''
src/content/posts/apple.md           ->  example.com/es/posts/apple/
src/content/posts/guide/apple.md     ->  example.com/es/posts/guide/apple/
src/content/posts/2025/03/apple.md   ->  example.com/es/posts/2025/03/apple/

# abbrlink: 'banana'
src/content/posts/apple.md           ->  example.com/es/posts/banana/
src/content/posts/guide/apple.md     ->  example.com/es/posts/banana/
src/content/posts/2025/03/apple.md   ->  example.com/es/posts/banana/
```

### Layout Optimization

Run `pnpm format-posts` to optimize the layout format of Markdown files in the `src/content/` directory. In scenarios where CJK (Chinese, Japanese, Korean) and English are mixed, it supplements correct spacing, corrects punctuation, etc.

```bash
pnpm format-posts
🔍 Scanning Markdown files...
📦 Found 56 Markdown files
✅ src/content/posts/guides/Theme Guide-ja.md
✅ src/content/posts/guides/Theme Guide-zh-tw.md
✅ src/content/posts/guides/Theme Guide-zh.md
✨ Formatted 3 files successfully
```
