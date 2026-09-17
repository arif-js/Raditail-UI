import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as React from 'react'
import { Textarea } from './textarea'

describe('Textarea', () => {
  it('renders with a placeholder', () => {
    render(<Textarea placeholder="Description" />)
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument()
  })

  it('defaults to three rows and records its size', () => {
    render(<Textarea placeholder="Description" size="lg" />)
    const textarea = screen.getByPlaceholderText('Description')

    expect(textarea).toHaveAttribute('rows', '3')
    expect(textarea.dataset.size).toBe('lg')
    expect(textarea.className).toContain('text-base')
  })

  it('merges a caller className', () => {
    render(<Textarea placeholder="Description" className="font-mono" />)
    expect(screen.getByPlaceholderText('Description').className).toContain(
      'font-mono'
    )
  })

  it('can be disabled', () => {
    render(<Textarea placeholder="Description" disabled />)
    expect(screen.getByPlaceholderText('Description')).toBeDisabled()
  })
})
