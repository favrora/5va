import { services, areas } from './content.ts';
import { articles } from './journal.ts';
export const routes = [
  '/',
  '/services/',
  '/service-areas/',
  '/about/',
  '/reviews/',
  '/blog/',
  '/contact/',
  '/privacy/',
  ...services.map((item) => `/services/${item.slug}/`),
  ...areas.map((item) => `/service-areas/${item.slug}/`),
  ...articles.map((item) => `/blog/${item.slug}/`),
];
