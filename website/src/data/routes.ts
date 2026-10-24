import { services, areas } from './content';
import { articles } from './journal';
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
