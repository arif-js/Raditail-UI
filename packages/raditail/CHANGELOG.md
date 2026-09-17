# raditail

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
