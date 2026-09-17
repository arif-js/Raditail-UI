import * as React from 'react'
import { cn } from '@/utils/cn'
import type { ComponentSize } from '@/utils/size'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: ComponentSize
}

const textareaSizeClasses: Record<ComponentSize, string> = {
  sm: 'min-h-[4.5rem] px-3 py-1.5 text-sm',
  md: 'min-h-[5.5rem] px-3.5 py-2 text-sm',
  lg: 'min-h-[6.5rem] px-4 py-2.5 text-base',
}

/**
 * Multi-line text field, styled to match `Input`.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size = 'md', rows = 3, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'flex w-full rounded-[var(--rt-radius-md)] border border-[var(--rt-border-color)] bg-[var(--rt-bg)] text-[var(--rt-foreground)] shadow-sm transition-colors placeholder:text-[var(--rt-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rt-primary/40 disabled:cursor-not-allowed disabled:opacity-50',
        textareaSizeClasses[size],
        className
      )}
      data-size={size}
      {...props}
    />
  )
)

Textarea.displayName = 'Textarea'

export default Textarea
