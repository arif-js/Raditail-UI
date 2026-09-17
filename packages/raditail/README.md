# Raditail

Raditail provides Radix UI powered components styled through Tailwind CSS tokens. Each component exposes a type-safe variant API via `class-variance-authority` and merges classes safely with `tailwind-merge`.

## Installation

```bash
pnpm add raditail
```

Raditail's Radix primitives, `lucide-react`, and `tailwindcss` are peer dependencies, so
your package manager installs them for you. `react` and `react-dom` (18 or 19) must already
be present.

The package entry point re-exports every component, so every peer above must be installed —
you cannot omit individual Radix primitives while importing from `raditail`.

## Tailwind preset

Add the preset to your Tailwind config, make sure Tailwind scans the library's build output,
and import the CSS variables once in your app.

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { raditailPreset } from 'raditail/theme'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    // Required: component styles live in the published build, not your source.
    './node_modules/raditail/dist/**/*.{js,mjs}',
  ],
  presets: [raditailPreset],
}

export default config
```

```ts
// app entry
import 'raditail/theme/tailwind.css'
import 'raditail/theme/styles.css'
```

Tokens use CSS variables so you can override them through `:root`, `[data-theme]`, or `.dark`.

## Usage

```tsx
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from 'raditail'

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Example</DialogTitle>
        <DialogDescription>
          Radix primitives with Tailwind theming.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
```

See the docs site (`packages/docs`) for live examples and theming guidance.
