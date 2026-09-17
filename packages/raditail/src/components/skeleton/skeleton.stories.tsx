import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, type SkeletonProps } from './skeleton'

const meta: Meta<SkeletonProps> = {
  tags: ['autodocs'],
  title: 'Components/Skeleton',
  component: Skeleton,
  args: { className: 'h-4 w-48' },
  argTypes: {
    circle: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<SkeletonProps>

export const Default: Story = {}

export const Circle: Story = {
  args: { circle: true, className: 'h-10 w-10' },
}

export const CardPlaceholder: Story = {
  render: () => (
    <div className="flex w-80 items-center gap-3">
      <Skeleton circle className="h-10 w-10" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ),
}
