import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--rt-primary-color)] focus-visible:ring-offset-[var(--rt-ring-offset)] disabled:pointer-events-none disabled:opacity-50 data-[icon-only=true]:px-0',
  {
    variants: {
      variant: {
        solid:
          'bg-[var(--rt-primary-color)] text-[var(--rt-primary-contrast)] hover:opacity-90',
        outline:
          'border border-[var(--rt-border-color)] text-[var(--rt-foreground)] hover:bg-[var(--rt-muted-bg)]',
        ghost:
          'bg-transparent text-[var(--rt-foreground)] hover:bg-[var(--rt-muted-bg)]',
        subtle:
          'bg-[var(--rt-muted-bg)] text-[var(--rt-foreground)] hover:bg-[var(--rt-muted-bg)]/80',
      },
      colorScheme: {
        default: '',
        primary: '',
        secondary: '',
        destructive: '',
        success: '',
        warning: '',
      },
      size: {
        sm: 'h-9 rounded-[var(--rt-radius-sm)] px-3 text-sm',
        md: 'h-10 rounded-[var(--rt-radius-md)] px-4 text-sm',
        lg: 'h-11 rounded-[var(--rt-radius-lg)] px-6 text-base',
      },
      loading: {
        true: 'cursor-progress',
      },
    },
    compoundVariants: [
      // Primary color scheme
      {
        variant: 'solid',
        colorScheme: 'primary',
        className:
          'bg-[var(--rt-primary-color)] text-[var(--rt-primary-contrast)]',
      },
      // Secondary color scheme
      {
        variant: 'solid',
        colorScheme: 'secondary',
        className:
          'bg-[var(--rt-secondary-color)] text-[var(--rt-secondary-contrast)]',
      },
      // Destructive color scheme
      {
        variant: 'solid',
        colorScheme: 'destructive',
        className:
          'bg-[var(--rt-destructive-color)] text-[var(--rt-destructive-contrast)]',
      },
      // Success color scheme
      {
        variant: 'solid',
        colorScheme: 'success',
        className:
          'bg-[var(--rt-success-color)] text-[var(--rt-success-contrast)]',
      },
      // Warning color scheme
      {
        variant: 'solid',
        colorScheme: 'warning',
        className:
          'bg-[var(--rt-warning-color)] text-[var(--rt-warning-contrast)]',
      },
      // Outline variants
      {
        variant: 'outline',
        colorScheme: 'primary',
        className:
          'border-[var(--rt-primary-color)] text-[var(--rt-primary-color)] hover:bg-[var(--rt-primary-color)]/10',
      },
      {
        variant: 'outline',
        colorScheme: 'secondary',
        className:
          'border-[var(--rt-secondary-color)] text-[var(--rt-secondary-color)] hover:bg-[var(--rt-secondary-color)]/10',
      },
      {
        variant: 'outline',
        colorScheme: 'destructive',
        className:
          'border-[var(--rt-destructive-color)] text-[var(--rt-destructive-color)] hover:bg-[var(--rt-destructive-color)]/10',
      },
      {
        variant: 'outline',
        colorScheme: 'success',
        className:
          'border-[var(--rt-success-color)] text-[var(--rt-success-color)] hover:bg-[var(--rt-success-color)]/10',
      },
      {
        variant: 'outline',
        colorScheme: 'warning',
        className:
          'border-[var(--rt-warning-color)] text-[var(--rt-warning-color)] hover:bg-[var(--rt-warning-color)]/10',
      },
      // Ghost variants
      {
        variant: 'ghost',
        colorScheme: 'primary',
        className:
          'text-[var(--rt-primary-color)] hover:bg-[var(--rt-primary-color)]/10',
      },
      {
        variant: 'ghost',
        colorScheme: 'secondary',
        className:
          'text-[var(--rt-secondary-color)] hover:bg-[var(--rt-secondary-color)]/10',
      },
      {
        variant: 'ghost',
        colorScheme: 'destructive',
        className:
          'text-[var(--rt-destructive-color)] hover:bg-[var(--rt-destructive-color)]/10',
      },
      {
        variant: 'ghost',
        colorScheme: 'success',
        className:
          'text-[var(--rt-success-color)] hover:bg-[var(--rt-success-color)]/10',
      },
      {
        variant: 'ghost',
        colorScheme: 'warning',
        className:
          'text-[var(--rt-warning-color)] hover:bg-[var(--rt-warning-color)]/10',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      colorScheme: 'default',
      size: 'md',
    },
  }
)

const iconOnlySizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'data-[icon-only=true]:w-9',
  md: 'data-[icon-only=true]:w-10',
  lg: 'data-[icon-only=true]:w-11',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the button as a child element (useful with Next.js Link). */
  asChild?: boolean
  /** Display a loading state; keeps the button focusable. */
  isLoading?: boolean
  /** Optional icon rendered alongside the button label. */
  icon?: React.ReactNode
  /** Position of the icon relative to the label when both are present. */
  iconPosition?: 'left' | 'right'
  /** Color scheme for semantic styling. */
  colorScheme?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'warning'
}

/**
 * Accessible button component with Radix Slot support, Tailwind styling, and variant API.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      colorScheme,
      asChild = false,
      isLoading = false,
      disabled,
      children,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const resolvedSize: NonNullable<ButtonProps['size']> = size ?? 'md'
    const labelNodes = React.Children.toArray(children).filter((child) => {
      if (child === null || child === undefined) return false
      if (typeof child === 'string') return child.trim().length > 0
      return true
    })
    const hasLabel = labelNodes.length > 0
    const showIcon = Boolean(icon)
    const iconOnly = showIcon && !hasLabel
    const renderIcon = (key: string) =>
      showIcon && icon ? (
        <span
          key={key}
          aria-hidden="true"
          className="inline-flex items-center justify-center"
        >
          {icon}
        </span>
      ) : null

    return (
      <Comp
        ref={ref as any}
        className={cn(
          buttonVariants({
            variant,
            size: resolvedSize,
            colorScheme: colorScheme ?? 'default',
            loading: isLoading ? true : undefined,
          }),
          iconOnlySizeClasses[resolvedSize],
          showIcon && hasLabel && 'gap-2',
          className
        )}
        disabled={disabled ?? isLoading}
        aria-busy={isLoading || undefined}
        data-variant={variant}
        data-size={resolvedSize}
        data-icon-only={iconOnly || undefined}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-[var(--rt-primary-contrast)]/50 border-t-transparent" />
            <span className="text-[var(--rt-muted-foreground)]">Loading…</span>
          </span>
        ) : iconOnly ? (
          renderIcon('icon-only')
        ) : (
          <>
            {iconPosition === 'left' && renderIcon('icon-left')}
            {children}
            {iconPosition === 'right' && renderIcon('icon-right')}
          </>
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export default Button
