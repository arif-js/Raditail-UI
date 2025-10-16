import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/utils/cn'

/**
 * Props for single-selection accordion mode.
 * Only one item can be open at a time.
 */
type AccordionSingleProps = Omit<
  AccordionPrimitive.AccordionSingleProps,
  'type'
> & {
  type?: 'single'
}

/**
 * Props for multiple-selection accordion mode.
 * Multiple items can be open simultaneously.
 */
type AccordionMultipleProps = Omit<
  AccordionPrimitive.AccordionMultipleProps,
  'type'
> & {
  type: 'multiple'
}

/**
 * Accordion component props.
 * Supports both single and multiple selection modes.
 */
export type AccordionProps = (AccordionSingleProps | AccordionMultipleProps) & {
  className?: string
}

export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, type = 'single', ...props }, ref) => {
  if (type === 'multiple') {
    const restProps = props as Omit<
      AccordionPrimitive.AccordionMultipleProps,
      'type'
    >
    return (
      <AccordionPrimitive.Root
        ref={ref}
        className={cn('block w-full', className)}
        type="multiple"
        {...restProps}
      />
    )
  }

  const restProps = props as Omit<
    AccordionPrimitive.AccordionSingleProps,
    'type'
  >

  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cn('block w-full', className)}
      type="single"
      {...restProps}
    />
  )
})

Accordion.displayName = 'Accordion'

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'block w-full max-w-full border-b border-[var(--rt-border-color)] last:border-b-0',
      className
    )}
    {...props}
  />
))

AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex w-full max-w-full min-w-0 overflow-hidden">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex w-full max-w-full flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium text-[var(--rt-foreground)] transition-all hover:text-[var(--rt-foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rt-primary-color)]/40 min-w-0',
        className
      )}
      {...props}
    >
      <span className="break-words overflow-wrap-anywhere flex-1 min-w-0 max-w-full">
        {children}
      </span>
      <ChevronDownIcon
        className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180"
        aria-hidden
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'w-full max-w-full overflow-hidden text-sm text-[var(--rt-muted-foreground)] data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
      className
    )}
    {...props}
  >
    <div className="w-full max-w-full pb-4 pt-0 break-words overflow-wrap-anywhere">
      {children}
    </div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName
