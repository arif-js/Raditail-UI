import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button, buttonVariants } from './button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button', { name: 'Outline' })
    expect(button.className).toContain(buttonVariants({ variant: 'outline' }))
  })

  it('disables when loading', () => {
    render(
      <Button isLoading>
        <span>Loading Label</span>
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('renders icon alongside label content', () => {
    render(<Button icon={<span data-testid="icon-marker" />}>With Icon</Button>)
    const button = screen.getByRole('button', { name: 'With Icon' })
    expect(screen.getByTestId('icon-marker')).toBeInTheDocument()
    expect(button.className).toContain('gap-2')
  })

  it('applies icon-only styling when no label is provided', () => {
    render(
      <Button icon={<span data-testid="icon-only" />} aria-label="Settings" />
    )
    const button = screen.getByRole('button', { name: 'Settings' })
    expect(button.dataset.iconOnly).toBe('true')
    expect(screen.getByTestId('icon-only')).toBeInTheDocument()
  })

  it('positions the icon on the right when requested', () => {
    render(
      <Button iconPosition="right" icon={<span data-testid="icon-right" />}>
        Continue
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Continue' })
    const iconWrapper = button.querySelector('[aria-hidden="true"]')
    expect(iconWrapper).not.toBeNull()
    expect(iconWrapper?.nextSibling).toBeNull()
  })
})
