# @daleal/oxd-config

Shared Oxlint and Oxfmt configs for:

- TypeScript projects
- Vue projects

## Install

```bash
# ts preset
bun add -D @daleal/oxd-config-ts oxlint oxfmt typescript

# vue preset
bun add -D @daleal/oxd-config-vue oxlint oxfmt typescript
```

## TypeScript

```ts
// oxlint.config.ts
import { oxlint } from '@daleal/oxd-config-ts';

export default oxlint();
```

```ts
// oxfmt.config.ts
import { oxfmt } from '@daleal/oxd-config-ts';

export default oxfmt({ shorthands: ['~'] });
```

You can also pass other configs using the `overrides` option to `oxfmt()` and `oxlint()`. Oxlint overrides are composed after the preset; Oxfmt overrides are merged after it.

```ts
export default oxfmt({
  shorthands: ['~'],
  overrides: {
    semi: false,
  },
});
```

## Vue

```ts
// oxlint.config.ts
import { oxlint } from '@daleal/oxd-config-vue';

export default oxlint();
```

```ts
// oxfmt.config.ts
import { oxfmt } from '@daleal/oxd-config-vue';

export default oxfmt({ shorthands: ['~', '@'] });
```

You can also pass other configs using the `overrides` option to `oxfmt()` and `oxlint()`. Oxlint overrides are composed after the preset; Oxfmt overrides are merged after it.

```ts
export default oxfmt({
  shorthands: ['~', '@'],
  overrides: {
    semi: false,
  },
});
```
