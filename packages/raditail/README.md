# Raditail

Raditail provides Radix UI powered components styled through Tailwind CSS tokens. Each component exposes a type-safe variant API via `class-variance-authority` and merges classes safely with `tailwind-merge`.

## Installation

```bash
pnpm add raditail @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tooltip @radix-ui/react-tabs tailwindcss class-variance-authority tailwind-merge clsx
```

## Tailwind preset

Add the preset to your Tailwind config and import the CSS variables once in your app.

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { raditailPreset } from 'raditail/theme'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
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
