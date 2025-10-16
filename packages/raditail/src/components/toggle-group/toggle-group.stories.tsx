import type { Meta, StoryObj } from '@storybook/react'
import { ItalicIcon, UnderlineIcon, BoldIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from './toggle-group'

const meta: Meta = {
  tags: ['autodocs'],
  title: 'Components/Toggle Group',
  render: () => (
    <ToggleGroup type="multiple" className="inline-flex gap-2">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon className="h-4 w-4" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon className="h-4 w-4" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon className="h-4 w-4" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
