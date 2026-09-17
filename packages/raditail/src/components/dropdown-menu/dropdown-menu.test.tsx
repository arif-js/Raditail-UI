import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import * as React from 'react'
import { Button } from '../button/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './dropdown-menu'

describe('DropdownMenu', () => {
  it('renders generated items from menuItems', () => {
    render(
      <DropdownMenu
        trigger={<Button>Account</Button>}
        menuItems={[
          { label: 'Profile' },
          { type: 'separator' },
          { label: 'Sign out' },
        ]}
        defaultOpen
      />
    )

    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Sign out')).toBeInTheDocument()
  })

  it('renders custom children through an explicit DropdownMenuContent', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Account</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByRole('button', { name: 'Account' }))

    expect(await screen.findByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('⇧⌘P')).toBeInTheDocument()
  })
})

describe('DropdownMenuShortcut', () => {
  it('mirrors ContextMenuShortcut styling and forwards props', () => {
    render(
      <DropdownMenuShortcut data-testid="shortcut">⌘K</DropdownMenuShortcut>
    )
    const shortcut = screen.getByTestId('shortcut')

    expect(shortcut).toHaveTextContent('⌘K')
    expect(shortcut.className).toContain('ml-auto')
    expect(shortcut.className).toContain('text-xs')
    expect(shortcut.className).toContain('text-[var(--rt-muted-foreground)]')
  })

  it('merges a caller className', () => {
    render(
      <DropdownMenuShortcut
        data-testid="shortcut"
        className="text-rt-destructive"
      >
        ⌘K
      </DropdownMenuShortcut>
    )

    expect(screen.getByTestId('shortcut').className).toContain(
      'text-rt-destructive'
    )
  })
})
