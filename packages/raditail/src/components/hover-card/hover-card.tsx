import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import * as React from 'react'
import { cn } from '@/utils/cn'

export const HoverCard = HoverCardPrimitive.Root
export const HoverCardTrigger = HoverCardPrimitive.Trigger

export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {
    placement?: 'left' | 'right' | 'top' | 'bottom'
  }
>(
  (
    { className, align = 'center', sideOffset = 8, placement, side, ...props },
    ref
  ) => {
    const resolvedSide = placement ?? side ?? 'bottom'
    return (
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          ref={ref}
          align={align}
          side={resolvedSide}
          sideOffset={sideOffset}
          className={cn(
            'z-50 w-64 rounded-[var(--rt-radius-lg)] border border-[var(--rt-border-color)] bg-[var(--rt-bg)] p-4 text-sm text-[var(--rt-foreground)] shadow-lg transition data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 data-[side=top]:origin-bottom data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left',
            className
          )}
          {...props}
        />
      </HoverCardPrimitive.Portal>
    )
  }
)

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName
