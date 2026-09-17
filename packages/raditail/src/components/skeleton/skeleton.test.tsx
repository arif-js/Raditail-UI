import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as React from 'react'
import { Skeleton } from './skeleton'

describe('Skeleton', () => {
  it('is hidden from assistive technology', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })

  it('uses the muted surface with a pulse', () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-32" />)
    const skeleton = screen.getByTestId('skeleton')

    expect(skeleton.className).toContain('animate-pulse')
    expect(skeleton.className).toContain('bg-[var(--rt-muted-bg)]')
    expect(skeleton.className).toContain('h-4')
  })

  it('renders as a circle when asked', () => {
    render(<Skeleton data-testid="skeleton" circle />)
    expect(screen.getByTestId('skeleton').className).toContain(
      'rounded-[var(--rt-radius-full)]'
    )
  })
})
