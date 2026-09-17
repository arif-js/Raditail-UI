---
'raditail': minor
---

Make single-component imports actually cheap, and add per-component entry points.

Importing `Button` from the barrel used to cost **68.6 kB gzipped across 48 Radix modules** — 1.02×
the cost of importing the whole library. Every component definition ended with
`SelectTrigger.displayName = SelectPrimitive.Trigger.displayName`, a module-scope _read_ on a Radix
namespace, so no bundler could prove any component was unused. The barrel was effectively
all-or-nothing.

- **Per-component modules.** The build now emits one module per component with shared chunks, so
  `dist/index.mjs` is re-exports and tree-shaking works. A `Button` import is now **8.9 kB gzipped
  across 2 Radix modules** — an 87% reduction — and `@radix-ui/react-select` is no longer reachable
  from it. Importing the whole library as a namespace costs about the same as before, which is the
  expected trade for a multi-module build.
- **Subpath entry points.** Every component is importable on its own:
  `import { Button } from 'raditail/button'`. The barrel is unchanged and not deprecated; both forms
  work forever.
- **`'use client'` is now per entry point**, not just on the barrel. Subpath imports would otherwise
  have shipped client-only components with no boundary, failing in the Next.js App Router with
  `createContext is not a function`.
- **Peers are optional.** Previously all 27 peers were required, so `raditail/button` still demanded
  22 Radix packages. Every primitive, `lucide-react` and `tailwindcss` is now an optional peer;
  `react` and `react-dom` remain required. The barrel still resolves every primitive it can reach,
  so install them all if you import from `raditail`.
- Normalised the class-emission shorthand: `bg-[--rt-primary-color]` is now
  `bg-[var(--rt-primary-color)]`. The shorthand was Tailwind v3-only.

A CI bundle budget and a module-graph assertion now guard this: importing one component must stay
under 25 kB gzip and must not reach an unrelated primitive.
