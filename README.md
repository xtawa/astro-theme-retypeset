# Retypeset
test
![Cover Image](assets/images/v1/retypeset-en-desktop.webp)
![Cover Image](assets/images/v1/retypeset-en-mobile.webp)

[简体中文](assets/docs/README.zh.md)｜[繁体中文](assets/docs/README.zh-tw.md)｜[日本語](assets/docs/README.ja.md)｜[Español](assets/docs/README.es.md)｜[Français](assets/docs/README.fr.md)｜[Русский](assets/docs/README.ru.md)

Retypeset is a static blog theme based on the [Astro](https://astro.build/) framework. Inspired by [Typography](https://astro-theme-typography.vercel.app/), Retypeset establishes a new visual standard and reimagines the layout of all pages, creating a reading experience reminiscent of paper books, reviving the beauty of typography. Details in every sight, elegance in every space.

## Demo

- [Retypeset](https://retypeset.radishzz.cc/en/)
- [Retipografía](https://retypeset.radishzz.cc/es/)
- [Переверстка](https://retypeset.radishzz.cc/ru/)
- [重新编排](https://retypeset.radishzz.cc/)
- [重新編排](https://retypeset.radishzz.cc/zh-tw/)
- [再組版](https://retypeset.radishzz.cc/ja/)

## Features

- Built with Astro and UnoCSS
- Support for SEO, Sitemap, OpenGraph, RSS, MDX, LaTeX, Mermaid, and TOC
- i18n support
- Light / Dark mode
- Elegant view transitions
- Rich theme customization
- Optimized typography
- Responsive design
- Comment system

## Modifications

This version includes several enhancements over the original Retypeset theme:

- **Casual Page (`/casual`)**: Fetches and displays real-time content from a public Telegram Channel.
- **Statistics Page (`/stats`)**: A dashboard featuring:
    - **Timeline**: Chronological archive of all posts.
    - **Word Count**: Total articles and words (CJK supported).
    - **Top Tags**: Most frequently used tags.
    - **Typewriter Effect**: Displays random quotes from your articles (tagged with `#好词好句`).
- **Search**: Full-text search powered by [Algolia DocSearch](https://docsearch.algolia.com/) (free for open-source/technical blogs).
- **Friends Page (`/friends`)**: A dedicated page to list your friends or recommended links, configurable via `src/friends.ts`.


## Language Configuration

You can configure the default language and supported languages in `src/config.ts`.

### Default Language

The default language is served at the root URL (`/`). To set Chinese as the default language:

```typescript
// src/config.ts
global: {
  // default language
  locale: 'zh',
  // ...
}
```

With this configuration, accessing `https://your-site.com/` will display the Chinese version.

### Supported Languages

You can add more supported languages in the `moreLocales` array:

```typescript
// src/config.ts
global: {
  // ...
  // more languages
  moreLocales: ['en'], // Generates /en/ paths
}
```

This will generate paths like `/en/` for English content.




## Friends Page Setup

To add friends to your Friends page:

1.  Open `src/friends.ts`.
2.  Add your friends' information to the `friends` array:

```typescript
export const friends: Friend[] = [
  {
    name: 'Friend Name',
    url: 'https://friend-url.com',
    avatar: 'https://friend-avatar-url.com/avatar.png',
    description: 'Description of the friend.',
  },
  // Add more friends here
]
```

3.  You can toggle the visibility of the Friends page in `src/config.ts` under the `pages` section.

## Algolia DocSearch Setup

To enable search functionality, follow these steps:

### 1. Create an Algolia Account

1. Sign up at [Algolia](https://www.algolia.com/) (free tier available)
2. Create a new application
3. Create a new index (e.g., `your_blog_index`)

### 2. Configure your credentials

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

### 3. Set up automatic indexing on Vercel

This theme includes a built-in script that automatically indexes your blog posts to Algolia during every deployment.

**Add the following environment variable in Vercel:**

| Variable | Required | Description |
|----------|----------|-------------|
| `ALGOLIA_ADMIN_KEY` | Yes | Your Algolia **Admin API Key** (found in Algolia Dashboard → Settings → API Keys) |

**Steps:**

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add `ALGOLIA_ADMIN_KEY` with your Admin API Key
4. Redeploy your site

> ⚠️ **Security Note**: 
> - The **Search-Only API Key** (in `config.ts`) is safe to expose in client-side code
> - The **Admin API Key** (in Vercel env) should NEVER be committed to your repository

### 4. Manual indexing (optional)

You can also manually run the indexing script locally:

```powershell
# PowerShell
$env:ALGOLIA_ADMIN_KEY="your-admin-api-key"
pnpm build-algolia
```

```bash
# Bash
export ALGOLIA_ADMIN_KEY="your-admin-api-key"
pnpm build-algolia
```

### Alternative: Use DocSearch Crawler

If you prefer not to use the built-in indexing script, you can apply for [Algolia DocSearch](https://docsearch.algolia.com/apply/) which provides free hosting and indexing for open-source/technical blogs.

- **Post Copyright**: Automatically appends copyright information and license to the end of every post.
- **Homepage Tags**: Optionally display a scrollable list of tags at the top of the homepage.
    - Configurable in `src/config.ts` via `global.showTagsOnHome`.
    - **Note**: If the dedicated Tags page is enabled (`pages.tags: true`), the homepage tags will be automatically hidden to avoid redundancy.
- **Deployment Ready**: Pre-configured with `@astrojs/vercel` for easy deployment.

## Typewriter Effect

The Statistics page (`/stats`) features a typewriter effect that displays a random sentence from your blog posts.

- **How it works**: It automatically extracts sentences from any post tagged with `好词好句` (or `Good Quotes`).
- **Default**: If no posts have this tag, it will display a default inspirational quote.
- **Customization**: Simply add the tag `好词好句` to any Markdown post frontmatter to include its content in the quote pool.

## Performance

<br>
<p align="center">
  <a href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fretypeset.radishzz.cc%2Fen%2F&form_factor=desktop">
    <img width="710" alt="Retypeset Lighthouse Score" src="assets/images/retypeset-lighthouse-score.svg">
  <a>
</p>

## Getting Started

1. [Fork](https://github.com/radishzzz/astro-theme-retypeset/fork) this repository, or use this template to create a new repository.
2. Run the following commands in your terminal:

   ```bash
   # Clone the repository
   git clone <repository-url>

   # Navigate to the project directory
   cd <repository-name>

   # Install pnpm globally (if not already installed)
   npm install -g pnpm

   # Install dependencies
   pnpm install

   # Start the development server
   pnpm dev
   ```

3. Refer to the [Theme Guide](https://retypeset.radishzz.cc/en/posts/theme-guide/) to customize your blog and create new posts.

## Deployment

This project is configured for **Vercel** out of the box.

### 1. Deploy to Vercel

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Vercel will detect Astro and configure the build settings automatically.

### 2. Environment Variables

For the **Casual Page** to work, you must set the following environment variable in Vercel project settings:

-   `CASUAL_TELEGRAM_CHANNEL`: Your public Telegram channel username (e.g., `my_blog_channel`).

**Note**: Vercel's serverless functions can access Telegram directly, so `HTTPS_PROXY` is usually **not** required for production. However, for local development in restricted regions, you may need to set `HTTPS_PROXY` in your local `.env` or shell.

&emsp;[![Deploy to Netlify](assets/images/deploy-netlify.svg)](https://app.netlify.com/start) [![Deploy to Vercel](assets/images/deploy-vercel.svg)](https://vercel.com/new)

## Updates

Retypeset releases [new features](https://github.com/radishzzz/astro-theme-retypeset/issues/18) from time to time. Simply run `pnpm update-theme` to update the theme. If you encounter merge conflicts, please refer to [this video](https://youtu.be/lz5OuKzvadQ?si=sH_ALNgqxrYqNVQT) for manual resolution.

## Admin Dashboard

The theme includes a built-in Admin Dashboard at `/admin` to manage your content directly from the browser.

### Authentication Methods

The admin dashboard supports two authentication methods:

#### Method 1: GitHub OAuth (Recommended)

OAuth provides a more secure and seamless login experience.

**Setup Steps:**

1. **Create a GitHub OAuth App**:
   - Go to GitHub Settings → Developer settings → [OAuth Apps](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in the details:
     - **Application name**: Your Blog Admin
     - **Homepage URL**: `https://your-site.com`
     - **Authorization callback URL**: `https://your-site.com/api/auth/callback`
   - Click "Register application"
   - Copy your **Client ID** and **Client Secret**

2. **Configure Environment Variables** (in Vercel or your hosting platform):
   ```bash
   GITHUB_CLIENT_ID=your_client_id_here
   GITHUB_CLIENT_SECRET=your_client_secret_here
   PUBLIC_GITHUB_CLIENT_ID=your_client_id_here  # Same as above
   
   # Optional: Pre-configure repository
   ADMIN_REPO_OWNER=your_github_username
   ADMIN_REPO_NAME=your_repo_name
   ```

3. **Deploy** and visit `/admin` - you'll see a "Login with GitHub OAuth" button

#### Method 2: Personal Access Token

If you prefer not to set up OAuth, you can use a Personal Access Token.

**Setup Steps:**

1. Generate a **GitHub Personal Access Token (Classic)** with `repo` scope:
   - Go to GitHub Settings → Developer settings → [Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Check the `repo` scope
   - Copy the generated token

2. Navigate to `/admin` and enter:
   - Your token
   - Repository owner (username)
   - Repository name

### Features

-   **📝 Articles**: Create, edit, and delete markdown posts in `src/content/posts`
-   **👥 Friends**: Manage friend links in `src/friends.ts` with a simple UI
-   **⚙️ Config**: Edit `src/config.ts` directly from the browser

### Vercel Environment Variables

For the best experience on Vercel, configure these environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `ALGOLIA_ADMIN_KEY` | Required* | Algolia Admin API Key for search indexing |
| `GITHUB_CLIENT_ID` | Optional | GitHub OAuth Client ID for admin login |
| `GITHUB_CLIENT_SECRET` | Optional | GitHub OAuth Client Secret (keep this secret!) |
| `PUBLIC_GITHUB_CLIENT_ID` | Optional | Same as GITHUB_CLIENT_ID (for client-side) |
| `ADMIN_REPO_OWNER` | Optional | Pre-configure repository owner |
| `ADMIN_REPO_NAME` | Optional | Pre-configure repository name |
| `CASUAL_TELEGRAM_CHANNEL` | Required* | Telegram channel for Casual page |

*Required only if using the corresponding feature (search or casual page).

### Security Notes

⚠️ **Important Security Considerations:**

- Set `pages.admin: false` in `src/config.ts` to hide the admin link from navigation
- The `/admin` path is still accessible by direct URL
- OAuth tokens and PATs have full `repo` access to your repository
- All changes are committed directly to your GitHub repository
- Consider using branch protection rules for your main branch
- For production sites, consider implementing additional authentication layers

**Note**: Changes made in the Admin Dashboard are committed directly to your GitHub repository with descriptive commit messages.

## Credits

- [Typography](https://github.com/moeyua/astro-theme-typography)
- [Fuwari](https://github.com/saicaca/fuwari)
- [Redefine](https://github.com/EvanNotFound/hexo-theme-redefine)
- [AstroPaper](https://github.com/satnaing/astro-paper)
- [heti](https://github.com/sivan/heti)
- [EarlySummerSerif](https://github.com/GuiWonder/EarlySummerSerif)

## Star History

<p align="center">
<a href="https://star-history.com/#radishzzz/astro-theme-retypeset&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=radishzzz/astro-theme-retypeset&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=radishzzz/astro-theme-retypeset&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=radishzzz/astro-theme-retypeset&type=Date" />
  </picture>
</p>
