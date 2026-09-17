import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

describe('Card', () => {
  it('composes header, content and footer', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Deployments</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>1,204 builds</CardContent>
        <CardFooter>Updated 2m ago</CardFooter>
      </Card>
    )

    expect(
      screen.getByRole('heading', { name: 'Deployments' })
    ).toBeInTheDocument()
    expect(screen.getByText('Last 30 days')).toBeInTheDocument()
    expect(screen.getByText('1,204 builds')).toBeInTheDocument()
    expect(screen.getByText('Updated 2m ago')).toBeInTheDocument()
  })

  it('applies variant styling and merges className', () => {
    render(
      <Card variant="elevated" className="w-80" data-testid="card">
        Body
      </Card>
    )
    const card = screen.getByTestId('card')

    expect(card.className).toContain('shadow-md')
    expect(card.className).toContain('w-80')
    expect(card.className).toContain('border-[var(--rt-border-color)]')
  })

  it('defaults to the outline variant', () => {
    render(<Card data-testid="card">Body</Card>)
    const card = screen.getByTestId('card')

    expect(card.className).toContain('shadow-none')
    expect(card.className).not.toContain('shadow-md')
  })
})
