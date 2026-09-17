import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as React from 'react'
import { Toaster, useToast } from './toaster'

function Trigger() {
  const { toast, dismissAll } = useToast()

  return (
    <div>
      <button
        onClick={() =>
          toast({ title: 'Saved', description: 'Changes stored.' })
        }
      >
        Notify
      </button>
      <button
        onClick={() =>
          toast({
            title: 'Upload failed',
            colorScheme: 'destructive',
            action: { label: 'Retry', altText: 'Retry the upload' },
          })
        }
      >
        Fail
      </button>
      <button onClick={dismissAll}>Clear</button>
    </div>
  )
}

describe('useToast', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('throws a helpful error outside a Toaster', () => {
    // React logs the render failure; keep it out of the test output.
    vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<Trigger />)).toThrow(/must be used within a <Toaster/)
  })
})

describe('Toaster', () => {
  // Radix renders the visible toast as an `<li>` inside a `role="region"`
  // viewport, alongside a visually-hidden `role="status"` announcer. Assertions
  // therefore target the list item that contains the title.
  const toastRootFor = (text: string) => screen.getByText(text).closest('li')

  it('renders a toast queued through useToast', async () => {
    const user = userEvent.setup()
    render(
      <Toaster>
        <Trigger />
      </Toaster>
    )

    await user.click(screen.getByRole('button', { name: 'Notify' }))

    const toast = await toastRootFor('Saved')
    expect(toast).not.toBeNull()
    expect(toast).toHaveTextContent('Changes stored.')
  })

  it('supports an action and a colour scheme', async () => {
    const user = userEvent.setup()
    render(
      <Toaster>
        <Trigger />
      </Toaster>
    )

    await user.click(screen.getByRole('button', { name: 'Fail' }))

    const toast = await toastRootFor('Upload failed')
    expect(toast).not.toBeNull()
    expect(toast).toHaveTextContent('Retry')
    expect(toast?.className).toContain('border-[var(--rt-destructive-color)]')
  })

  it('clears the queue on dismissAll', async () => {
    const user = userEvent.setup()
    render(
      <Toaster>
        <Trigger />
      </Toaster>
    )

    await user.click(screen.getByRole('button', { name: 'Notify' }))
    expect(await screen.findByText('Saved')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Clear' }))
    expect(screen.queryByText('Saved')).not.toBeInTheDocument()
  })
})
