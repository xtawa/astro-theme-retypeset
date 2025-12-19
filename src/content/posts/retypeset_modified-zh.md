---
title: 向您介绍 PaperWeave 主题
published: 2025-12-13T21:25:00
description: 一款 Astro 主题，基于 Retypeset 进行二次修改，增加搜索、说说、统计等功能
updated: ""
tags:
  - Retypeset
  - blog
  - PaperWeave
draft: false
pin: 0
toc: true
lang: zh
abbrlink: retypeset-modified
share: true
状态: 已完成
---
## 界面预览
主页
![homepage.png](https://dav1.xtyin.com/homepage.png)
随心说
![casual.png](https://dav1.xtyin.com/casual.png)
统计
![stats.png](https://dav1.xtyin.com/stats.png)
支持页面自由启用/禁用(ToDo)
## 介绍

基于 Retypeset 主题深度定制。为喜欢记录生活的博主增加了动态内容流和丰富的数据展示功能。

由于在魔改期间未及时进行记录，如果你喜欢的话可以直接fork我的仓库

如果能点个 **🌟Star** 的话就更好啦😊谢谢你

## Github地址

[点此访问](https://github.com/xtawa/astro-theme-retypeset/tree/master)

## 温馨提示

仓库内文章为本人版权所有，请fork后及时**删除**

## Readme中部分亮点

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
- [x] 友链页 ✅ 2025-12-19
- [ ] ~~个人CV~~ **计划取消**
- [x] 页面自由显示/隐藏 ✅ 2025-12-19
- [x] 修复打字机卡顿效果 ✅ 2025-12-19
- [x] 后台功能添加 ✅ 2025-12-19
- [ ] Elog 支持
- [x] 语言适配 ✅ 2025-12-19
- [x] i18n修改 ✅ 2025-12-19

