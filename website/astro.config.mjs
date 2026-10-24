import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';
import { getReleaseSettings } from './release-config.mjs';

if (existsSync('.env')) process.loadEnvFile('.env');

// Publishing requires both explicit production mode and the approved canonical origin.
const release = getReleaseSettings();
export default defineConfig({
  site: release.site,
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  build: { format: 'directory' },
});
