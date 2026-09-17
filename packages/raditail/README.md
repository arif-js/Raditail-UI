# Raditail

Raditail provides Radix UI powered components styled through Tailwind CSS tokens. Each component exposes a type-safe variant API via `class-variance-authority` and merges classes safely with `tailwind-merge`.

## Installation

```bash
pnpm add raditail react react-dom
```

`react` and `react-dom` (18 or 19) are the only required peers. `tailwindcss` (v3.4+), the Radix
primitives and `lucide-react` are declared **optional**: install the ones your imports need.

Raditail requires **Tailwind CSS v3.4 or newer, but not v4**. The preset and the shipped
stylesheets are v3-shaped, and v4 has not been verified. The peer range is narrowed to v3 so the
mismatch surfaces at install time rather than as silently missing styles.

### Which peers do I need?

Every Radix primitive is reachable from the barrel, so the barrel needs all of them. Prefer the
per-component subpath entry points if you want a small dependency set and a small bundle:

```bash
# Just Button: react, react-dom and one primitive
pnpm add raditail @radix-ui/react-slot

# The whole barrel: everything the barrel can reach
pnpm add raditail react react-dom tailwindcss \
  @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar \
  @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu \
  @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card \
  @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group \
  @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator \
  @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch \
  @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle-group \
  @radix-ui/react-tooltip lucide-react
```

If a primitive is missing, your bundler reports an unresolved import naming the package.

### Importing a single component

Every component has its own entry point, so you can skip the barrel entirely:

```tsx
import { Button } from 'raditail/button' // only @radix-ui/react-slot
import { Dialog, DialogContent } from 'raditail/dialog' // + lucide-react
```

Both forms work; `import { Button } from 'raditail'` is not deprecated. The difference is what
gets pulled in: the barrel is tree-shaken per module, but it still has to resolve every peer it can
reach.

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

## Documentation

- **[COMPOSITION.md](./COMPOSITION.md)** — read this before wiring components together. Covers the
  non-obvious rules: which content components render their own portal and overlay, why
  `DropdownMenu` children are not placed inside the menu, the `rt-*` colour namespace, and the
  `Accordion` default.
- **[THEMING.md](./THEMING.md)** — colour tokens, dark mode, multiple themes.
- **[STYLING.md](./STYLING.md)** — overriding styles, custom variants, extending the preset.
- **[API reference](./docs/api/README.md)** — generated from the source. Every export with its
  props and JSDoc.

## Composition at a glance

Five rules cause most integration bugs. The short version:

1. `DialogContent`, `SheetContent` and `AlertDialogContent` already render their own portal **and**
   overlay — do not add `DialogPortal` / `DialogOverlay` around them.
2. `DropdownMenu`'s `children` render as a sibling of the trigger. Use the `menuItems` prop, or pass
   an explicit `DropdownMenuContent`.
3. Colour utilities are namespaced: `bg-rt-primary`, `text-rt-muted-foreground`.
4. `Accordion` defaults to `type="single"`, which needs `collapsible` to allow closing the open panel.
5. `DialogContent` renders **no close button by default** — pass `showCloseButton` if the dialog
   needs a visible way out.

[COMPOSITION.md](./COMPOSITION.md) explains each one with examples.
