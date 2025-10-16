import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as React from 'react'
import { Input } from './input'

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Email" />)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })
})
