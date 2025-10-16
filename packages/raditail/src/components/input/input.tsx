import * as React from 'react'
import { cn } from '@/utils/cn'
import type { ComponentSize } from '@/utils/size'
import { fieldSizeClasses } from '@/utils/size'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: ComponentSize
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', size = 'md', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex w-full rounded-[var(--rt-radius-md)] border border-[--rt-border-color] bg-[--rt-bg] text-[--rt-foreground] shadow-sm transition-colors placeholder:text-[--rt-muted-foreground] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--rt-primary-color]/40 disabled:cursor-not-allowed disabled:opacity-50',
          fieldSizeClasses[size],
          className
        )}
        data-size={size}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
