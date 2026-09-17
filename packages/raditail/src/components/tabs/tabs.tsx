import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'
import { cn } from '@/utils/cn'

export const Tabs = TabsPrimitive.Root

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center gap-1 rounded-[var(--rt-radius-md)] bg-[var(--rt-muted-bg)] p-1 text-sm text-[var(--rt-muted-foreground)]',
      className
    )}
    {...props}
  />
))

TabsList.displayName = 'TabsList'

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex min-w-[6rem] flex-1 items-center justify-center whitespace-nowrap rounded-[var(--rt-radius-sm)] px-3 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rt-primary/40 data-[state=active]:bg-[var(--rt-bg)] data-[state=active]:text-[var(--rt-foreground)] data-[state=inactive]:text-[var(--rt-muted-foreground)] disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
))

TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 rounded-[var(--rt-radius-md)] border border-[var(--rt-border-color)] bg-[var(--rt-bg)] p-4 text-sm text-[var(--rt-foreground)]',
      className
    )}
    {...props}
  />
))

TabsContent.displayName = 'TabsContent'
