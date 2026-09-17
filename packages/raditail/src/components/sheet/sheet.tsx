import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'
import { cn } from '@/utils/cn'

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close
export const SheetPortal = DialogPrimitive.Portal

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-40 bg-black/40 backdrop-blur-sm', className)}
    {...props}
  />
))

SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const sheetPosition: Record<NonNullable<SheetContentProps['side']>, string> = {
  top: 'inset-x-0 top-0 border-t-0',
  right: 'inset-y-0 right-0 h-full w-full border-r-0 sm:max-w-sm',
  bottom: 'inset-x-0 bottom-0 border-b-0',
  left: 'inset-y-0 left-0 h-full w-full border-l-0 sm:max-w-sm',
}

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 grid w-full gap-4 border border-[var(--rt-border-color)] bg-[var(--rt-bg)] p-6 shadow-xl transition ease-in-out data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
        sheetPosition[side],
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </SheetPortal>
))

SheetContent.displayName = DialogPrimitive.Content.displayName

export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('space-y-2 text-left', className)} {...props} />
)

export const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end',
      className
    )}
    {...props}
  />
)

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
))

SheetTitle.displayName = DialogPrimitive.Title.displayName

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--rt-muted-foreground)]', className)}
    {...props}
  />
))

SheetDescription.displayName = DialogPrimitive.Description.displayName
