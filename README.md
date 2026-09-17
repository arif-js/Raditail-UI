# Raditail UI

<div align="center">

A beautiful, accessible React component library built on Radix UI primitives and Tailwind CSS.

[![NPM Version](https://img.shields.io/npm/v/raditail.svg)](https://www.npmjs.com/package/raditail)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/arif-js/Raditail-UI.svg)](https://github.com/arif-js/Raditail-UI)

[![View Storybook](https://img.shields.io/badge/Storybook-Live-blue)](https://raditail-storybook.vercel.app)
[![Documentation](https://img.shields.io/badge/Docs-Package%20Guide-success)](./packages/raditail/README.md)
[![Report Issue](https://img.shields.io/badge/GitHub-Issue%20Tracker-red)](https://github.com/arif-js/Raditail-UI/issues)

</div>

---

## Features

- **Accessible** - Built on Radix UI primitives with WAI-ARIA compliance
- **Customizable** - Powered by Tailwind CSS with full theme support
- **Type-safe** - Written in TypeScript with full type definitions
- **Dark Mode** - Built-in dark mode support
- **Tree-shakeable** - Import only what you need
- **Modern** - ESM and CJS support, works with Next.js, Vite, and more

## Components

Button • Dialog • Select • Tabs • Tooltip • Input • Accordion • Alert Dialog • Avatar • Checkbox • Collapsible • Context Menu • Dropdown Menu • Hover Card • Popover • Progress • Radio Group • Scroll Area • Separator • Sheet • Slider • Switch • Toast • Toggle Group

## Installation

```bash
npm install raditail
# or
pnpm add raditail
# or
yarn add raditail
```

### Peer Dependencies

Raditail requires the following peer dependencies:

```bash
npm install react react-dom tailwindcss
```

Raditail keeps Radix primitives as peer dependencies so you can choose the ones you need. See the [full peer dependency list](./packages/raditail/package.json).

## Quick Start

### 1. Configure Tailwind

Add the Raditail preset to your `tailwind.config.ts`:

```ts
import { raditailPreset } from 'raditail/theme'

export default {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './node_modules/raditail/dist/**/*.{js,mjs}',
  ],
  presets: [raditailPreset],
}
```

### 2. Import Styles

Import the global styles in your app entry point (e.g., `_app.tsx`, `layout.tsx`, or `main.tsx`):

```tsx
import 'raditail/theme/tailwind.css'
import 'raditail/theme/styles.css'
```

### 3. Use Components

```tsx
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Select,
} from 'raditail'

function App() {
  return (
    <div>
      <Button variant="solid" colorScheme="primary" size="md">
        Click me
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Welcome</DialogTitle>
          <DialogDescription>
            This is a beautiful accessible dialog component.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

## Dark Mode

Raditail supports dark mode out of the box. Apply the `dark` class to enable dark mode:

```tsx
<html className="dark">
  <body>{/* Your app */}</body>
</html>
```

Or use `data-theme="dark"` attribute:

```tsx
<div data-theme="dark">{/* Your content */}</div>
```

## Explore Components

Visit our hosted Storybook to explore every component with live controls:

**[Play with the components →](https://raditail-storybook.vercel.app)**

## Monorepo Structure

This repository is a monorepo that contains:

- **`packages/raditail`** – The component library (publishable to npm)
- **`packages/docs`** – Next.js documentation site

## Development

### Prerequisites

- Node.js 20 or newer (below 23)
- pnpm 9 (`corepack enable` picks up the pinned version)

### Setup

```bash
# Clone the repository
git clone https://github.com/arif-js/Raditail-UI.git
cd Raditail-UI

# Install dependencies
pnpm install

# Start development (Storybook + Docs)
pnpm dev
```

### Useful Scripts

| Command                                  | Description                               |
| ---------------------------------------- | ----------------------------------------- |
| `pnpm --filter raditail storybook`       | Start component development playground    |
| `pnpm --filter raditail build`           | Produce `dist/` for the published package |
| `pnpm --filter raditail build-storybook` | Generate the static Storybook site        |
| `pnpm --filter raditail test`            | Run unit tests                            |
| `pnpm lint`                              | Lint the entire monorepo                  |
| `pnpm typecheck`                         | Type-check all packages                   |
| `pnpm dev`                               | Run Storybook and docs app together       |

## Contributing

Contributions are welcome, whether that's a typo fix, a bug report, or a brand-new component.
Please read **[CONTRIBUTING.md](./CONTRIBUTING.md)** first — it covers the full workflow, coding
guidelines, and how to run the test suite.

The short version:

1. **Open an issue first** for anything non-trivial, so the approach can be agreed before you write
   code.
2. **Fork** the repo and branch from `main` (`git checkout -b feat/my-component`).
3. **Make your change**, adding Storybook stories for UI work and tests for logic.
4. **Run the checks** that CI runs:
   ```bash
   pnpm lint && pnpm typecheck && pnpm --filter raditail test && pnpm --filter raditail build
   ```
5. **Add a changeset** if your change affects the published package:
   ```bash
   pnpm changeset
   ```
   Docs- and tooling-only changes don't need one.
6. **Commit using [Conventional Commits](https://www.conventionalcommits.org/)**
   (e.g. `feat: add badge component`), then open a pull request against `main` and link the issue.

## Reporting Issues

All bugs and feature requests are tracked on the
**[GitHub issue tracker](https://github.com/arif-js/Raditail-UI/issues)**.

Before opening one, please
[search existing issues](https://github.com/arif-js/Raditail-UI/issues?q=is%3Aissue) — it may
already be reported or fixed on `main`.

### Bug reports

A good report is one someone else can reproduce. Please include:

- **The version of `raditail`** you're on (`npm list raditail`), plus your React and Tailwind
  versions.
- **Your environment** — framework and version (Next.js App Router, Vite, etc.), Node version, and
  browser if it's a rendering or accessibility issue.
- **What you expected to happen**, and **what actually happened**, including the exact error text
  rather than a paraphrase.
- **A minimal reproduction** — a short code snippet, a StackBlitz, or a small repo. The smaller it
  is, the faster it gets fixed.

[**→ Open a bug report**](https://github.com/arif-js/Raditail-UI/issues/new)

### Feature requests

Describe the **problem you're trying to solve** before the solution you have in mind, and say
whether you'd be willing to implement it. Requests to wrap an existing Radix primitive are
especially welcome; please link the primitive's docs.

[**→ Request a feature**](https://github.com/arif-js/Raditail-UI/issues/new)

### Questions and support

For "how do I…" questions, these are usually faster than waiting on an issue:

- The **[live Storybook](https://raditail-storybook.vercel.app)** — working examples and live
  controls for every component.
- The **[package guide](./packages/raditail/README.md)** — installation, theming, and the export
  map.

If neither answers it, open an issue and prefix the title with `Question:` so it can be triaged
apart from bug reports.

## Security

**Please do not report security vulnerabilities through public GitHub issues.**

Email **contact@arifcodes.com** instead, with a description of the issue, the steps to reproduce
it, and the affected version. You'll get an acknowledgement, and please give a reasonable window
for a fix before any public disclosure.

## License

[MIT](./LICENSE) © Arif

---

<div align="center">

Made with ❤️ using React, Radix UI, and Tailwind CSS

</div>
