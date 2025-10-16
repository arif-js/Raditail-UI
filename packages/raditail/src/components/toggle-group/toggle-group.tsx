import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import * as React from 'react'
import { cn } from '@/utils/cn'

export const ToggleGroup = ToggleGroupPrimitive.Root

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-[var(--rt-radius-sm)] px-3 py-2 text-sm font-medium text-[--rt-muted-foreground] transition-colors hover:text-[--rt-foreground] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--rt-primary-color]/40 data-[state=on]:bg-[--rt-muted-bg] data-[state=on]:text-[--rt-foreground]',
      className
    )}
    {...props}
  />
))

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName
