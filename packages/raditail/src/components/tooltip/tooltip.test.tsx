import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import * as React from 'react'
import { Button } from '../button/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'

describe('Tooltip', () => {
  it('reveals content on hover', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Info</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByRole('button', { name: 'Info' }))

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Tooltip text')
  })

  it('accepts the body through the content prop', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Info</Button>
          </TooltipTrigger>
          <TooltipContent content="Prop body" />
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByRole('button', { name: 'Info' }))

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Prop body')
  })

  it('prefers content over children when both are given', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Info</Button>
          </TooltipTrigger>
          <TooltipContent content="From prop">From child</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await user.hover(screen.getByRole('button', { name: 'Info' }))

    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toHaveTextContent('From prop')
    expect(tooltip).not.toHaveTextContent('From child')
  })
})
