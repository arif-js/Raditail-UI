import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/utils/cn'
import type { ComponentSize } from '@/utils/size'
import { menuItemSizeClasses, menuLabelSizeClasses } from '@/utils/size'

type DropdownMenuContextValue = {
  size: ComponentSize
}

const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null)

const useDropdownMenuContext = () => {
  const context = React.useContext(DropdownMenuContext)
  return context?.size ?? 'md'
}

export type DropdownMenuGeneratedItem =
  | {
      type?: 'item'
      label: React.ReactNode
      inset?: boolean
      disabled?: boolean
      onSelect?: React.ComponentPropsWithoutRef<
        typeof DropdownMenuPrimitive.Item
      >['onSelect']
      className?: string
    }
  | {
      type: 'separator'
      className?: string
    }
  | {
      type: 'label'
      label: React.ReactNode
      inset?: boolean
      className?: string
    }

type DropdownMenuContentOptions = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> & {
  alignment?: 'left' | 'right'
  size?: ComponentSize
}

export interface DropdownMenuProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {
  size?: ComponentSize
  menuItems?: DropdownMenuGeneratedItem[]
  trigger?: React.ReactNode
  contentProps?: DropdownMenuContentOptions
}

export const DropdownMenu = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Root>,
  DropdownMenuProps
>(
  (
    { size = 'md', menuItems, trigger, contentProps, children, ...props },
    ref
  ) => (
    <DropdownMenuContext.Provider value={{ size }}>
      <DropdownMenuPrimitive.Root ref={ref} {...props}>
        {trigger}
        {menuItems && menuItems.length > 0 ? (
          <DropdownMenuContent {...contentProps}>
            {menuItems.map((item, index) => {
              const key = `menu-item-${index}`
              if (item.type === 'separator') {
                return (
                  <DropdownMenuSeparator key={key} className={item.className} />
                )
              }
              if (item.type === 'label') {
                return (
                  <DropdownMenuLabel
                    key={key}
                    inset={item.inset}
                    className={item.className}
                  >
                    {item.label}
                  </DropdownMenuLabel>
                )
              }
              return (
                <DropdownMenuItem
                  key={key}
                  inset={item.inset}
                  disabled={item.disabled}
                  onSelect={item.onSelect}
                  className={item.className}
                >
                  {item.label}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        ) : null}
        {children}
      </DropdownMenuPrimitive.Root>
    </DropdownMenuContext.Provider>
  )
)

DropdownMenu.displayName = DropdownMenuPrimitive.Root.displayName

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
    size?: ComponentSize
  }
>(({ className, inset, children, size, ...props }, ref) => {
  const contextSize = useDropdownMenuContext()
  const resolvedSize = size ?? contextSize
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        'flex cursor-default select-none items-center gap-2 rounded-[var(--rt-radius-sm)] text-[--rt-foreground] outline-none focus:bg-[--rt-muted-bg] data-[state=open]:bg-[--rt-muted-bg]',
        menuItemSizeClasses[resolvedSize],
        inset && 'pl-8',
        className
      )}
      data-size={resolvedSize}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" aria-hidden />
    </DropdownMenuPrimitive.SubTrigger>
  )
})

DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] rounded-[var(--rt-radius-md)] border border-[--rt-border-color] bg-[--rt-bg] p-1 text-[--rt-foreground] shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out',
      className
    )}
    {...props}
  />
))

DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
    alignment?: 'left' | 'right'
    size?: ComponentSize
  }
>(({ className, sideOffset = 4, alignment, align, size, ...props }, ref) => {
  const contextSize = useDropdownMenuContext()
  const resolvedSize = size ?? contextSize
  const resolvedAlign = alignment
    ? alignment === 'left'
      ? 'start'
      : 'end'
    : align
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        align={resolvedAlign}
        className={cn(
          'z-50 min-w-[10rem] rounded-[var(--rt-radius-md)] border border-[--rt-border-color] bg-[--rt-bg] p-1 text-[--rt-foreground] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[side=top]:origin-bottom data-[side=bottom]:origin-top data-[side=right]:origin-left data-[side=left]:origin-right data-[align=end]:origin-top-right data-[align=start]:origin-top-left',
          className
        )}
        data-size={resolvedSize}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
})

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    size?: ComponentSize
  }
>(({ className, inset, size, ...props }, ref) => {
  const contextSize = useDropdownMenuContext()
  const resolvedSize = size ?? contextSize
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-[var(--rt-radius-sm)] text-[--rt-foreground] outline-none focus:bg-[--rt-muted-bg] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        menuItemSizeClasses[resolvedSize],
        inset && 'pl-8',
        className
      )}
      data-size={resolvedSize}
      {...props}
    />
  )
})

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
    size?: ComponentSize
  }
>(({ className, children, checked, size, ...props }, ref) => {
  const contextSize = useDropdownMenuContext()
  const resolvedSize = size ?? contextSize
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-[var(--rt-radius-sm)] pl-8 pr-2 text-[--rt-foreground] outline-none focus:bg-[--rt-muted-bg] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        menuItemSizeClasses[resolvedSize],
        className
      )}
      data-size={resolvedSize}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" aria-hidden />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
})

DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & {
    size?: ComponentSize
  }
>(({ className, children, size, ...props }, ref) => {
  const contextSize = useDropdownMenuContext()
  const resolvedSize = size ?? contextSize
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-[var(--rt-radius-sm)] pl-8 pr-2 text-[--rt-foreground] outline-none focus:bg-[--rt-muted-bg] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        menuItemSizeClasses[resolvedSize],
        className
      )}
      data-size={resolvedSize}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <DotIcon className="h-4 w-4" aria-hidden />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
})

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
    size?: ComponentSize
  }
>(({ className, inset, size, ...props }, ref) => {
  const contextSize = useDropdownMenuContext()
  const resolvedSize = size ?? contextSize
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        'font-semibold text-[var(--rt-muted-foreground]',
        menuLabelSizeClasses[resolvedSize],
        inset && 'pl-8',
        className
      )}
      data-size={resolvedSize}
      {...props}
    />
  )
})

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const size = useDropdownMenuContext()
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn('my-1 h-px bg-[var(--rt-border-color)]', className)}
      data-size={size}
      {...props}
    />
  )
})

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName
