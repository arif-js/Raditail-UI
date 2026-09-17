---
'raditail': minor
---

Require Tailwind CSS v3.4, and deprecate the `Button` `loading` prop.

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
