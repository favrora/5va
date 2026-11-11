import type { APIRoute } from 'astro';
import { routes } from '../data/routes';
import { articles } from '../data/journal';
import { pageDates } from '../data/page-dates';
const articleDates = new Map(
  articles.map((article) => [`/blog/${article.slug}/`, article.updatedOn || article.publishedOn]),
);
export const GET: APIRoute = ({ site }) => {
  const entries = routes.map((route) => {
    const lastmod = articleDates.get(route) ?? pageDates.get(route);
    return `<url><loc>${new URL(route, site).href}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
  });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
