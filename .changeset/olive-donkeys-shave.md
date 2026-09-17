---
'raditail': patch
---

Add `DropdownMenuShortcut` and document two prop surprises.

- **`DropdownMenuShortcut`** now exists, mirroring `ContextMenuShortcut`. Without it there was no
  way to render a keyboard hint in a dropdown without hand-rolling the markup. `ContextMenuShortcut`
  also gained a `displayName`.
- **`TooltipContent`** documents that `content` and `children` are interchangeable (a test pins that
  `content` wins when both are given).
- **`Checkbox`** documents that `aria-label` belongs on `Checkbox` itself; `labelProps` only applies
  when a visible `label` is rendered, and was previously a silent no-op without one.
