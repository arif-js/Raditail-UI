import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button', { name: 'Outline' })
    expect(button.className).toContain('border-[var(--rt-border-color)]')
    expect(button.className).toContain('text-[var(--rt-foreground)]')
    expect(button.className).toContain('hover:bg-[var(--rt-muted-bg)]')
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

describe('Button loading deprecation', () => {
  // The warning fires once per module, so each test needs a fresh instance of
  // the module rather than a shared "has warned" flag.
  let WarnButton: typeof Button
  let warn: ReturnType<typeof vi.spyOn>

  beforeEach(async () => {
    vi.resetModules()
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    WarnButton = (await import('./button')).Button
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('keeps applying the cursor-progress style', () => {
    render(<WarnButton loading>Saving</WarnButton>)

    expect(screen.getByRole('button', { name: 'Saving' }).className).toContain(
      'cursor-progress'
    )
  })

  it('warns once, naming isLoading', () => {
    render(
      <>
        <WarnButton loading>One</WarnButton>
        <WarnButton loading>Two</WarnButton>
      </>
    )

    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn.mock.calls[0][0]).toContain('isLoading')
  })

  it('never forwards loading to the DOM element', () => {
    render(<WarnButton loading>Saving</WarnButton>)

    expect(screen.getByRole('button', { name: 'Saving' })).not.toHaveAttribute(
      'loading'
    )
  })

  it('does not warn for the isLoading prop', () => {
    render(<WarnButton isLoading>Saving</WarnButton>)

    expect(warn).not.toHaveBeenCalled()
  })
})
