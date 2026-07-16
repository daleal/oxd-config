# @daleal/oxd-config-vue

.
Opinionated Oxlint and Oxfmt configs for Vue + TypeScript projects, tuned for the way daleal likes imports, style rules, and type-aware linting.

## Install

```bash
bun add -D @daleal/oxd-config-vue oxlint oxfmt typescript
```

## Usage

```ts
// oxlint.config.ts
import { oxlint } from '@daleal/oxd-config-vue';

export default oxlint();
```

```ts
// oxfmt.config.ts
import { oxfmt } from '@daleal/oxd-config-vue';

export default oxfmt();
```

Oxfmt can receive the shorthands used in your project to sort the imports better:

```ts
export default oxfmt({ shorthands: ['~', '@'] });
```

Both functions accept an `overrides` option. Oxlint overrides are composed after the preset; Oxfmt overrides are merged after it.

```ts
export default oxfmt({
  shorthands: ['~', '@'],
  overrides: {
    semi: false,
  },
});
```
