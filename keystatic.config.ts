import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: {
          owner: import.meta.env.ADMIN_REPO_OWNER || 'xtawa',
          name: import.meta.env.ADMIN_REPO_NAME || 'astro-theme-retypeset',
        },
      }
    : {
        kind: 'local',
      },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        published: fields.date({ label: 'Published Date', validation: { isRequired: true } }),
        updated: fields.date({ label: 'Updated Date' }),
        description: fields.text({ label: 'Description', multiline: true }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        pin: fields.integer({ label: 'Pin Priority (0-99)', defaultValue: 0 }),
        toc: fields.checkbox({ label: 'Enable Table of Contents', defaultValue: true }),
        lang: fields.select({
          label: 'Language',
          options: [
            { label: 'Chinese (zh)', value: 'zh' },
            { label: 'English (en)', value: 'en' },
            { label: 'German (de)', value: 'de' },
            { label: 'Spanish (es)', value: 'es' },
            { label: 'French (fr)', value: 'fr' },
            { label: 'Japanese (ja)', value: 'ja' },
            { label: 'Korean (ko)', value: 'ko' },
            { label: 'Polish (pl)', value: 'pl' },
            { label: 'Portuguese (pt)', value: 'pt' },
            { label: 'Russian (ru)', value: 'ru' },
            { label: 'Traditional Chinese (zh-tw)', value: 'zh-tw' },
          ],
          defaultValue: 'zh'
        }),
        abbrlink: fields.text({ label: 'Custom URL Slug (abbrlink)' }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/assets/images/posts',
            publicPath: '@/assets/images/posts',
          },
        }),
      },
    }),
  },
});
