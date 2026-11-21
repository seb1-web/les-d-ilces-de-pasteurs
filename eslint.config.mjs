import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  { rules: {
    '@next/next/no-img-element': 'off', // Local WebP files are pre-optimized by prepare-images.
    'react/no-unescaped-entities': 'off',
  } },
  globalIgnores(['.next/**', 'public/design/**', 'artifacts/**', '.taste-skill/**', 'playwright-report/**', 'test-results/**']),
]);
