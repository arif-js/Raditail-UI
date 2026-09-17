---
'raditail': minor
---

Add Card, Badge, Table, Skeleton, Textarea and a toast convenience layer.

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
