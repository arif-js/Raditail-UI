import * as React from 'react'
import { cn } from '@/utils/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as a circle; useful alongside avatars and icon placeholders. */
  circle?: boolean
}

/**
 * Loading placeholder. Size it with utility classes (`h-4 w-32`).
 *
 * Marked `aria-hidden` and given a `role`-free presentation: a placeholder is
 * decoration, and the thing it stands in for should carry the accessible name.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, circle = false, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'animate-pulse bg-[var(--rt-muted-bg)]',
        circle
          ? 'rounded-[var(--rt-radius-full)]'
          : 'rounded-[var(--rt-radius-sm)]',
        className
      )}
      {...props}
    />
  )
)

Skeleton.displayName = 'Skeleton'
