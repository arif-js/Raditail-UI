# Raditail UI

<div align="center">

A beautiful, accessible React component library built on Radix UI primitives and Tailwind CSS.

[![NPM Version](https://img.shields.io/npm/v/raditail.svg)](https://www.npmjs.com/package/raditail)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/arif-js/Raditail-UI.svg)](https://github.com/arif-js/Raditail-UI)

[View Components on Storybook](#) • [Documentation](./packages/raditail/README.md) • [Report Bug](https://github.com/arif-js/Raditail-UI/issues)

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

Button • Dialog • Select • Tabs • Tooltip • Input • Accordion • Alert Dialog • Avatar • Checkbox • Collapsible • Context Menu • Dropdown Menu • Hover Card • Navigation Menu • Popover • Progress • Radio Group • Scroll Area • Separator • Sheet • Slider • Switch • Toast • Toggle Group

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

Individual Radix UI components are peer dependencies and will be installed as needed. See the [full peer dependencies list](./packages/raditail/package.json#L48-L76).

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
import { Button, Dialog, Select } from 'raditail'

function App() {
  return (
    <div>
      <Button variant="primary" size="md">
        Click me
      </Button>

      <Dialog>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Welcome</Dialog.Title>
          <Dialog.Description>
            This is a beautiful accessible dialog component.
          </Dialog.Description>
        </Dialog.Content>
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

Visit our Storybook to explore all components with live examples and interactive controls:

**[View Storybook →](#)**

_(Deploy your Storybook to Vercel and add the link here)_

## Monorepo Structure

This repository is a monorepo that contains:

- **`packages/raditail`** – The component library (publishable to npm)
- **`packages/docs`** – Next.js documentation site

## Development

### Prerequisites

- Node.js 18+
- pnpm 8+

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

```bash
# Start Storybook for component development
pnpm storybook

# Build the component library
pnpm --filter raditail build

# Run tests
pnpm --filter raditail test

# Run linting
pnpm lint

# Type checking
pnpm typecheck
```

## Publishing to npm

### First-time Setup

1. Create an npm account at [npmjs.com](https://www.npmjs.com/)
2. Login to npm:
   ```bash
   npm login
   ```

### Publishing a New Version

```bash
# 1. Build the package
pnpm --filter raditail build

# 2. Create a changeset (documents what changed)
pnpm changeset

# 3. Version the package (updates version in package.json)
pnpm version

# 4. Publish to npm (from the packages/raditail directory)
cd packages/raditail
npm publish
```

Alternatively, use the automated release workflow via GitHub Actions (see `.github/workflows/release.yml`).

## Deploying Storybook to Vercel

The Storybook is configured to deploy automatically to Vercel:

1. Go to [vercel.com](https://vercel.com) and import your repository
2. Vercel will detect `vercel.json` and configure the build automatically
3. Every push to `main` will trigger a new deployment
4. Update the Storybook link in this README once deployed

## Contributing

Contributions are welcome! Please read our [contributing guidelines](./CONTRIBUTING.md) before submitting a pull request.

- Use pnpm v8 or newer
- Commit formatting is handled via Prettier with Husky pre-commit hooks
- Add stories and tests for new components
- Follow the existing code style

## License

[MIT](./LICENSE) © Arif

---

<div align="center">

Made with ❤️ using React, Radix UI, and Tailwind CSS

</div>
