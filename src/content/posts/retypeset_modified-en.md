---
title: Introducing PaperWeave Theme
published: 2025-12-13T21:25:00
description: An Astro theme based on Retypeset with modifications, adding search, casual, statistics and other features
updated: ""
tags:
  - Retypeset
  - blog
  - PaperWeave
draft: false
pin: 0
toc: true
lang: en
abbrlink: ""
share: true
Status: Completed
---
## Preview
Homepage
![homepage.png](https://dav1.xtyin.com/homepage.png)
Casual
![casual.png](https://dav1.xtyin.com/casual.png)
Statistics
![stats.png](https://dav1.xtyin.com/stats.png)
Support page free enable/disable (ToDo)

## Introduction

Deeply customized based on the Retypeset theme. Added dynamic content streams and rich data display functions for bloggers who like to record their lives.

Since I didn't record it in time during the modification, if you like it, you can directly fork my repository.

It would be better if you can give a **🌟Star** 😊 Thank you.

## Github Address

[Click to visit](https://github.com/xtawa/astro-theme-retypeset/tree/master)

## Tips

The articles in the repository are copyrighted by me, please **delete** them in time after forking.

## Highlights in Readme

---

### Modifications

- **Casual Page (`/casual`)**: Fetches and displays real-time content from a public Telegram Channel.
- **Statistics Page (`/stats`)**: A dashboard featuring:
    - **Timeline**: Chronological archive of all posts.
    - **Word Count**: Total articles and words (CJK supported).
    - **Top Tags**: Most frequently used tags.
    - **Typewriter Effect**: Displays random quotes from your articles (tagged with `#好词好句`).
- **Search**: Full-text search powered by [Algolia DocSearch](https://docsearch.algolia.com/) (free for open-source/technical blogs).

### Algolia DocSearch Setup

To enable search functionality, follow these steps:

#### 1. Apply for DocSearch

1. Go to [Algolia DocSearch](https://docsearch.algolia.com/apply/) and apply for free access.
2. You'll receive an email with your credentials once approved (usually within 24-48 hours).

#### 2. Configure your credentials

Open `src/config.ts` and add your Algolia credentials in the `search` section:

```typescript
search: {
  algolia: {
    enabled: true, // Set to true to enable search
    appId: 'YOUR_APP_ID', // Your Algolia Application ID
    apiKey: 'YOUR_SEARCH_API_KEY', // Your Search-Only API Key (NOT Admin API Key)
    indexName: 'YOUR_INDEX_NAME', // Your Algolia Index Name
  },
},
```

#### 3. Alternative: Create your own Algolia index

If you don't want to wait for DocSearch approval, you can create your own Algolia account:

1. Sign up at [Algolia](https://www.algolia.com/)
2. Create a new application and index
3. Use the [Algolia Crawler](https://www.algolia.com/products/search-and-discovery/crawler/) or [algolia-docsearch-scraper](https://github.com/algolia/docsearch-scraper) to index your site
4. Use your credentials in `src/config.ts`

> **Note**: The Search-Only API Key is safe to expose in client-side code. Never use your Admin API Key!
- **Post Copyright**: Automatically appends copyright information and license to the end of every post.
- **Deployment Ready**: Pre-configured with `@astrojs/vercel` for easy deployment.

### Typewriter Effect

The Statistics page (`/stats`) features a typewriter effect that displays a random sentence from your blog posts.

- **How it works**: It automatically extracts sentences from any post tagged with `好词好句`
- **Default**: If no posts have this tag, it will display a default inspirational quote.
- **Customization**: Simply add the tag `好词好句` to any Markdown post frontmatter to include its content in the quote pool.

## To-Do
- [ ] Friends Link Page

- [ ] Page Free Display/Hide
- [ ] Fix Typewriter Stuttering Effect
- [ ] Backend Function Addition
- [ ] Elog Support
