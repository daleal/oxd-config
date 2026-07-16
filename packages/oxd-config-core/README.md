# @daleal/oxd-config-core

Shared internals for the published `@daleal/oxd-config-*` presets.

This package is mainly meant to support the TypeScript and Vue presets in this monorepo.

## What it exports

- `toArray()`
- `createShorthandImportConfig()`
- `mergeOxfmtConfigs()`
- shared config types

## Install

```bash
bun add -D @daleal/oxd-config-core
```

## Usage

```ts
import { createShorthandImportConfig } from '@daleal/oxd-config-core';

const shorthandImportConfig = createShorthandImportConfig(['~', '@']);
```

If you just want a ready-to-use preset, install `@daleal/oxd-config-ts` or `@daleal/oxd-config-vue` instead.
