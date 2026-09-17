import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import type { ComponentSize } from '@/utils/size'
import { tooltipSizeClasses } from '@/utils/size'

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

const tooltipVariants = cva(
  'z-50 max-w-xs rounded-[var(--rt-radius-sm)] font-medium shadow-lg outline-none data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out',
  {
    variants: {
      colorScheme: {
        default: 'bg-[var(--rt-foreground)] text-[var(--rt-bg)]',
        primary:
          'bg-[var(--rt-primary-color)] text-[var(--rt-primary-contrast)]',
        secondary:
          'bg-[var(--rt-secondary-color)] text-[var(--rt-secondary-contrast)]',
        destructive:
          'bg-[var(--rt-destructive-color)] text-[var(--rt-destructive-contrast)]',
        success:
          'bg-[var(--rt-success-color)] text-[var(--rt-success-contrast)]',
        warning:
          'bg-[var(--rt-warning-color)] text-[var(--rt-warning-contrast)]',
      },
    },
    defaultVariants: {
      colorScheme: 'default',
    },
  }
)

export interface TooltipContentProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
      'content'
    >,
    VariantProps<typeof tooltipVariants> {
  size?: ComponentSize
  placement?: 'top' | 'right' | 'bottom' | 'left'
  content?: React.ReactNode
}

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(
  (
    {
      className,
      sideOffset = 8,
      size = 'md',
      placement,
      side,
      content,
      children,
      colorScheme = 'default',
      ...props
    },
    ref
  ) => {
    const resolvedSide = placement ?? side ?? 'top'
    const body = content ?? children
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          side={resolvedSide}
          className={cn(
            tooltipVariants({ colorScheme }),
            tooltipSizeClasses[size],
            className
          )}
          data-size={size}
          {...props}
        >
          {body}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    )
  }
)

TooltipContent.displayName = TooltipPrimitive.Content.displayName
