# raditail

## 0.3.0

### Minor Changes

- 54c4ad8: Require Tailwind CSS v3.4, and deprecate the `Button` `loading` prop.
  - **The `tailwindcss` peer range is narrowed to `^3.4.0`.** It previously allowed `^4.0.0`, but
    nothing about the package worked under v4: the preset extends `ringColor` (v4 reworked ring colour),
    and `raditail/theme/tailwind.css` is v3 directives (`@tailwind base` / `components` / `utilities`),
    which v4 replaced with `@import "tailwindcss"`. The v4 claim was never tested. Narrowing the range
    turns a silent styling failure into an install-time signal; v4 support is a separate piece of work.
  - **`Button`'s `loading` prop is deprecated** in favour of `isLoading`, which is the one that renders
    the spinner, disables the button and sets `aria-busy`; `loading` only applied `cursor-progress`.
    It still works and still styles the button, but now logs a one-time development warning. It is also
    no longer forwarded to the DOM element, where it previously leaked as an unknown attribute. Removal
    is scheduled for 1.0.

- 54c4ad8: Make single-component imports actually cheap, and add per-component entry points.

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

- 54c4ad8: Add Card, Badge, Table, Skeleton, Textarea and a toast convenience layer.

  Six purely additive components, each with its own entry point:
  - **`Card`** (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) with
    `outline` / `elevated` / `flat` variants.
  - **`Badge`** with `solid` / `outline` / `subtle` variants across every colour scheme.
  - **`Table`** (`TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`,
    `TableCaption`) — scroll-wrapped, with `scope="col"` on headers.
  - **`Skeleton`**, `aria-hidden` so a placeholder never becomes the accessible name.
  - **`Textarea`**, styled to match `Input`.
  - **`Toaster`** and **`useToast`**, which own the provider, the queue and the viewport:

    ```tsx
    // App root
    ;<Toaster position="bottom-right">
      <App />
    </Toaster>

    // Anywhere below it
    const { toast } = useToast()
    toast({ title: 'Saved', description: 'Changes stored.' })
    ```

    `toast`, `dismiss`, `dismissAll`, per-toast durations, colour schemes and action buttons. Radix's
    primitives remain exported for anyone who wants to manage the queue themselves.

### Patch Changes

- 54c4ad8: Add `DropdownMenuShortcut` and document two prop surprises.
  - **`DropdownMenuShortcut`** now exists, mirroring `ContextMenuShortcut`. Without it there was no
    way to render a keyboard hint in a dropdown without hand-rolling the markup. `ContextMenuShortcut`
    also gained a `displayName`.
  - **`TooltipContent`** documents that `content` and `children` are interchangeable (a test pins that
    `content` wins when both are given).
  - **`Checkbox`** documents that `aria-label` belongs on `Checkbox` itself; `labelProps` only applies
    when a visible `label` is rendered, and was previously a silent no-op without one.

- 54c4ad8: Fix the published package metadata and ship the documentation.

  Packaging:
  - **Removed `engines`.** `node: ">=20 <23"` excluded Node 23+ on a browser React library, and
    npm used it to resolve a _different_ version: on Node 24, `npm install raditail` silently
    installed `0.1.0` instead of the current release. The constraint now lives only in the monorepo
    root, and CI installs the packed tarball on Node 20, 22 and 24 to keep it out.
  - **`sideEffects` now uses `"**/\*.css"`.** A bare `import 'raditail/theme/styles.css'` has no
    bindings, and a pattern that fails to match nested files lets a bundler drop it — which renders
    every component unstyled with no error.
  - **`exports` types resolve correctly under `require`.** The `.` and `./theme` entries declared a
    single `types` target, so TypeScript resolved ESM declarations for CJS imports. Each condition
    now carries its own `types` (`.d.ts` / `.d.cts`). Caught by `publint`.
  - `files` now ships `CHANGELOG.md`, `COMPOSITION.md`, `STYLING.md`, `THEMING.md` and the generated
    API reference. Previously only `README.md` and `LICENSE` were included.
  - Added `publint` and `@arethetypeswrong/cli` to CI, plus a pack-and-consume smoke test.

  Docs:
  - New [COMPOSITION.md](https://github.com/arif-js/Raditail-UI/blob/main/packages/raditail/COMPOSITION.md)
    documents the rules that were only discoverable by reading the built output: content components
    render their own portal and overlay, `DropdownMenu` children are a sibling of the trigger, colours
    are namespaced `rt-*`, `Accordion` defaults to `type="single"`, and `DialogContent` has no close
    button by default.
  - [THEMING.md](https://github.com/arif-js/Raditail-UI/blob/main/packages/raditail/THEMING.md)
    documents the two layers of CSS variables as the intended design.
  - Generated API reference (`docs/api`), built from the source JSDoc and published in the tarball.

## 0.2.1

### Patch Changes

- 5810580: Ship the `raditail/theme` type declarations.

  `0.2.0` was published without `dist/theme/index.d.ts` and `dist/theme/index.d.cts`,
  even though `exports["./theme"].types` points at the former. Importing from
  `raditail/theme` worked at runtime but failed to resolve types under the `node16`
  and `bundler` module resolution modes.

  The build ran `tsup --clean`, and that flag applies to every config in
  `tsup.config.ts`. tsup builds those two configs concurrently, so each one's clean
  step could delete output the other had already emitted. Cleaning is now a separate
  serial step (`pnpm clean`) that finishes before tsup starts.

## 0.2.0

### Minor Changes

- 629403b: Repair package consumption and component styling.

  **Breaking:** the `NavigationMenu*` components have been removed.

  Consumer fixes:
  - The documented stylesheet imports (`raditail/theme/styles.css` and
    `raditail/theme/tailwind.css`) now resolve. They previously threw
    `ERR_PACKAGE_PATH_NOT_EXPORTED`, leaving consumers with unstyled components.
  - Components now carry a `'use client'` boundary, so they can be rendered from a
    Next.js App Router Server Component. Without it, the build failed with
    `createContext is not a function`.
  - `lucide-react` is now a required peer dependency. It was declared optional, but
    the package entry point imports it unconditionally, so omitting it broke every
    import from `raditail`.
  - `LICENSE` is included in the published tarball.

  Styling fixes:
  - Opacity utilities built from CSS variables (such as
    `hover:bg-[var(--rt-primary-color)]/10`) produced no CSS at all under Tailwind
    v3. They now use the preset's `rt-*` colour tokens, restoring hover and focus
    states across Button, Checkbox, Input, Select, Switch, Slider, Tabs and others.
  - Malformed `var()` classes missing a closing parenthesis left Checkbox, Avatar,
    RadioGroup and DropdownMenu partially unstyled.
  - Ring colours now use the `DEFAULT` key instead of `rt`, which had been
    overwriting the nested `rt` colour scale and breaking every `ring-rt-*`
    utility.

  Tailwind config: add `./node_modules/raditail/dist/**/*.{js,mjs}` to `content` so
  the library's classes are generated. See the package README.
