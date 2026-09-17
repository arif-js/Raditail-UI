# Composition Rules

Raditail wraps Radix UI, but in several places it deliberately does **more** than a thin
pass-through. Those places are not discoverable from the type signatures, and getting them wrong
produces either a double-rendered backdrop or an unstyled component. This page is the missing
contract.

---

## 1. Content components already render their own portal and overlay

`DialogContent`, `SheetContent` and `AlertDialogContent` each render
`<Portal><Overlay />...<Content /></Portal>` internally.

**Do not add the portal or overlay yourself.** The Radix documentation shows the explicit form, so
this is the easiest mistake to make:

```tsx
// Wrong - two backdrops are rendered, and the second one never closes
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>…</DialogContent>
  </DialogPortal>
</Dialog>

// Right
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>…</DialogContent>
</Dialog>
```

`DialogPortal`, `DialogOverlay`, `SheetOverlay` and `AlertDialogOverlay` remain exported, for the
cases where you are building something custom. They are opt-in escape hatches, not a required part
of the standard composition.

## 2. `DropdownMenu` children are a sibling of the trigger

`DropdownMenu` renders, in order: `trigger`, then the generated content from `menuItems`, then
`children` — all directly inside the Radix root. Children are therefore **not** placed inside the
menu; a menu built from children needs an explicit `DropdownMenuContent`:

```tsx
// Renders "Profile" into the page, not into the menu
<DropdownMenu trigger={<Button>Account</Button>}>
  <DropdownMenuItem>Profile</DropdownMenuItem>
</DropdownMenu>

// Right - DropdownMenuContent portals the items into the menu
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>
      Sign out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

If you just need a list, prefer the declarative `menuItems` prop — it is the path that is actually
shaped by this component:

```tsx
<DropdownMenu
  trigger={<Button>Account</Button>}
  menuItems={[
    { label: 'Profile' },
    { type: 'separator' },
    { label: 'Sign out', onSelect: signOut, inset: true },
  ]}
/>
```

`ContextMenu` behaves the same way.

## 3. Colour utilities are namespaced `rt-*`

The preset registers the token scale under an `rt` key, so utility classes carry the prefix:

| Correct                    | Not this                |
| -------------------------- | ----------------------- |
| `bg-rt-primary`            | `bg-primary`            |
| `text-rt-muted-foreground` | `text-muted-foreground` |
| `border-rt-border`         | `border-border`         |
| `bg-rt-destructive/10`     | `bg-destructive/10`     |

Opacity modifiers work on the `rt-*` utilities because the preset expresses each colour as
`rgb(var(--rt-…) / <alpha-value>)`.

For arbitrary values, use the full `var()` form rather than the bracket shorthand:

```tsx
// Correct, and portable across Tailwind versions
<div className="bg-[var(--rt-primary-color)]" />

// Avoid: Tailwind v3-only shorthand
<div className="bg-[--rt-primary-color]" />
```

## 4. `Accordion` defaults to `type="single"`

Omitting `type` gives you single-selection mode. In single mode the open panel **cannot be closed
again** unless you pass `collapsible`, because Radix requires a non-empty value:

```tsx
// One panel open at a time, and it can be closed again
<Accordion type="single" collapsible>
  <AccordionItem value="one">
    <AccordionTrigger>First</AccordionTrigger>
    <AccordionContent>…</AccordionContent>
  </AccordionItem>
</Accordion>

// For independent panels you must opt in
<Accordion type="multiple">…</Accordion>
```

`collapsible` is a single-mode-only prop; passing it with `type="multiple"` is an error in Radix.

## 5. Dialog close buttons are opt-in

`DialogContent` renders **no visible close button by default**. Escape and clicking the overlay are
the only ways out, which is easy to miss until someone is stuck in a modal:

```tsx
// No visible way out beyond Escape / overlay click
<DialogContent>
  <DialogTitle>Settings</DialogTitle>
</DialogContent>

// Explicit close affordance
<DialogContent showCloseButton>
  <DialogTitle>Settings</DialogTitle>
</DialogContent>
```

This default is scheduled to flip to `true` in 1.0. It is not flipped in a minor release because
that would change rendering for existing consumers. `SheetContent` has no close button at all;
compose one with `SheetClose`.

---

## How deeply is each component wrapped?

Abstraction depth is not uniform, and it is worth knowing which kind of component you are holding.

**Opinionated** — own variant system, own layout decisions, props beyond Radix's:
`Button`, `Dialog`, `Sheet`, `AlertDialog`, `DropdownMenu`, `ContextMenu`, `Toast`, `Tooltip`,
`Checkbox`, `Input`, `Avatar`, `Progress`, `RadioGroup`, `Switch`, `ToggleGroup`.

**Close to a pass-through** — Radix props and semantics, plus styling:
`Tabs`, `Slider`, `Separator`, `ScrollArea`, `Popover`, `HoverCard`, `Collapsible`, `Select`.

For the pass-through tier, the Radix documentation is the accurate reference for behaviour. For the
opinionated tier, check the API reference under `docs/api/` in the published package.

---

## Building your own components

Raditail intentionally does **not** ship layout primitives such as Card, Table, Badge or Skeleton.
Compose them from the same tokens so they sit consistently next to the shipped components:

```tsx
import { cn } from 'raditail'

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-[var(--rt-radius-lg)] border border-[var(--rt-border-color)] bg-[var(--rt-bg)] text-[var(--rt-foreground)] shadow-sm',
        className
      )}
      {...props}
    />
  )
}
```

Two rules keep custom components consistent with the library:

1. **Style from tokens, not literal colours.** `border-[var(--rt-border-color)]` follows the theme
   and dark mode; `border-slate-200` does not.
2. **Merge classes with `cn`.** It is exported from the package root, so a caller's `className`
   reliably wins over the defaults.

`cn` is the only utility exported from the package root. It is also the reason a `tailwind-merge`
copy is present in every bundle that imports anything from Raditail — see the note in STYLING.md.

For typography, spacing, radius and colour tokens, see [THEMING.md](./THEMING.md) and
[STYLING.md](./STYLING.md).
