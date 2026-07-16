import type { OxfmtConfigOptions } from '@daleal/oxd-config-core';
import { createShorthandImportConfig, mergeOxfmtConfigs, toArray } from '@daleal/oxd-config-core';
import type { OxfmtConfig } from 'oxfmt';

type TypeScriptOxfmtConfigOptions = OxfmtConfigOptions & {
  shorthands?: string[];
};

const DEFAULT_IGNORES = [
  '**/node_modules/**',
  '**/dist/**',
  '**/.output/**',
  '**/.nuxt/**',
  '**/coverage/**',
];

const createOxfmtConfig = (shorthands: string[]): OxfmtConfig => {
  const { internalPattern, shorthand, shorthandComponents } =
    createShorthandImportConfig(shorthands);

  return {
    arrowParens: 'always',
    bracketSpacing: true,
    ignorePatterns: DEFAULT_IGNORES,
    insertFinalNewline: true,
    jsxSingleQuote: false,
    quoteProps: 'as-needed',
    semi: true,
    singleQuote: true,
    sortImports: {
      customGroups: [shorthandComponents, shorthand],
      groups: [
        'builtin',
        'external',
        'shorthand',
        'internal',
        'shorthand-components',
        'index',
        'parent',
        'sibling',
        'style',
        'unknown',
      ],
      internalPattern,
      newlinesBetween: false,
      order: 'asc',
      sortSideEffects: true,
    },
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
  };
};

export const oxfmt = (options: TypeScriptOxfmtConfigOptions = {}): OxfmtConfig => {
  const { overrides = [], shorthands = [] } = options;
  return mergeOxfmtConfigs(createOxfmtConfig(shorthands), ...toArray(overrides));
};
