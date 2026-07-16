import type { OxfmtConfigOptions } from '@daleal/oxd-config-core';
import { createShorthandImportConfig, mergeOxfmtConfigs, toArray } from '@daleal/oxd-config-core';
import { oxfmt as oxfmtTypescript } from '@daleal/oxd-config-ts';
import type { OxfmtConfig } from 'oxfmt';

type VueOxfmtConfigOptions = OxfmtConfigOptions & {
  shorthands?: string[];
};

const createVueSortImports = (shorthands: string[]): NonNullable<OxfmtConfig['sortImports']> => {
  const { internalPattern, shorthand, shorthandComponents } =
    createShorthandImportConfig(shorthands);

  return {
    customGroups: [
      { groupName: 'sibling-vue', selector: 'sibling', elementNamePattern: ['./**/*.vue'] },
      shorthandComponents,
      { groupName: 'svg-components', elementNamePattern: ['**/*.svg?component'] },
      { groupName: 'vue-components', elementNamePattern: ['**/*.vue'] },
      { groupName: 'scss', elementNamePattern: ['**/*.scss'] },
      shorthand,
    ],
    groups: [
      'builtin',
      'external',
      'shorthand',
      'internal',
      'svg-components',
      'shorthand-components',
      'vue-components',
      'scss',
      'index',
      'parent',
      'sibling',
      'sibling-vue',
      'style',
      'unknown',
    ],
    internalPattern,
    newlinesBetween: false,
    order: 'asc',
    sortSideEffects: true,
  };
};

export const oxfmt = (options: VueOxfmtConfigOptions = {}): OxfmtConfig => {
  const { overrides = [], shorthands = ['~'] } = options;
  return mergeOxfmtConfigs(
    oxfmtTypescript(),
    {
      singleAttributePerLine: true,
      sortImports: createVueSortImports(shorthands),
    },
    ...toArray(overrides),
  );
};
