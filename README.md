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
      <Button variant="primary" size="md">
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

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

- Use pnpm v8 or newer
- Run tests/linting before pushing
- Add stories and tests for new components
- Follow the established coding style and commit conventions

## License

[MIT](./LICENSE) © Arif

---

<div align="center">

Made with ❤️ using React, Radix UI, and Tailwind CSS

</div>
