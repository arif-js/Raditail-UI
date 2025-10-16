'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/utils/cn'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.Close

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
      className
    )}
    {...props}
  />
))

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
  /**
   * When false, prevents closing via escape key or clicking outside the dialog.
   */
  dismissable?: boolean
  /**
   * Render an accessible close button in the top-right corner of the dialog.
   */
  showCloseButton?: boolean
  /**
   * Additional props for the close button rendered when `showCloseButton` is true.
   */
  closeButtonProps?: React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Close
  >
  /**
   * Optional footer content rendered inside a styled `DialogFooter`.
   */
  footer?: React.ReactNode
}

const contentWidths: Record<NonNullable<DialogContentProps['size']>, string> = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
}

type DialogPrimitiveContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
>
type InteractOutsideEvent = Parameters<
  NonNullable<DialogPrimitiveContentProps['onInteractOutside']>
>[0]
type EscapeKeyDownEvent = Parameters<
  NonNullable<DialogPrimitiveContentProps['onEscapeKeyDown']>
>[0]

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size = 'md',
      fullScreen = false,
      dismissable = true,
      showCloseButton = false,
      closeButtonProps,
      footer,
      ...props
    },
    ref
  ) => {
    const { onInteractOutside, onEscapeKeyDown, ...restProps } = props

    const handleInteractOutside = React.useCallback(
      (event: InteractOutsideEvent) => {
        if (!dismissable) {
          event.preventDefault()
        }
        onInteractOutside?.(event)
      },
      [dismissable, onInteractOutside]
    )

    const handleEscapeKeyDown = React.useCallback(
      (event: EscapeKeyDownEvent) => {
        if (!dismissable) {
          event.preventDefault()
        }
        onEscapeKeyDown?.(event)
      },
      [dismissable, onEscapeKeyDown]
    )

    const closeButtonAriaLabel =
      closeButtonProps?.['aria-label'] ?? 'Close dialog'
    const closeChildren = closeButtonProps?.children ?? (
      <>
        <XIcon className="h-4 w-4" aria-hidden />
        <span className="sr-only">{closeButtonAriaLabel}</span>
      </>
    )

    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 bg-[var(--rt-bg)] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[var(--rt-radius-lg)]',
            fullScreen
              ? 'max-w-none h-[100vh] w-[100vw] rounded-none border-none'
              : cn(
                  'max-h-[85vh] rounded-[var(--rt-radius-lg)] border border-[var(--rt-border-color)]',
                  contentWidths[size]
                ),
            className
          )}
          onInteractOutside={handleInteractOutside}
          onEscapeKeyDown={handleEscapeKeyDown}
          {...restProps}
        >
          {showCloseButton ? (
            <DialogPrimitive.Close
              {...closeButtonProps}
              className={cn(
                'absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-[var(--rt-radius-full)] text-[var(--rt-muted-foreground)] transition hover:bg-[var(--rt-muted-bg)] hover:text-[var(--rt-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rt-primary-color)]/40',
                closeButtonProps?.className
              )}
              aria-label={closeButtonAriaLabel}
            >
              {closeChildren}
            </DialogPrimitive.Close>
          ) : null}
          {children}
          {footer ? <DialogFooter>{footer}</DialogFooter> : null}
        </DialogPrimitive.Content>
      </DialogPortal>
    )
  }
)

DialogContent.displayName = DialogPrimitive.Content.displayName

export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mb-4 space-y-2 text-center sm:text-left', className)}
    {...props}
  />
)

export const DialogFooter = ({
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

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold text-[var(--rt-foreground)]',
      className
    )}
    {...props}
  />
))

DialogTitle.displayName = DialogPrimitive.Title.displayName

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--rt-muted-foreground)]', className)}
    {...props}
  />
))

DialogDescription.displayName = DialogPrimitive.Description.displayName
