import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  tags: ['autodocs'],
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The progress value (0-100)',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the progress bar',
    },
  },
  args: {
    value: 45,
    size: 'md',
  },
}

export default meta

type Story = StoryObj<typeof Progress>

export const Default: Story = {
  render: (args) => (
    <div className="w-[400px] space-y-2">
      <div className="flex justify-between text-sm text-[var(--rt-muted-foreground)]">
        <span>Progress</span>
        <span>{args.value}%</span>
      </div>
      <Progress {...args} />
    </div>
  ),
}

export const Empty: Story = {
  args: {
    value: 0,
  },
  render: (args) => (
    <div className="w-[400px] space-y-2">
      <div className="flex justify-between text-sm text-[var(--rt-muted-foreground)]">
        <span>Not started</span>
        <span>{args.value}%</span>
      </div>
      <Progress {...args} />
    </div>
  ),
}

export const Half: Story = {
  args: {
    value: 50,
  },
  render: (args) => (
    <div className="w-[400px] space-y-2">
      <div className="flex justify-between text-sm text-[var(--rt-muted-foreground)]">
        <span>In progress</span>
        <span>{args.value}%</span>
      </div>
      <Progress {...args} />
    </div>
  ),
}

export const Complete: Story = {
  args: {
    value: 100,
  },
  render: (args) => (
    <div className="w-[400px] space-y-2">
      <div className="flex justify-between text-sm text-[var(--rt-foreground)]">
        <span className="font-medium">Complete</span>
        <span>{args.value}%</span>
      </div>
      <Progress {...args} />
    </div>
  ),
}

const Small: Story = {
  args: {
    size: 'sm',
    value: 60,
  },
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <div className="w-[400px] space-y-2">
      <div className="flex justify-between text-sm text-[var(--rt-muted-foreground)]">
        <span>Small size</span>
        <span>{args.value}%</span>
      </div>
      <Progress {...args} />
    </div>
  ),
}

const Large: Story = {
  args: {
    size: 'lg',
    value: 75,
  },
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <div className="w-[400px] space-y-2">
      <div className="flex justify-between text-sm text-[var(--rt-muted-foreground)]">
        <span>Large size</span>
        <span>{args.value}%</span>
      </div>
      <Progress {...args} />
    </div>
  ),
}

export const Animated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An animated progress bar that increments automatically.',
      },
    },
  },
  render: (args) => (
    <div className="w-[400px]">
      <ProgressDemo {...args} />
    </div>
  ),
}

const WithDifferentSizes: Story = {
  parameters: {
    docs: {
      disable: true,
    },
  },
  render: (args) => (
    <div className="w-[400px] space-y-6">
      <div className="space-y-2">
        <div className="text-sm text-[var(--rt-muted-foreground)]">Small</div>
        <Progress {...args} size="sm" />
      </div>
      <div className="space-y-2">
        <div className="text-sm text-[var(--rt-muted-foreground)]">
          Medium (default)
        </div>
        <Progress {...args} size="md" />
      </div>
      <div className="space-y-2">
        <div className="text-sm text-[var(--rt-muted-foreground)]">Large</div>
        <Progress {...args} size="lg" />
      </div>
    </div>
  ),
}

function ProgressDemo(props: React.ComponentProps<typeof Progress>) {
  const [value, setValue] = useState(props.value ?? 0)

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((current) => (current >= 100 ? 0 : current + 10))
    }, 1200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-[var(--rt-muted-foreground)]">
        <span>Downloading...</span>
        <span>{value}%</span>
      </div>
      <Progress {...props} value={value} />
    </div>
  )
}
