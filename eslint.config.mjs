// @ts-check

import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  [globalIgnores(['.angular/*'])],
  {
    rules: {
      'no-magic-numbers': ['error', { ignore: [0, 1] }],
    },
  }
);
