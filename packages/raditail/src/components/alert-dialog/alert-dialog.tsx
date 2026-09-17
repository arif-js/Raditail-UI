import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as React from 'react'
import { cn } from '@/utils/cn'
import { buttonVariants, type ButtonProps } from '../button/button'

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogPortal = AlertDialogPrimitive.Portal
type AlertDialogButtonVariant = ButtonProps['variant']
type AlertDialogButtonSize = ButtonProps['size']
type AlertDialogButtonColorScheme = ButtonProps['colorScheme']

const alertDialogButtonClasses = (
  variant: AlertDialogButtonVariant,
  size: AlertDialogButtonSize,
  colorScheme: AlertDialogButtonColorScheme,
  className?: string
) =>
  cn(
    buttonVariants({ variant, size, colorScheme }),
    'justify-center',
    className
  )

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    variant?: AlertDialogButtonVariant
    size?: AlertDialogButtonSize
    colorScheme?: AlertDialogButtonColorScheme
  }
>(
  (
    {
      className,
      variant = 'solid',
      size = 'md',
      colorScheme = 'default',
      ...props
    },
    ref
  ) => (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={alertDialogButtonClasses(
        variant,
        size,
        colorScheme,
        className
      )}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  )
)

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & {
    variant?: AlertDialogButtonVariant
    size?: AlertDialogButtonSize
    colorScheme?: AlertDialogButtonColorScheme
  }
>(
  (
    {
      className,
      variant = 'ghost',
      size = 'md',
      colorScheme = 'default',
      ...props
    },
    ref
  ) => (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={alertDialogButtonClasses(
        variant,
        size,
        colorScheme,
        className
      )}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  )
)

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-40 bg-black/40 backdrop-blur-sm', className)}
    {...props}
  />
))

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[var(--rt-radius-lg)] border border-[var(--rt-border-color)] bg-[var(--rt-bg)] p-6 text-[var(--rt-foreground)] shadow-xl focus:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Content>
  </AlertDialogPortal>
))

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

export const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('space-y-2 text-center sm:text-left', className)}
    {...props}
  />
)

export const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className
    )}
    {...props}
  />
)

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
))

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--rt-muted-foreground)]', className)}
    {...props}
  />
))

AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName
