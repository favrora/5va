import type { APIRoute } from 'astro';
import { getReleaseSettings } from '../../release-config.mjs';
export const GET: APIRoute = ({ site }) => {
  const { isProduction } = getReleaseSettings();
  return new Response(
    isProduction
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site).href}\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
