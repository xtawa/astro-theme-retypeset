# Keystatic Admin Guide

We have switched the admin panel to **Keystatic**, a modern, Git-based CMS that integrates perfectly with Astro.

## 1. Local Development (Recommended)

To edit content locally:

1. Run your development server:
   ```bash
   pnpm dev
   ```
2. Visit **[http://localhost:4321/keystatic](http://localhost:4321/keystatic)**.
3. You can create, edit, and delete posts directly. Changes are saved to your local file system immediately.

## 2. Production Setup (Vercel)

To use the admin panel on your live Vercel site, you need to connect it to GitHub.

### Step 1: Create a GitHub App
1. Go to [GitHub Settings > Developer Settings > GitHub Apps](https://github.com/settings/apps).
2. Click **New GitHub App**.
3. **GitHub App Name**: `Your Blog Admin` (or similar).
4. **Homepage URL**: Your Vercel URL (e.g., `https://your-blog.vercel.app`).
5. **Callback URL**: `https://your-blog.vercel.app/keystatic/api/github/oauth/callback` (Replace with your actual domain).
6. **Webhook URL**: Uncheck "Active" (not needed).
7. **Permissions**:
   - **Contents**: `Read and write`
   - **Metadata**: `Read-only`
   - **Pull requests**: `Read and write` (optional, if you want PRs)
8. Click **Create GitHub App**.

### Step 2: Get Credentials
1. On the App page, find **Client ID**. Copy it.
2. Generate a **Client Secret**. Copy it.
3. Install the App on your repository (Click "Install App" on the left sidebar).

### Step 3: Configure Vercel Environment Variables
Go to your Vercel Project Settings > Environment Variables and add:

- `KEYSTATIC_GITHUB_CLIENT_ID`: (Paste Client ID)
- `KEYSTATIC_GITHUB_CLIENT_SECRET`: (Paste Client Secret)
- `KEYSTATIC_SECRET`: (Generate a random long string, e.g., using `openssl rand -hex 32`)
- `ADMIN_REPO_OWNER`: (Your GitHub username, e.g., `xtawa`)
- `ADMIN_REPO_NAME`: (Your repo name, e.g., `astro-theme-retypeset`)

### Step 4: Redeploy
Redeploy your project on Vercel. Access `/keystatic` on your live site to log in with GitHub.
