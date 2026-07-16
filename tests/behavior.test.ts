import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const WORKSPACE = resolve(import.meta.dir, '..');
const OXLINT_BINARY = resolve(WORKSPACE, 'node_modules/.bin/oxlint');

let fixtureDirectory = '';
let output = '';

beforeAll(async () => {
  fixtureDirectory = await mkdtemp(join(WORKSPACE, '.cache/oxd-config-'));
  const presetUrl = pathToFileURL(resolve(WORKSPACE, 'packages/oxd-config-ts/dist/index.js')).href;

  await Promise.all([
    writeFile(
      join(fixtureDirectory, 'oxlint.config.ts'),
      `import { oxlint } from '${presetUrl}';\n\nexport default oxlint();\n`,
    ),
    writeFile(
      join(fixtureDirectory, 'native.ts'),
      `debugger;\nconst value: any = 1;\nexport const x = value;\nfunction namedFunction() { return value; }\nswitch (value) { default: break; }\n`,
    ),
  ]);

  const process = Bun.spawn({
    cmd: [OXLINT_BINARY, '--config', join(fixtureDirectory, 'oxlint.config.ts'), fixtureDirectory],
    cwd: WORKSPACE,
    env: { ...Bun.env, NODE_OPTIONS: '--experimental-strip-types' },
    stdout: 'pipe',
    stderr: 'pipe',
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(process.stdout).text(),
    new Response(process.stderr).text(),
    process.exited,
  ]);

  output = `${stdout}\n${stderr}`;
  expect(exitCode).toBe(1);
});

afterAll(async () => {
  if (fixtureDirectory) await rm(fixtureDirectory, { recursive: true, force: true });
});

describe('Oxlint behavior', () => {
  test('enforces native core and TypeScript rules', () => {
    expect(output).toContain('eslint(no-debugger)');
    expect(output).toContain('typescript(no-explicit-any)');
  });

  test('enforces native custom rules', () => {
    expect(output).toContain('eslint(func-style)');
    expect(output).toContain('eslint(id-length)');
  });

  test('preserves no-restricted-syntax without a native counterpart', () => {
    expect(output).toContain('eslint-compat(no-restricted-syntax)');
  });
});
