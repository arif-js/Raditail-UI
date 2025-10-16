# Styling & Customization Guide

This guide covers how to customize Raditail UI components beyond the basic theming. Learn how to override styles, customize sizes, add custom variants, and more.

## Table of Contents

- [Theming (Colors & Tokens)](#theming-colors--tokens)
- [Overriding Component Styles](#overriding-component-styles)
- [Customizing Sizes](#customizing-sizes)
- [Adding Custom Variants](#adding-custom-variants)
- [Custom Color Schemes](#custom-color-schemes)
- [Tailwind Configuration](#tailwind-configuration)
- [Component-Specific Customization](#component-specific-customization)

---

## Theming (Colors & Tokens)

For basic color theming, see [THEMING.md](./THEMING.md). This covers:

- Changing primary, secondary, destructive, success, and warning colors
- Dark mode customization
- Multiple theme support

---

## Overriding Component Styles

### Using the `className` Prop

Every Raditail component accepts a `className` prop that you can use to override styles:

```tsx
import { Button } from '@raditail/ui'

// Add custom classes
<Button className="font-bold uppercase tracking-wider">
  Custom Button
</Button>

// Override colors
<Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
  Gradient Button
</Button>

// Combine with existing variants
<Button variant="outline" className="border-2 border-dashed">
  Dashed Border
</Button>
```

### CSS Modules or Styled Components

You can use CSS modules or styled-components with Raditail:

```tsx
// With CSS Modules
import styles from './MyButton.module.css'

;<Button className={styles.customButton}>My Button</Button>

// With styled-components
import styled from 'styled-components'

const StyledButton = styled(Button)`
  border-radius: 999px;
  padding: 1rem 2rem;
  text-transform: uppercase;
`
```

### Global Style Overrides

To override styles globally, use CSS with higher specificity:

```css
/* app/globals.css */

/* Override all buttons */
.raditail-button {
  border-radius: 0.25rem;
  font-weight: 600;
}

/* Target specific variants */
[data-variant='solid'] {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Target specific sizes */
[data-size='lg'] {
  font-size: 1.125rem;
  padding: 0.75rem 1.5rem;
}
```

---

## Customizing Sizes

### Override Default Sizes

You can customize component sizes by overriding CSS variables:

```css
:root {
  /* Button sizes */
  --button-height-sm: 2rem;
  --button-height-md: 2.5rem;
  --button-height-lg: 3rem;

  /* Border radius */
  --rt-radius-sm: 0.25rem; /* 4px */
  --rt-radius-md: 0.5rem; /* 8px */
  --rt-radius-lg: 1rem; /* 16px */

  /* Spacing */
  --rt-spacing-xs: 0.25rem;
  --rt-spacing-sm: 0.5rem;
  --rt-spacing-md: 0.75rem;
  --rt-spacing-lg: 1rem;
  --rt-spacing-xl: 1.5rem;
}
```

### Per-Component Size Customization

Use data attributes to target specific sizes:

```css
/* Make all large buttons extra large */
.my-button[data-size='lg'] {
  height: 3.5rem;
  padding: 0 2.5rem;
  font-size: 1.25rem;
}

/* Make tooltips larger */
.my-tooltip[data-size='md'] {
  padding: 0.75rem 1rem;
  font-size: 1rem;
}
```

### Runtime Size Props

Most components support size props:

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

<Input size="sm" />
<Checkbox size="lg" />
<Switch size="md" />
<Tooltip size="lg">Content</Tooltip>
```

---

## Adding Custom Variants

### Extending Button Variants

You can add custom variants by extending the component:

```tsx
// components/CustomButton.tsx
import { Button, type ButtonProps } from '@raditail/ui'
import { cn } from '@raditail/ui/utils'

type CustomButtonProps = ButtonProps & {
  customVariant?: 'neon' | 'gradient' | 'glass'
}

export const CustomButton = ({ customVariant, className, ...props }: CustomButtonProps) => {
  const variantClasses = {
    neon: 'bg-black text-cyan-400 border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]',
    gradient: 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white border-0',
    glass: 'bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20'
  }

  return (
    <Button
      className={cn(
        customVariant && variantClasses[customVariant],
        className
      )}
      {...props}
    />
  )
}

// Usage
<CustomButton customVariant="neon">Neon Button</CustomButton>
<CustomButton customVariant="gradient">Gradient Button</CustomButton>
<CustomButton customVariant="glass">Glass Button</CustomButton>
```

### Creating Preset Styles

Create reusable style presets:

```tsx
// lib/buttonPresets.ts
export const buttonPresets = {
  hero: 'h-14 px-8 text-lg font-bold rounded-full shadow-xl',
  minimal: 'h-10 px-4 rounded-none border-0 border-b-2 hover:border-b-4',
  pill: 'rounded-full px-6',
  square: 'aspect-square p-0 w-12'
}

// Usage
<Button className={buttonPresets.hero}>Get Started</Button>
<Button className={buttonPresets.pill}>Follow</Button>
```

---

## Custom Color Schemes

### Per-Component Color Scheme

Many components support the `colorScheme` prop:

```tsx
<Button colorScheme="primary">Save</Button>
<Button colorScheme="destructive">Delete</Button>
<Button colorScheme="success">Approve</Button>
<Button colorScheme="warning">Caution</Button>
<Tooltip colorScheme="destructive">Danger zone</Tooltip>
```

### Adding New Color Schemes

Extend the color system with custom schemes:

```css
/* Add custom color schemes */
:root {
  /* Info color scheme */
  --rt-info: 14 165 233; /* sky-500 */
  --rt-info-foreground: 255 255 255;

  /* Custom brand color */
  --rt-brand: 236 72 153; /* pink-500 */
  --rt-brand-foreground: 255 255 255;
}

/* Create helper classes */
:root {
  --rt-info-color: rgb(var(--rt-info));
  --rt-info-contrast: rgb(var(--rt-info-foreground));
  --rt-brand-color: rgb(var(--rt-brand));
  --rt-brand-contrast: rgb(var(--rt-brand-foreground));
}
```

Then use them with className:

```tsx
<Button className="bg-[var(--rt-info-color)] text-[var(--rt-info-contrast)]">
  Info Button
</Button>

<Tooltip className="bg-[var(--rt-brand-color)] text-[var(--rt-brand-contrast)]">
  Brand Tooltip
</Tooltip>
```

---

## Tailwind Configuration

### Extending the Preset

Raditail provides a Tailwind preset. You can extend it:

```ts
// tailwind.config.ts
import { raditailPreset } from '@raditail/ui/theme'
import type { Config } from 'tailwindcss'

const config: Config = {
  presets: [raditailPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@raditail/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Add custom colors
      colors: {
        brand: {
          50: '#fdf4ff',
          100: '#fae8ff',
          500: '#d946ef',
          900: '#701a75',
        },
      },
      // Add custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Add custom fonts
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cal Sans', 'sans-serif'],
      },
    },
  },
}

export default config
```

### Using Tailwind Utilities

Combine Raditail components with Tailwind utilities:

```tsx
<Button className="w-full sm:w-auto md:px-8 lg:text-lg">
  Responsive Button
</Button>

<Dialog>
  <DialogContent className="max-w-4xl w-[95vw] sm:w-full">
    Wide Dialog
  </DialogContent>
</Dialog>

<Tooltip className="max-w-md text-left">
  <p>Long tooltip content with custom max-width</p>
</Tooltip>
```

---

## Component-Specific Customization

### Button

```tsx
// Icon only button with custom size
<Button
  icon={<StarIcon />}
  className="w-16 h-16 rounded-full text-2xl"
  aria-label="Favorite"
/>

// Loading button with custom spinner
<Button isLoading className="[&_.spinner]:border-white/50">
  Processing
</Button>

// Gradient button
<Button className="bg-gradient-to-br from-blue-500 to-purple-600 border-0">
  Gradient
</Button>
```

### Dialog

```tsx
// Full-height dialog
<DialogContent className="h-screen max-h-screen rounded-none">
  Full height content
</DialogContent>

// Custom width dialog
<DialogContent className="max-w-3xl">
  Wide dialog
</DialogContent>

// Dialog with custom backdrop
<DialogOverlay className="bg-black/60 backdrop-blur-md" />
```

### Input

```tsx
// Input with icon
<div className="relative">
  <Input className="pl-10" placeholder="Search..." />
  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
</div>

// Underline input
<Input className="border-0 border-b-2 rounded-none focus:border-blue-500" />

// Pill input
<Input className="rounded-full px-6" />
```

### Tooltip

```tsx
// Wide tooltip
<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent className="max-w-sm">
    This is a wider tooltip with more content space
  </TooltipContent>
</Tooltip>

// Custom arrow color
<TooltipContent className="[&[data-side=bottom]]:shadow-lg">
  Enhanced shadow
</TooltipContent>
```

### Sheet / Drawer

```tsx
// Narrow sheet
<SheetContent side="right" className="w-80">
  Narrow sidebar
</SheetContent>

// Full width sheet
<SheetContent side="bottom" className="h-[80vh]">
  Bottom sheet
</SheetContent>
```

---

## Advanced Customization

### Using CSS Custom Properties

Target Raditail's internal CSS variables:

```css
/* Customize all rounded corners */
:root {
  --rt-radius-sm: 0.125rem;
  --rt-radius-md: 0.25rem;
  --rt-radius-lg: 0.5rem;
}

/* Customize focus rings */
:root {
  --rt-ring: 99 102 241; /* indigo-500 */
  --rt-ring-offset: 255 255 255;
  --rt-ring-offset-width: 4px;
}

/* Customize shadows */
.my-dialog {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

### Component Composition

Build complex components by composing primitives:

```tsx
// Custom Card with Dialog
export const CardDialog = ({ title, children, trigger }) => (
  <Dialog>
    <DialogTrigger asChild>
      {trigger}
    </DialogTrigger>
    <DialogContent className="p-0 gap-0">
      <div className="border-b border-gray-200 p-6">
        <DialogTitle>{title}</DialogTitle>
      </div>
      <div className="p-6">{children}</div>
    </DialogContent>
  </Dialog>
)

// Usage
<CardDialog
  title="Settings"
  trigger={<Button>Open</Button>}
>
  <p>Dialog content goes here</p>
</CardDialog>
```

---

## Best Practices

1. **Use CSS Variables First** - Customize tokens before overriding components
2. **Maintain Consistency** - Keep similar patterns across your app
3. **Test Accessibility** - Ensure custom styles maintain WCAG contrast ratios
4. **Use Semantic Colors** - Leverage colorScheme props before custom classes
5. **Layer Your Styles** - Global → Component → Instance (className)
6. **Document Custom Patterns** - Keep a style guide for your team

---

## Quick Reference

### Common Customizations

```tsx
// Rounded button
<Button className="rounded-full">Pill Button</Button>

// No border input
<Input className="border-0 bg-gray-100" />

// Large dialog
<DialogContent size="lg">Large content</DialogContent>

// Custom tooltip color
<TooltipContent colorScheme="destructive">Warning!</TooltipContent>

// Gradient background
<div className="bg-gradient-to-r from-blue-500 to-purple-600">
  <Button variant="ghost" className="text-white">
    On Gradient
  </Button>
</div>
```

### CSS Variable Quick Reference

```css
/* Colors */
--rt-primary: 59 130 246;
--rt-secondary: 100 116 139;
--rt-destructive: 239 68 68;
--rt-success: 34 197 94;
--rt-warning: 234 179 8;

/* Radius */
--rt-radius-sm: 0.375rem;
--rt-radius-md: 0.5rem;
--rt-radius-lg: 0.75rem;

/* Spacing */
--rt-spacing-sm: 0.5rem;
--rt-spacing-md: 0.75rem;
--rt-spacing-lg: 1rem;
```

---

## Need More Help?

- **Theming Guide**: [THEMING.md](./THEMING.md) - Learn about color customization
- **Component Docs**: Check Storybook for component-specific props
- **Examples**: See the stories for real-world usage patterns
- **Community**: Join discussions for custom styling tips

Happy styling! 🎨
