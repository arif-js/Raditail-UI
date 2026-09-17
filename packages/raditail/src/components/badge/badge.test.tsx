import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as React from 'react'
import { Badge } from './badge'

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('defaults to the subtle variant', () => {
    render(<Badge>Active</Badge>)
    const badge = screen.getByText('Active')

    expect(badge.dataset.variant).toBe('subtle')
    expect(badge.className).toContain('bg-[var(--rt-muted-bg)]')
  })

  it('applies solid colour scheme tokens', () => {
    render(
      <Badge variant="solid" colorScheme="destructive">
        Failed
      </Badge>
    )
    const badge = screen.getByText('Failed')

    expect(badge.className).toContain('bg-[var(--rt-destructive-color)]')
    expect(badge.className).toContain('text-[var(--rt-destructive-contrast)]')
  })

  it('outlines in the colour scheme', () => {
    render(
      <Badge variant="outline" colorScheme="primary">
        New
      </Badge>
    )
    const badge = screen.getByText('New')

    expect(badge.className).toContain('border-[var(--rt-primary-color)]')
    expect(badge.className).toContain('text-[var(--rt-primary-color)]')
  })
})
