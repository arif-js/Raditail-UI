import * as React from 'react'
import { cn } from '@/utils/cn'

export const Table = React.forwardRef<
  HTMLTableElement,
  React.ComponentPropsWithoutRef<'table'>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto">
    <table
      ref={ref}
      className={cn(
        'w-full caption-bottom border-collapse text-sm text-[var(--rt-foreground)]',
        className
      )}
      {...props}
    />
  </div>
))

Table.displayName = 'Table'

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      '[&_tr]:border-b [&_tr]:border-[var(--rt-border-color)]',
      className
    )}
    {...props}
  />
))

TableHeader.displayName = 'TableHeader'

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
))

TableBody.displayName = 'TableBody'

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t border-[var(--rt-border-color)] bg-[var(--rt-muted-bg)] font-medium',
      className
    )}
    {...props}
  />
))

TableFooter.displayName = 'TableFooter'

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-[var(--rt-border-color)] transition-colors hover:bg-[var(--rt-muted-bg)] data-[state=selected]:bg-[var(--rt-muted-bg)]',
      className
    )}
    {...props}
  />
))

TableRow.displayName = 'TableRow'

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<'th'>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    scope="col"
    className={cn(
      'h-10 px-3 text-left align-middle text-xs font-semibold text-[var(--rt-muted-foreground)] whitespace-nowrap',
      className
    )}
    {...props}
  />
))

TableHead.displayName = 'TableHead'

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<'td'>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('px-3 py-2.5 align-middle', className)}
    {...props}
  />
))

TableCell.displayName = 'TableCell'

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('py-3 text-sm text-[var(--rt-muted-foreground)]', className)}
    {...props}
  />
))

TableCaption.displayName = 'TableCaption'
