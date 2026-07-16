import type { OxlintConfigOptions } from '@daleal/oxd-config-core';
import { toArray } from '@daleal/oxd-config-core';
import type { OxlintConfig } from 'oxlint';

const DEFAULT_IGNORES = [
  '**/node_modules/**',
  '**/dist/**',
  '**/.output/**',
  '**/.nuxt/**',
  '**/coverage/**',
];

const NATIVE_ESLINT_RECOMMENDED_RULES: NonNullable<OxlintConfig['rules']> = {
  'constructor-super': 'error',
  'for-direction': 'error',
  'getter-return': 'error',
  'no-async-promise-executor': 'error',
  'no-case-declarations': 'error',
  'no-class-assign': 'error',
  'no-compare-neg-zero': 'error',
  'no-cond-assign': 'error',
  'no-const-assign': 'error',
  'no-constant-binary-expression': 'error',
  'no-constant-condition': 'error',
  'no-control-regex': 'error',
  'no-debugger': 'error',
  'no-delete-var': 'error',
  'no-dupe-class-members': 'error',
  'no-dupe-else-if': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-empty': 'error',
  'no-empty-character-class': 'error',
  'no-empty-pattern': 'error',
  'no-empty-static-block': 'error',
  'no-ex-assign': 'error',
  'no-extra-boolean-cast': 'error',
  'no-fallthrough': 'error',
  'no-func-assign': 'error',
  'no-global-assign': 'error',
  'no-import-assign': 'error',
  'no-invalid-regexp': 'error',
  'no-irregular-whitespace': 'error',
  'no-loss-of-precision': 'error',
  'no-misleading-character-class': 'error',
  'no-new-native-nonconstructor': 'error',
  'no-nonoctal-decimal-escape': 'error',
  'no-obj-calls': 'error',
  'no-prototype-builtins': 'error',
  'no-redeclare': 'error',
  'no-regex-spaces': 'error',
  'no-self-assign': 'error',
  'no-setter-return': 'error',
  'no-shadow-restricted-names': 'error',
  'no-sparse-arrays': 'error',
  'no-this-before-super': 'error',
  'no-undef': 'error',
  'no-unexpected-multiline': 'error',
  'no-unreachable': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-negation': 'error',
  'no-unsafe-optional-chaining': 'error',
  'no-unused-labels': 'error',
  'no-unused-private-class-members': 'error',
  'no-useless-backreference': 'error',
  'no-useless-catch': 'error',
  'no-useless-escape': 'error',
  'no-with': 'error',
  'require-yield': 'error',
  'use-isnan': 'error',
  'valid-typeof': 'error',
};

const NATIVE_TYPESCRIPT_RECOMMENDED_RULES: NonNullable<OxlintConfig['rules']> = {
  'no-var': 'error',
  'prefer-const': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'typescript/ban-ts-comment': 'error',
  'no-array-constructor': 'error',
  'typescript/no-duplicate-enum-values': 'error',
  'typescript/no-empty-object-type': 'error',
  'typescript/no-explicit-any': 'error',
  'typescript/no-extra-non-null-assertion': 'error',
  'typescript/no-misused-new': 'error',
  'typescript/no-namespace': 'error',
  'typescript/no-non-null-asserted-optional-chain': 'error',
  'typescript/no-require-imports': 'error',
  'typescript/no-this-alias': 'error',
  'typescript/no-unnecessary-type-constraint': 'error',
  'typescript/no-unsafe-declaration-merging': 'error',
  'typescript/no-unsafe-function-type': 'error',
  'no-unused-expressions': 'error',
  'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  'typescript/no-wrapper-object-types': 'error',
  'typescript/prefer-as-const': 'error',
  'typescript/prefer-namespace-keyword': 'error',
  'typescript/triple-slash-reference': 'error',
  'typescript/unified-signatures': 'off',
};

const NATIVE_CUSTOM_RULES: NonNullable<OxlintConfig['rules']> = {
  'func-style': ['error', 'expression', { allowArrowFunctions: true }],
  'id-length': ['error', { min: 2 }],
};

const COMPATIBILITY_RULES: NonNullable<OxlintConfig['rules']> = {
  'eslint-compat/no-restricted-syntax': [
    'error',
    {
      selector: 'SwitchStatement',
      message: 'Switch statements are disallowed. Use objects or if-else chains instead.',
    },
  ],
};

const NATIVE_TYPESCRIPT_CORE_OVERRIDES: NonNullable<OxlintConfig['rules']> = {
  'constructor-super': 'off',
  'getter-return': 'off',
  'no-class-assign': 'off',
  'no-const-assign': 'off',
  'no-dupe-class-members': 'off',
  'no-dupe-keys': 'off',
  'no-func-assign': 'off',
  'no-import-assign': 'off',
  'no-new-native-nonconstructor': 'off',
  'no-obj-calls': 'off',
  'no-redeclare': 'off',
  'no-setter-return': 'off',
  'no-this-before-super': 'off',
  'no-undef': 'off',
  'no-unreachable': 'off',
  'no-unsafe-negation': 'off',
  'no-with': 'off',
};

const OXLINT_CONFIG: OxlintConfig = {
  categories: {
    correctness: 'off',
    nursery: 'off',
    pedantic: 'off',
    perf: 'off',
    restriction: 'off',
    style: 'off',
    suspicious: 'off',
  },
  ignorePatterns: DEFAULT_IGNORES,
  jsPlugins: [{ name: 'eslint-compat', specifier: 'oxlint-plugin-eslint' }],
  rules: {
    ...NATIVE_ESLINT_RECOMMENDED_RULES,
    ...NATIVE_TYPESCRIPT_RECOMMENDED_RULES,
    ...NATIVE_CUSTOM_RULES,
    ...COMPATIBILITY_RULES,
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx,mts,cts}'],
      rules: NATIVE_TYPESCRIPT_CORE_OVERRIDES,
    },
  ],
};

export const oxlint = (options: OxlintConfigOptions = {}): OxlintConfig => {
  const { overrides = [] } = options;
  return { extends: [OXLINT_CONFIG, ...toArray(overrides)] };
};
