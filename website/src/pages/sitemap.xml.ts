import type { APIRoute } from 'astro';
import { routes } from '../data/routes';
import { articles } from '../data/journal';
const articleDates = new Map(
  articles.map((article) => [`/blog/${article.slug}/`, article.updatedOn || article.publishedOn]),
);
export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${new URL(route, site).href}</loc>${articleDates.get(route) ? `<lastmod>${articleDates.get(route)}</lastmod>` : ''}</url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
