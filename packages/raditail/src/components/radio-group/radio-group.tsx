import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as React from 'react'
import { cn } from '@/utils/cn'
import type { ComponentSize } from '@/utils/size'
import {
  radioControlSizeClasses,
  radioIndicatorSizeClasses,
} from '@/utils/size'

export const RadioGroup = RadioGroupPrimitive.Root

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  size?: ComponentSize
}

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size = 'md', children, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'aspect-square rounded-full border border-[var(--rt-border-color] text-[var(--rt-primary-color] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--rt-primary-color] disabled:cursor-not-allowed disabled:opacity-50',
      radioControlSizeClasses[size],
      className
    )}
    data-size={size}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <span
        className={cn(
          'rounded-full bg-[var(--rt-primary-color)]',
          radioIndicatorSizeClasses[size]
        )}
      />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName
