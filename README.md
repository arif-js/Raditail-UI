# Raditail UI Monorepo

Raditail UI is a production-ready React component library built on Radix UI primitives and Tailwind CSS. This monorepo hosts the publishable library package and the Next.js documentation site.

## Packages

- `packages/raditail` – component library (ESM, CJS, and type definitions via `tsup`).
- `packages/docs` – Next.js App Router site used for documentation and live examples.

## Installation

Ensure you have [pnpm](https://pnpm.io) ≥ 8 installed, then bootstrap the workspace:

```bash
pnpm install
```

## Quick start

Launch both the component library Storybook and the Next.js docs site:

```bash
pnpm install
pnpm dev
```

`pnpm dev` runs Storybook for the library and the docs site in parallel. Open Storybook at http://localhost:6006 and the docs site at http://localhost:3000.

## Useful scripts

- `pnpm --filter raditail dev` – start the component library Storybook.
- `pnpm --filter docs dev` – run the documentation site locally.
- `pnpm --filter raditail build` – create the publishable build (`dist/`).
- `pnpm --filter raditail test` – execute Vitest + React Testing Library test suite.
- `pnpm lint` / `pnpm typecheck` – shared linting and type checking.
- `pnpm changeset` – create a new release entry.
- `pnpm release` – publish versions defined by Changesets.

## Inspect Storybook

Run Storybook in isolation for faster iteration on components:

```bash
pnpm --filter raditail storybook
```

Storybook is available at http://localhost:6006 with Autodocs, controls, and a theme switcher preconfigured.

## Tailwind + theming

The Raditail preset wires CSS variables for tokens (color, spacing, radius) directly into Tailwind:

```ts
// tailwind.config.ts
import { raditailPreset } from 'raditail/theme'

export default {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  presets: [raditailPreset],
}
```

Import the global styles once in your app entry:

```ts
import 'raditail/theme/tailwind.css'
import 'raditail/theme/styles.css'
```

Override tokens by applying a `data-theme` attribute or `.dark` class and redefining the CSS variables.

## Releasing

1. Run `pnpm changeset` to document changes.
2. Merge changesets into `main`.
3. GitHub Actions (`release.yml`) publishes packages to npm using provenance and `pnpm changeset publish`.

## Deploying the docs

The docs app is designed for Vercel. Point the Vercel project root to `packages/docs` and set the install command to `pnpm install` with build command `pnpm --filter docs build`.

## Contributing

- Use pnpm v8 or newer.
- Commit formatting is handled via Prettier; Husky runs `lint-staged` before each commit.
- Prefer adding stories and tests for new components.

## License

[MIT](./LICENSE)
