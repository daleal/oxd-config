import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { oxfmt as typescriptOxfmt, oxlint as typescriptOxlint } from '@daleal/oxd-config-ts';
import { oxfmt as vueOxfmt, oxlint as vueOxlint } from '@daleal/oxd-config-vue';

const oxlintSchema = JSON.parse(
  readFileSync(
    resolve(import.meta.dir, '../node_modules/oxlint/configuration_schema.json'),
    'utf8',
  ),
) as {
  definitions: {
    DummyRuleMap: {
      properties: Record<string, unknown>;
    };
  };
};

describe('TypeScript config', () => {
  test('preserves recommended and custom lint rules', () => {
    const config = typescriptOxlint();
    const base = config.extends?.[0];

    expect(base?.categories).toEqual({
      correctness: 'off',
      nursery: 'off',
      pedantic: 'off',
      perf: 'off',
      restriction: 'off',
      style: 'off',
      suspicious: 'off',
    });
    expect(base?.rules?.['constructor-super']).toBe('error');
    expect(base?.rules?.['typescript/no-explicit-any']).toBe('error');
    expect(base?.rules?.['no-unused-vars']).toEqual([
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ]);
    expect(base?.rules?.['func-style']).toEqual([
      'error',
      'expression',
      { allowArrowFunctions: true },
    ]);
    expect(base?.rules?.['id-length']).toEqual(['error', { min: 2 }]);
    expect(base?.rules?.['eslint-compat/no-restricted-syntax']).toEqual([
      'error',
      {
        selector: 'SwitchStatement',
        message: 'Switch statements are disallowed. Use objects or if-else chains instead.',
      },
    ]);
  });

  test('uses native Oxlint rules whenever counterparts exist', () => {
    const rules = typescriptOxlint().extends?.[0]?.rules ?? {};
    const ruleNames = Object.keys(rules);
    const compatibilityRuleNames = ruleNames.filter((ruleName) =>
      ruleName.startsWith('eslint-compat/'),
    );
    const nativeRuleNames = ruleNames.filter((ruleName) => !ruleName.startsWith('eslint-compat/'));

    expect(compatibilityRuleNames).toEqual(['eslint-compat/no-restricted-syntax']);

    for (const ruleName of nativeRuleNames) {
      expect(oxlintSchema.definitions.DummyRuleMap.properties).toHaveProperty(ruleName);
    }
  });

  test('composes user lint and format overrides last', () => {
    const lintOverride = { rules: { 'no-console': 'off' as const } };
    const formatOverride = { semi: false };

    expect(typescriptOxlint({ overrides: lintOverride }).extends?.at(-1)).toBe(lintOverride);
    expect(typescriptOxfmt({ overrides: formatOverride }).semi).toBe(false);
  });

  test('moves stylistic and import-order behavior to Oxfmt', () => {
    const config = typescriptOxfmt({ shorthands: ['~'] });

    expect(config.arrowParens).toBe('always');
    expect(config.quoteProps).toBe('as-needed');
    expect(config.semi).toBe(true);
    expect(config.singleQuote).toBe(true);
    expect(config.sortImports).toMatchObject({
      customGroups: [
        { groupName: 'shorthand-components', elementNamePattern: ['~/**/components/**'] },
        { groupName: 'shorthand', elementNamePattern: ['~/**'] },
      ],
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
      internalPattern: ['~/'],
      order: 'asc',
      sortSideEffects: true,
    });
  });

  test('supports custom TypeScript import shorthands', () => {
    expect(typescriptOxfmt({ shorthands: ['@', '#'] }).sortImports).toMatchObject({
      customGroups: [
        {
          groupName: 'shorthand-components',
          elementNamePattern: ['@/**/components/**', '#/**/components/**'],
        },
        { groupName: 'shorthand', elementNamePattern: ['@/**', '#/**'] },
      ],
      internalPattern: ['@/', '#/'],
    });
  });

  test('omits empty shorthand import groups', () => {
    expect(typescriptOxfmt().sortImports).toMatchObject({
      customGroups: [],
      groups: ['builtin', 'external', 'internal', 'index', 'parent', 'sibling', 'style', 'unknown'],
      internalPattern: [],
    });
  });
});

describe('Vue config', () => {
  test('extends TypeScript and enables every native recommended Vue rule', () => {
    const config = vueOxlint();
    const vueConfig = config.extends?.[1];
    const vueRules = vueConfig?.overrides?.[1]?.rules;

    expect(config.extends).toHaveLength(2);
    expect(vueConfig?.plugins).toEqual(['eslint', 'typescript', 'vue']);
    expect(vueConfig?.overrides?.[0]?.env).toEqual({ browser: true });
    expect(vueConfig?.overrides?.[1]?.env).toEqual({ vue: true });
    expect(Object.keys(vueRules ?? {})).toHaveLength(37);
    expect(vueRules?.['vue/require-default-prop']).toBe('off');
    expect(vueRules?.['vue/define-props-destructuring']).toEqual([
      'error',
      { destructure: 'never' },
    ]);
  });

  test('translates shorthand path groups to Oxfmt custom import groups', () => {
    const config = vueOxfmt({ shorthands: ['~', '#'] });

    expect(config.singleAttributePerLine).toBe(true);
    expect(config.sortImports).toMatchObject({
      internalPattern: ['~/', '#/'],
      customGroups: expect.arrayContaining([
        {
          groupName: 'shorthand-components',
          elementNamePattern: ['~/**/components/**', '#/**/components/**'],
        },
        { groupName: 'shorthand', elementNamePattern: ['~/**', '#/**'] },
      ]),
    });
  });

  test('omits empty Vue shorthand import groups', () => {
    expect(vueOxfmt({ shorthands: [] }).sortImports).toMatchObject({
      customGroups: expect.not.arrayContaining([
        expect.objectContaining({ groupName: 'shorthand-components' }),
        expect.objectContaining({ groupName: 'shorthand' }),
      ]),
    });
  });
});
