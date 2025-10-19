import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/utils/cn'
import type { ComponentSize } from '@/utils/size'
import {
  checkboxControlSizeClasses,
  checkboxIconSizeClasses,
  controlLabelGapClasses,
  controlLabelTextClasses,
} from '@/utils/size'

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: ComponentSize
  label?: React.ReactNode
  placement?: 'left' | 'right'
  labelClassName?: string
  wrapperClassName?: string
  labelProps?: React.HTMLAttributes<HTMLSpanElement>
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      size = 'md',
      label,
      placement = 'right',
      labelClassName,
      wrapperClassName,
      labelProps,
      ...props
    },
    ref
  ) => {
    const { className: labelPropsClassName, ...restLabelProps } =
      labelProps ?? {}
    const checkbox = (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'peer shrink-0 rounded-sm border border-[var(--rt-border-color] bg-[var(--rt-bg] shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--rt-primary-color] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--rt-primary-color] data-[state=checked]:text-[var(--rt-primary-contrast]',
          checkboxControlSizeClasses[size],
          className
        )}
        data-size={size}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <CheckIcon className={checkboxIconSizeClasses[size]} aria-hidden />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )

    if (label === undefined || label === null || label === false) {
      return checkbox
    }

    return (
      <label
        className={cn(
          'inline-flex items-center',
          controlLabelGapClasses[size],
          wrapperClassName
        )}
      >
        {placement === 'left' && (
          <span
            {...restLabelProps}
            className={cn(
              'text-[var(--rt-foreground]',
              controlLabelTextClasses[size],
              labelClassName,
              labelPropsClassName
            )}
          >
            {label}
          </span>
        )}
        {checkbox}
        {placement === 'right' && (
          <span
            {...restLabelProps}
            className={cn(
              'text-[var(--rt-foreground]',
              controlLabelTextClasses[size],
              labelClassName,
              labelPropsClassName
            )}
          >
            {label}
          </span>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
