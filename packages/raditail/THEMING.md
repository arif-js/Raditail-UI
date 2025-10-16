# Theming Raditail UI

Raditail UI uses CSS custom properties (variables) for easy theming. You can customize colors by overriding CSS variables in your app.

## Quick Start: Changing the Primary Color

The easiest way to change your theme is to override CSS variables in your global CSS:

```css
:root {
  /* Change primary color to purple */
  --rt-primary: 147 51 234; /* RGB values for purple-600 */
  --rt-primary-foreground: 255 255 255;
}

/* Dark mode */
:root[data-theme='dark'],
.dark {
  --rt-primary: 168 85 247; /* RGB values for purple-500 */
  --rt-primary-foreground: 15 23 42;
}
```

**Important:** Use RGB values (space-separated, no commas) for the color variables to support opacity modifiers.

## Available Semantic Colors

Raditail provides semantic color tokens that you can easily customize:

### Light Mode (`:root`)

```css
:root {
  /* Base colors */
  --rt-background: 255 255 255;
  --rt-foreground: 15 23 42;
  --rt-muted: 241 245 249;
  --rt-muted-foreground: 71 85 105;
  --rt-border: 226 232 240;

  /* Semantic colors */
  --rt-primary: 59 130 246; /* Blue 500 */
  --rt-primary-foreground: 255 255 255;

  --rt-secondary: 100 116 139; /* Slate 500 */
  --rt-secondary-foreground: 255 255 255;

  --rt-destructive: 239 68 68; /* Red 500 */
  --rt-destructive-foreground: 255 255 255;

  --rt-success: 34 197 94; /* Green 500 */
  --rt-success-foreground: 255 255 255;

  --rt-warning: 234 179 8; /* Yellow 500 */
  --rt-warning-foreground: 15 23 42;

  --rt-accent: 99 102 241; /* Indigo 500 */
  --rt-accent-foreground: 255 255 255;
}
```

### Dark Mode (`:root[data-theme='dark']` or `.dark`)

```css
:root[data-theme='dark'],
.dark {
  --rt-background: 15 23 42;
  --rt-foreground: 226 232 240;
  --rt-muted: 30 41 59;
  --rt-muted-foreground: 148 163 184;
  --rt-border: 51 65 85;

  --rt-primary: 96 165 250; /* Blue 400 */
  --rt-primary-foreground: 15 23 42;

  --rt-secondary: 148 163 184; /* Slate 400 */
  --rt-secondary-foreground: 15 23 42;

  --rt-destructive: 248 113 113; /* Red 400 */
  --rt-destructive-foreground: 15 23 42;

  --rt-success: 74 222 128; /* Green 400 */
  --rt-success-foreground: 15 23 42;

  --rt-warning: 250 204 21; /* Yellow 400 */
  --rt-warning-foreground: 15 23 42;

  --rt-accent: 129 140 248; /* Indigo 400 */
  --rt-accent-foreground: 15 23 42;
}
```

## Using Color Schemes in Components

Most components support the `colorScheme` prop for semantic styling:

```tsx
import { Button } from '@raditail/ui'

// Primary (default)
<Button colorScheme="primary">Save</Button>

// Destructive (danger actions)
<Button colorScheme="destructive">Delete</Button>

// Success
<Button colorScheme="success">Approve</Button>

// Warning
<Button colorScheme="warning">Remind Later</Button>

// Secondary
<Button colorScheme="secondary">Secondary Action</Button>
```

## Example: Brand Color Theme

Here's how to create a custom brand theme:

```css
/* app/globals.css or your main CSS file */

:root {
  /* Brand color: Teal */
  --rt-primary: 20 184 166; /* teal-500 */
  --rt-primary-foreground: 255 255 255;

  /* Brand secondary: Orange */
  --rt-secondary: 249 115 22; /* orange-500 */
  --rt-secondary-foreground: 255 255 255;

  /* Keep other semantic colors as default or customize */
  --rt-destructive: 220 38 38; /* red-600 */
  --rt-destructive-foreground: 255 255 255;

  --rt-success: 22 163 74; /* green-600 */
  --rt-success-foreground: 255 255 255;
}

:root[data-theme='dark'],
.dark {
  --rt-primary: 45 212 191; /* teal-400 */
  --rt-primary-foreground: 15 23 42;

  --rt-secondary: 251 146 60; /* orange-400 */
  --rt-secondary-foreground: 15 23 42;
}
```

## Converting Hex to RGB

If you have hex colors, convert them to RGB:

**Hex:** `#3B82F6`  
**RGB:** `59 130 246`

You can use this formula:

- Take the hex value
- Convert to RGB
- Format as space-separated values (no commas)

Example conversions:

- `#10B981` (green) → `16 185 129`
- `#F59E0B` (amber) → `245 158 11`
- `#EF4444` (red) → `239 68 68`
- `#8B5CF6` (violet) → `139 92 246`

## Radius Tokens

You can also customize border radius:

```css
:root {
  --rt-radius-sm: 0.25rem; /* 4px */
  --rt-radius-md: 0.5rem; /* 8px */
  --rt-radius-lg: 0.75rem; /* 12px */
}
```

## Tips

1. **Use RGB format** (space-separated) for all color variables
2. **Test both light and dark modes** when customizing colors
3. **Maintain sufficient contrast** for foreground colors
4. **Use online tools** like [Colorffy](https://colorffy.com/) or browser DevTools to find RGB values
5. **Consider accessibility** - ensure WCAG AA contrast ratios (4.5:1 for normal text)

## Advanced: Multiple Themes

You can create multiple themes using data attributes:

```css
/* Default theme */
:root {
  --rt-primary: 59 130 246;
}

/* Purple theme */
:root[data-theme='purple'] {
  --rt-primary: 147 51 234;
  --rt-secondary: 236 72 153;
}

/* Green theme */
:root[data-theme='green'] {
  --rt-primary: 34 197 94;
  --rt-secondary: 16 185 129;
}
```

Then toggle themes in your app:

```tsx
document.documentElement.setAttribute('data-theme', 'purple')
```
