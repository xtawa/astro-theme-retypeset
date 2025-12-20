# Admin Dashboard Troubleshooting Guide

If you are experiencing issues with the Admin Dashboard (e.g., login not responding, environment variables not loading), please follow these steps.

## 1. Environment Variables

If the "Repository Owner" and "Repository Name" fields are not pre-filled, it means the environment variables are not being loaded correctly.

### Local Development
1. Ensure you have a `.env` file in the root of your project (copy from `.env.example`).
2. The file should contain:
   ```env
   ADMIN_REPO_OWNER=your-github-username
   ADMIN_REPO_NAME=your-repo-name
   ```
3. Restart the development server (`pnpm dev` or `npm run dev`) after creating or modifying `.env`.

### Vercel / Netlify Deployment
1. Go to your project settings in the Vercel/Netlify dashboard.
2. Add the environment variables `ADMIN_REPO_OWNER` and `ADMIN_REPO_NAME`.
3. Redeploy your application.

## 2. Login "No Response" or Hanging

If clicking "Login" results in no response or hangs:

1. **Network Issues**: The admin dashboard uses the GitHub API. If you are in a region where GitHub is restricted (e.g., China), the connection might time out.
   - **Solution**: Try using a VPN or proxy.
2. **CDN Issues**: The dashboard loads the `Octokit` library from `cdn.jsdelivr.net`. If this domain is blocked, the login functionality will fail.
   - **Check**: Open your browser's Developer Tools (F12) -> Console. If you see "Octokit library not loaded", this is the cause.
   - **Solution**: Use a VPN or ensure you can access `cdn.jsdelivr.net`.

## 3. Debugging

Open the Browser Developer Tools (F12) and check the **Console** tab.
- Look for "Admin Config Loaded" to see if your environment variables are being read.
- Look for any red error messages.

## 4. GitHub Token

Ensure your Personal Access Token (PAT) has the `repo` scope selected.
- Generate a new token here: https://github.com/settings/tokens
