import { areas, services } from './content.ts';

const editorialUpdate = '2026-11-11';

// Editorial dates for materially revised static pages. Article dates live with the article.
export const pageDates = new Map<string, string>(
  [
    '/',
    '/services/',
    '/service-areas/',
    ...services.map(({ slug }) => `/services/${slug}/`),
    ...areas.map(({ slug }) => `/service-areas/${slug}/`),
    '/privacy/',
    '/blog/',
    '/about/',
    '/contact/',
    '/reviews/',
  ].map((path) => [path, editorialUpdate]),
);
