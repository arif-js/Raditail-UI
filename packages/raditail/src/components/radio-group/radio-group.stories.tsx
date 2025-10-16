import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from './radio-group'
import type { ComponentSize } from '@/utils/size'

type RadioGroupStoryArgs = {
  defaultValue?: string
  size?: ComponentSize
}

const meta: Meta<RadioGroupStoryArgs> = {
  tags: ['autodocs'],
  title: 'Components/Radio Group',
  component: RadioGroup,
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the radio buttons',
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value',
    },
  },
  args: {
    defaultValue: 'monthly',
    size: 'md',
  },
}

export default meta

type Story = StoryObj<RadioGroupStoryArgs>

export const Default: Story = {
  render: (args) => (
    <RadioGroup
      defaultValue={args.defaultValue}
      className="flex flex-col gap-3"
    >
      <label className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem value="monthly" size={args.size} />
        Monthly
      </label>
      <label className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem value="yearly" size={args.size} />
        Yearly
      </label>
    </RadioGroup>
  ),
}

const Small: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <RadioGroup
      defaultValue={args.defaultValue}
      className="flex flex-col gap-2"
    >
      <label className="flex items-center gap-2 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem value="monthly" size="sm" />
        Monthly
      </label>
      <label className="flex items-center gap-2 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem value="yearly" size="sm" />
        Yearly
      </label>
    </RadioGroup>
  ),
}

const Medium: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <RadioGroup
      defaultValue={args.defaultValue}
      className="flex flex-col gap-3"
    >
      <label className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem value="monthly" size="md" />
        Monthly
      </label>
      <label className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem value="yearly" size="md" />
        Yearly
      </label>
    </RadioGroup>
  ),
}

const Large: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <RadioGroup
      defaultValue={args.defaultValue}
      className="flex flex-col gap-3"
    >
      <label className="flex items-center gap-3 text-base text-[var(--rt-foreground)]">
        <RadioGroupItem value="monthly" size="lg" />
        Monthly
      </label>
      <label className="flex items-center gap-3 text-base text-[var(--rt-foreground)]">
        <RadioGroupItem value="yearly" size="lg" />
        Yearly
      </label>
    </RadioGroup>
  ),
}

const AllSizes: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[var(--rt-foreground)]">
          Small
        </h3>
        <RadioGroup defaultValue="monthly" className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm text-[var(--rt-foreground)]">
            <RadioGroupItem value="monthly" size="sm" />
            Monthly
          </label>
          <label className="flex items-center gap-2 text-sm text-[var(--rt-foreground)]">
            <RadioGroupItem value="yearly" size="sm" />
            Yearly
          </label>
        </RadioGroup>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[var(--rt-foreground)]">
          Medium
        </h3>
        <RadioGroup defaultValue="monthly" className="flex flex-col gap-3">
          <label className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
            <RadioGroupItem value="monthly" size="md" />
            Monthly
          </label>
          <label className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
            <RadioGroupItem value="yearly" size="md" />
            Yearly
          </label>
        </RadioGroup>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[var(--rt-foreground)]">
          Large
        </h3>
        <RadioGroup defaultValue="monthly" className="flex flex-col gap-3">
          <label className="flex items-center gap-3 text-base text-[var(--rt-foreground)]">
            <RadioGroupItem value="monthly" size="lg" />
            Monthly
          </label>
          <label className="flex items-center gap-3 text-base text-[var(--rt-foreground)]">
            <RadioGroupItem value="yearly" size="lg" />
            Yearly
          </label>
        </RadioGroup>
      </div>
    </div>
  ),
}
