import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as React from 'react'
import { cn } from '@/utils/cn'

type AvatarRootProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Root
>
type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>
type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>

export type AvatarProps = Omit<AvatarRootProps, 'children'> & {
  src?: string
  alt?: string
  icon?: React.ReactNode
  initials?: string
  fallback?: React.ReactNode
  imageProps?: Omit<AvatarImageProps, 'src' | 'alt'>
  fallbackProps?: Omit<AvatarFallbackProps, 'children'>
  children?: React.ReactNode
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      children,
      src,
      alt,
      icon,
      initials,
      fallback,
      imageProps,
      fallbackProps,
      ...props
    },
    ref
  ) => {
    const hasCustomChildren = React.Children.count(children) > 0
    const { className: imageClassName, ...restImageProps } = imageProps ?? {}
    const { className: fallbackClassName, ...restFallbackProps } =
      fallbackProps ?? {}
    const fallbackContent =
      fallback ??
      icon ??
      initials ??
      (typeof alt === 'string' ? getInitialsFromName(alt) : undefined) ??
      '?'

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--rt-muted-bg)]',
          className
        )}
        {...props}
      >
        {hasCustomChildren ? (
          children
        ) : (
          <>
            {src ? (
              <AvatarPrimitive.Image
                src={src}
                alt={alt ?? ''}
                className={cn('aspect-square h-full w-full', imageClassName)}
                {...restImageProps}
              />
            ) : null}
            <AvatarPrimitive.Fallback
              className={cn(
                'flex h-full w-full items-center justify-center bg-[var(--rt-muted-bg] text-sm font-medium text-[var(--rt-muted-foreground]',
                fallbackClassName
              )}
              {...restFallbackProps}
            >
              {fallbackContent}
            </AvatarPrimitive.Fallback>
          </>
        )}
      </AvatarPrimitive.Root>
    )
  }
)

Avatar.displayName = AvatarPrimitive.Root.displayName

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))

AvatarImage.displayName = AvatarPrimitive.Image.displayName

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center bg-[--rt-muted-bg] text-sm font-medium text-[var(--rt-muted-foreground)]',
      className
    )}
    {...props}
  />
))

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

function getInitialsFromName(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')
      .slice(0, 2) || undefined
  )
}
