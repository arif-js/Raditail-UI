import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-[var(--rt-radius-sm)] px-2 py-0.5 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border',
        subtle: '',
      },
      colorScheme: {
        default: '',
        primary: '',
        secondary: '',
        destructive: '',
        success: '',
        warning: '',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        colorScheme: 'default',
        className: 'bg-[var(--rt-foreground)] text-[var(--rt-bg)]',
      },
      {
        variant: 'solid',
        colorScheme: 'primary',
        className:
          'bg-[var(--rt-primary-color)] text-[var(--rt-primary-contrast)]',
      },
      {
        variant: 'solid',
        colorScheme: 'secondary',
        className:
          'bg-[var(--rt-secondary-color)] text-[var(--rt-secondary-contrast)]',
      },
      {
        variant: 'solid',
        colorScheme: 'destructive',
        className:
          'bg-[var(--rt-destructive-color)] text-[var(--rt-destructive-contrast)]',
      },
      {
        variant: 'solid',
        colorScheme: 'success',
        className:
          'bg-[var(--rt-success-color)] text-[var(--rt-success-contrast)]',
      },
      {
        variant: 'solid',
        colorScheme: 'warning',
        className:
          'bg-[var(--rt-warning-color)] text-[var(--rt-warning-contrast)]',
      },
      {
        variant: 'outline',
        colorScheme: 'default',
        className:
          'border-[var(--rt-border-color)] text-[var(--rt-foreground)]',
      },
      {
        variant: 'outline',
        colorScheme: 'primary',
        className:
          'border-[var(--rt-primary-color)] text-[var(--rt-primary-color)]',
      },
      {
        variant: 'outline',
        colorScheme: 'secondary',
        className:
          'border-[var(--rt-secondary-color)] text-[var(--rt-secondary-color)]',
      },
      {
        variant: 'outline',
        colorScheme: 'destructive',
        className:
          'border-[var(--rt-destructive-color)] text-[var(--rt-destructive-color)]',
      },
      {
        variant: 'outline',
        colorScheme: 'success',
        className:
          'border-[var(--rt-success-color)] text-[var(--rt-success-color)]',
      },
      {
        variant: 'outline',
        colorScheme: 'warning',
        className:
          'border-[var(--rt-warning-color)] text-[var(--rt-warning-color)]',
      },
      {
        variant: 'subtle',
        colorScheme: 'default',
        className: 'bg-[var(--rt-muted-bg)] text-[var(--rt-muted-foreground)]',
      },
      {
        variant: 'subtle',
        colorScheme: 'primary',
        className: 'bg-rt-primary/10 text-rt-primary',
      },
      {
        variant: 'subtle',
        colorScheme: 'secondary',
        className: 'bg-rt-secondary/10 text-rt-secondary',
      },
      {
        variant: 'subtle',
        colorScheme: 'destructive',
        className: 'bg-rt-destructive/10 text-rt-destructive',
      },
      {
        variant: 'subtle',
        colorScheme: 'success',
        className: 'bg-rt-success/10 text-rt-success',
      },
      {
        variant: 'subtle',
        colorScheme: 'warning',
        className: 'bg-rt-warning/10 text-rt-warning',
      },
    ],
    defaultVariants: {
      variant: 'subtle',
      colorScheme: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, colorScheme, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, colorScheme }), className)}
      data-variant={variant ?? 'subtle'}
      {...props}
    />
  )
)

Badge.displayName = 'Badge'

export { badgeVariants }
