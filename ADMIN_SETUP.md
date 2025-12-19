# Admin Dashboard - Quick Setup Guide

## For Vercel Deployment

### Required Environment Variables

```bash
# GitHub OAuth (Recommended for secure login)
GITHUB_CLIENT_ID=your_oauth_client_id
GITHUB_CLIENT_SECRET=your_oauth_client_secret
PUBLIC_GITHUB_CLIENT_ID=your_oauth_client_id

# Repository Configuration (Optional - pre-fills admin form)
ADMIN_REPO_OWNER=your_github_username
ADMIN_REPO_NAME=your_repository_name
```

## GitHub OAuth App Setup

1. **Create OAuth App**:
   - Visit: https://github.com/settings/developers
   - Click "New OAuth App"
   - Fill in:
     - Application name: `My Blog Admin`
     - Homepage URL: `https://your-site.vercel.app`
     - Callback URL: `https://your-site.vercel.app/api/auth/callback`
   - Save Client ID and Secret

2. **Add to Vercel**:
   - Go to your Vercel project → Settings → Environment Variables
   - Add all variables from above
   - Redeploy your site

## Usage

### Login Methods

#### OAuth Login (When Configured)
1. Visit `/admin`
2. Click "Login with GitHub OAuth"
3. Authorize on GitHub
4. Automatically logged in ✓

#### Manual Login (Fallback)
1. Generate GitHub PAT: https://github.com/settings/tokens
   - Scope: `repo`
2. Visit `/admin`
3. Enter:
   - Token
   - Owner (if not pre-configured)
   - Repo (if not pre-configured)

## Features

- **Articles**: CRUD operations on markdown posts
- **Friends**: Manage friend links (EN/ZH)
- **Config**: Edit site configuration

All changes commit directly to GitHub with descriptive messages.

## Security

⚠️ **Important**:
- Set `pages.admin: false` in `src/config.ts` (hides from nav)
- `/admin` still accessible by direct URL
- Use branch protection on main branch
- OAuth secrets should NEVER be committed to repo
- Store all secrets in Vercel environment variables

## Troubleshooting

### OAuth not showing
- Check `GITHUB_CLIENT_ID` is set in Vercel
- Verify environment variables are deployed (redeploy if needed)

### Callback fails
- Verify callback URL matches exactly (including protocol)
- Check `GITHUB_CLIENT_SECRET` is correct

### Can't save changes
- Verify token has `repo` scope
- Check repository owner/name are correct
- Ensure you have write access to the repository
