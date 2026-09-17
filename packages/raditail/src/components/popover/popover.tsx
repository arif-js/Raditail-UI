import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as React from 'react'
import { cn } from '@/utils/cn'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    placement?: 'left' | 'right' | 'top' | 'bottom'
  }
>(
  (
    { className, align = 'center', sideOffset = 8, placement, side, ...props },
    ref
  ) => {
    const resolvedSide = placement ?? side ?? 'bottom'
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          side={resolvedSide}
          sideOffset={sideOffset}
          className={cn(
            'z-50 w-72 rounded-[var(--rt-radius-lg)] border border-[var(--rt-border-color)] bg-[var(--rt-bg)] p-4 text-sm text-[var(--rt-foreground)] shadow-lg focus:outline-none data-[state=closed]:opacity-0 data-[state=closed]:scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100',
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Portal>
    )
  }
)

PopoverContent.displayName = PopoverPrimitive.Content.displayName
