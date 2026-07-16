import type { CustomGroupItemConfig, OxfmtConfig } from 'oxfmt';
import type { OxlintConfig } from 'oxlint';

export type ConfigOptions<Value> = {
  overrides?: Value | Value[];
};

export type OxlintConfigOptions = ConfigOptions<OxlintConfig>;
export type OxfmtConfigOptions = ConfigOptions<OxfmtConfig>;

export const toArray = <Value>(value: Value | Value[]): Value[] =>
  Array.isArray(value) ? value : [value];

export const createShorthandImportConfig = (
  shorthands: string[],
): {
  internalPattern: string[];
  shorthand: CustomGroupItemConfig;
  shorthandComponents: CustomGroupItemConfig;
} => ({
  internalPattern: shorthands.map((shorthand) => `${shorthand}/`),
  shorthand: {
    groupName: 'shorthand',
    elementNamePattern: shorthands.map((shorthand) => `${shorthand}/**`),
  },
  shorthandComponents: {
    groupName: 'shorthand-components',
    elementNamePattern: shorthands.map((shorthand) => `${shorthand}/**/components/**`),
  },
});

export const mergeOxfmtConfigs = (...configs: OxfmtConfig[]): OxfmtConfig => {
  const merged: OxfmtConfig = {};
  const overrides: NonNullable<OxfmtConfig['overrides']> = [];

  for (const config of configs) {
    const { overrides: configOverrides = [], ...options } = config;
    Object.assign(merged, options);
    overrides.push(...configOverrides);
  }

  if (overrides.length > 0) merged.overrides = overrides;

  return merged;
};
