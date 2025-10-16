import * as ToastPrimitive from '@radix-ui/react-toast'
import { XIcon } from 'lucide-react'
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

export const ToastProvider = ToastPrimitive.Provider

export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const toastPositionClasses: Record<
  NonNullable<ToastViewportProps['position']>,
  string
> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
}

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(({ className, position = 'bottom-right', ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed z-50 flex w-full max-w-sm flex-col gap-2 p-4 outline-none',
      toastPositionClasses[position],
      className
    )}
    {...props}
  />
))

ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const toastVariants = cva(
  'relative flex w-full min-w-0 items-start gap-3 rounded-[var(--rt-radius-lg)] border p-4 shadow-lg transition data-[state=closed]:translate-y-2 data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100',
  {
    variants: {
      colorScheme: {
        default:
          'border-[var(--rt-border-color)] bg-[var(--rt-bg)] text-[var(--rt-foreground)]',
        primary:
          'border-[var(--rt-primary-color)] bg-[var(--rt-bg)] text-[var(--rt-foreground)] [&>*]:text-[var(--rt-primary-color)]',
        secondary:
          'border-[var(--rt-secondary-color)] bg-[var(--rt-bg)] text-[var(--rt-foreground)] [&>*]:text-[var(--rt-secondary-color)]',
        destructive:
          'border-[var(--rt-destructive-color)] bg-[var(--rt-bg)] text-[var(--rt-foreground)] [&>*]:text-[var(--rt-destructive-color)]',
        success:
          'border-[var(--rt-success-color)] bg-[var(--rt-bg)] text-[var(--rt-foreground)] [&>*]:text-[var(--rt-success-color)]',
        warning:
          'border-[var(--rt-warning-color)] bg-[var(--rt-bg)] text-[var(--rt-foreground)] [&>*]:text-[var(--rt-warning-color)]',
      },
    },
    defaultVariants: {
      colorScheme: 'default',
    },
  }
)

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, colorScheme = 'default', ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(toastVariants({ colorScheme }), className)}
    {...props}
  />
))

Toast.displayName = ToastPrimitive.Root.displayName

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
))

ToastTitle.displayName = ToastPrimitive.Title.displayName

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--rt-muted-foreground)]', className)}
    {...props}
  />
))

ToastDescription.displayName = ToastPrimitive.Description.displayName

export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'ml-auto inline-flex text-sm font-medium text-[var(--rt-primary-color)] underline-offset-4',
      className
    )}
    {...props}
  />
))

ToastAction.displayName = ToastPrimitive.Action.displayName

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded p-1 text-[var(--rt-muted-foreground)] hover:text-[var(--rt-foreground)]',
      className
    )}
    {...props}
  >
    <XIcon className="h-4 w-4" aria-hidden />
  </ToastPrimitive.Close>
))

ToastClose.displayName = ToastPrimitive.Close.displayName
