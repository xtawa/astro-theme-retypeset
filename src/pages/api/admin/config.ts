import type { APIRoute } from 'astro';

// Get admin configuration from environment variables
export const GET: APIRoute = async () => {
  const config = {
    githubClientId: import.meta.env.GITHUB_CLIENT_ID || import.meta.env.PUBLIC_GITHUB_CLIENT_ID,
    repoOwner: import.meta.env.ADMIN_REPO_OWNER,
    repoName: import.meta.env.ADMIN_REPO_NAME,
    hasOAuth: !!(import.meta.env.GITHUB_CLIENT_ID && import.meta.env.GITHUB_CLIENT_SECRET),
  };

  console.log('API Config Loaded:', {
    ...config,
    githubClientId: config.githubClientId ? '***' : undefined, // Mask secret
  });

  return new Response(JSON.stringify(config), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
