import type { OxlintConfigOptions } from '@daleal/oxd-config-core';
import { toArray } from '@daleal/oxd-config-core';
import { oxlint as oxlintTypescript } from '@daleal/oxd-config-ts';
import type { OxlintConfig } from 'oxlint';

type VueOxlintConfigOptions = OxlintConfigOptions & {
  shorthands?: string[];
};

const VUE_RECOMMENDED_RULES: NonNullable<OxlintConfig['rules']> = {
  'vue/no-arrow-functions-in-watch': 'error',
  'vue/no-async-in-computed-properties': 'error',
  'vue/no-computed-properties-in-data': 'error',
  'vue/no-deprecated-data-object-declaration': 'error',
  'vue/no-deprecated-delete-set': 'error',
  'vue/no-deprecated-destroyed-lifecycle': 'error',
  'vue/no-deprecated-events-api': 'error',
  'vue/no-deprecated-model-definition': 'error',
  'vue/no-deprecated-props-default-this': 'error',
  'vue/no-deprecated-vue-config-keycodes': 'error',
  'vue/no-dupe-keys': 'error',
  'vue/no-export-in-script-setup': 'error',
  'vue/no-expose-after-await': 'error',
  'vue/no-lifecycle-after-await': 'error',
  'vue/no-reserved-component-names': 'error',
  'vue/no-reserved-keys': 'error',
  'vue/no-reserved-props': 'error',
  'vue/no-shared-component-data': 'error',
  'vue/no-side-effects-in-computed-properties': 'error',
  'vue/no-watch-after-await': 'error',
  'vue/prefer-import-from-vue': 'error',
  'vue/require-prop-type-constructor': 'error',
  'vue/require-render-return': 'error',
  'vue/require-slots-as-functions': 'error',
  'vue/return-in-computed-property': 'error',
  'vue/return-in-emits-validator': 'error',
  'vue/valid-define-emits': 'error',
  'vue/valid-define-options': 'error',
  'vue/valid-define-props': 'error',
  'vue/valid-next-tick': 'error',
  'vue/component-definition-name-casing': 'warn',
  'vue/prop-name-casing': 'warn',
  'vue/require-default-prop': 'off',
  'vue/require-prop-types': 'warn',
  'vue/no-multiple-slot-args': 'warn',
  'vue/no-required-prop-with-default': 'warn',
  'vue/define-props-destructuring': ['error', { destructure: 'never' }],
};

const VUE_OXLINT_CONFIG: OxlintConfig = {
  plugins: ['eslint', 'typescript', 'vue'],
  overrides: [
    {
      files: ['**/*.{js,mjs,jsx,ts,mts,tsx,vue}'],
      env: { browser: true },
    },
    {
      files: ['**/*.vue'],
      env: { vue: true },
      rules: VUE_RECOMMENDED_RULES,
    },
  ],
};

export const oxlint = (options: VueOxlintConfigOptions = {}): OxlintConfig => {
  const { overrides = [] } = options;
  return { extends: [oxlintTypescript(), VUE_OXLINT_CONFIG, ...toArray(overrides)] };
};
