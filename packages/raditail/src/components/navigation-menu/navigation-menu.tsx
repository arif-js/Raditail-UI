import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/utils/cn'
import type { ComponentSize } from '@/utils/size'
import { navListGapClasses, navTriggerSizeClasses } from '@/utils/size'

type NavigationMenuContextValue = {
  size: ComponentSize
}

const NavigationMenuContext =
  React.createContext<NavigationMenuContextValue | null>(null)

const useNavigationMenuSize = () => {
  const context = React.useContext(NavigationMenuContext)
  return context?.size ?? 'md'
}

export interface NavigationMenuItemConfig {
  key?: React.Key
  label: React.ReactNode
  href?: string
  content?: React.ReactNode
  triggerProps?: React.ComponentPropsWithoutRef<
    typeof NavigationMenuPrimitive.Trigger
  >
  contentProps?: React.ComponentPropsWithoutRef<
    typeof NavigationMenuPrimitive.Content
  >
  itemProps?: React.ComponentPropsWithoutRef<
    typeof NavigationMenuPrimitive.Item
  >
  linkProps?: React.ComponentPropsWithoutRef<
    typeof NavigationMenuPrimitive.Link
  >
}

export interface NavigationMenuProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  size?: ComponentSize
  menuItems?: NavigationMenuItemConfig[]
}

export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(({ className, children, size = 'md', menuItems, ...props }, ref) => (
  <NavigationMenuContext.Provider value={{ size }}>
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        'relative z-30 flex max-w-max flex-1 items-center justify-center',
        className
      )}
      {...props}
    >
      <NavigationMenuPrimitive.List
        className={cn(
          'group flex list-none items-center rounded-[var(--rt-radius-lg)] border border-transparent bg-transparent p-1 text-sm',
          navListGapClasses[size]
        )}
        data-size={size}
      >
        {menuItems?.map((item, index) => {
          const { className: linkClassName, ...linkRest } = item.linkProps ?? {}
          return (
            <NavigationMenuPrimitive.Item
              key={item.key ?? index}
              {...item.itemProps}
            >
              <NavigationMenuTrigger {...item.triggerProps}>
                {item.label}
              </NavigationMenuTrigger>
              {item.content ? (
                <NavigationMenuContent {...item.contentProps}>
                  {item.content}
                </NavigationMenuContent>
              ) : item.href ? (
                <NavigationMenuLink
                  href={item.href}
                  {...linkRest}
                  className={cn(
                    'inline-flex select-none items-center rounded-[var(--rt-radius-md)] font-medium text-[--rt-muted-foreground] transition hover:text-[--rt-foreground] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--rt-primary-color]/40',
                    navTriggerSizeClasses[size],
                    linkClassName
                  )}
                  data-size={size}
                >
                  {item.label}
                </NavigationMenuLink>
              ) : null}
            </NavigationMenuPrimitive.Item>
          )
        })}
        {children}
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  </NavigationMenuContext.Provider>
))

NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

export const NavigationMenuItem = NavigationMenuPrimitive.Item

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
    size?: ComponentSize
  }
>(({ className, children, size, ...props }, ref) => {
  const contextSize = useNavigationMenuSize()
  const resolvedSize = size ?? contextSize
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        'group inline-flex select-none items-center gap-1 rounded-[var(--rt-radius-md)] font-medium text-[--rt-muted-foreground] transition hover:text-[--rt-foreground] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--rt-primary-color]/40',
        navTriggerSizeClasses[resolvedSize],
        className
      )}
      data-size={resolvedSize}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </NavigationMenuPrimitive.Trigger>
  )
})

NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn('left-0 top-full w-full sm:absolute sm:w-auto', className)}
    {...props}
  />
))

NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

export const NavigationMenuLink = NavigationMenuPrimitive.Link

export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Viewport
    ref={ref}
    className={cn(
      'absolute left-0 top-full mt-2 w-full overflow-hidden rounded-[var(--rt-radius-lg)] border border-[--rt-border-color] bg-[--rt-bg] shadow-lg sm:w-[20rem]',
      className
    )}
    {...props}
  />
))

NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName
