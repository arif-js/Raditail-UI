import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as React from 'react'
import { cn } from '@/utils/cn'
import type { ComponentSize } from '@/utils/size'
import {
  switchPaddingClasses,
  switchThumbSizeClasses,
  switchTrackSizeClasses,
} from '@/utils/size'

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: ComponentSize
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size = 'md', ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      'peer inline-flex shrink-0 cursor-pointer items-center justify-start rounded-full border-2 border-transparent bg-[var(--rt-muted-bg)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rt-primary-color)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rt-ring-offset)] data-[state=checked]:bg-[var(--rt-primary-color)] data-[state=checked]:justify-end',
      switchTrackSizeClasses[size],
      switchPaddingClasses[size],
      className
    )}
    data-size={size}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block rounded-full bg-[var(--rt-bg)] shadow transition-transform duration-200',
        switchThumbSizeClasses[size]
      )}
    />
  </SwitchPrimitive.Root>
))

Switch.displayName = SwitchPrimitive.Root.displayName
