import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../button/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible'

const meta: Meta<typeof Collapsible> = {
  tags: ['autodocs'],
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    docs: {
      description: {
        component:
          'An interactive component that expands and collapses content.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="w-72 space-y-4"
      >
        <CollapsibleTrigger asChild>
          <Button variant="outline">
            {open ? 'Hide details' : 'Show details'}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p className="mt-2 text-sm text-[var(--rt-muted-foreground)]">
            Collapsible lets you reveal additional context without leaving the
            page.
          </p>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}
