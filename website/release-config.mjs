// Production indexing is opt-in and bound to the owner's approved canonical origin.
export const PRODUCTION_ORIGIN = 'https://5varepair.com';

/** @param {{siteUrl?: string, siteEnv?: string}} [options] */
export function getReleaseSettings({
  siteUrl = process.env.SITE_URL || 'http://localhost:4321',
  siteEnv = process.env.SITE_ENV || 'preview',
} = {}) {
  if (!['preview', 'production'].includes(siteEnv)) {
    throw new Error('SITE_ENV must be preview or production.');
  }
  const site = new URL(siteUrl);
  if (
    !['http:', 'https:'].includes(site.protocol) ||
    site.username ||
    site.password ||
    site.pathname !== '/' ||
    site.search ||
    site.hash
  ) {
    throw new Error(
      'SITE_URL must be a plain HTTP(S) origin without a path, credentials or query.',
    );
  }
  const isProduction = siteEnv === 'production';
  if (isProduction && site.origin !== PRODUCTION_ORIGIN) {
    throw new Error(`Production SITE_URL must be ${PRODUCTION_ORIGIN}.`);
  }
  return { site: site.origin, isProduction };
}
