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
      <div className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem
          value="monthly"
          id="rg-default-monthly"
          size={args.size}
        />
        <label htmlFor="rg-default-monthly">Monthly</label>
      </div>
      <div className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem
          value="yearly"
          id="rg-default-yearly"
          size={args.size}
        />
        <label htmlFor="rg-default-yearly">Yearly</label>
      </div>
    </RadioGroup>
  ),
}

export const Small: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <RadioGroup
      defaultValue={args.defaultValue}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center gap-2 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem value="monthly" id="rg-small-monthly" size="sm" />
        <label htmlFor="rg-small-monthly">Monthly</label>
      </div>
      <div className="flex items-center gap-2 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem value="yearly" id="rg-small-yearly" size="sm" />
        <label htmlFor="rg-small-yearly">Yearly</label>
      </div>
    </RadioGroup>
  ),
}

export const Medium: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <RadioGroup
      defaultValue={args.defaultValue}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem value="monthly" id="rg-medium-monthly" size="md" />
        <label htmlFor="rg-medium-monthly">Monthly</label>
      </div>
      <div className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
        <RadioGroupItem value="yearly" id="rg-medium-yearly" size="md" />
        <label htmlFor="rg-medium-yearly">Yearly</label>
      </div>
    </RadioGroup>
  ),
}

export const Large: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <RadioGroup
      defaultValue={args.defaultValue}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-3 text-base text-[var(--rt-foreground)]">
        <RadioGroupItem value="monthly" id="rg-large-monthly" size="lg" />
        <label htmlFor="rg-large-monthly">Monthly</label>
      </div>
      <div className="flex items-center gap-3 text-base text-[var(--rt-foreground)]">
        <RadioGroupItem value="yearly" id="rg-large-yearly" size="lg" />
        <label htmlFor="rg-large-yearly">Yearly</label>
      </div>
    </RadioGroup>
  ),
}

export const AllSizes: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[var(--rt-foreground)]">
          Small
        </h3>
        <RadioGroup defaultValue="monthly" className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-[var(--rt-foreground)]">
            <RadioGroupItem value="monthly" id="rg-all-sm-monthly" size="sm" />
            <label htmlFor="rg-all-sm-monthly">Monthly</label>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--rt-foreground)]">
            <RadioGroupItem value="yearly" id="rg-all-sm-yearly" size="sm" />
            <label htmlFor="rg-all-sm-yearly">Yearly</label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[var(--rt-foreground)]">
          Medium
        </h3>
        <RadioGroup defaultValue="monthly" className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
            <RadioGroupItem value="monthly" id="rg-all-md-monthly" size="md" />
            <label htmlFor="rg-all-md-monthly">Monthly</label>
          </div>
          <div className="flex items-center gap-3 text-sm text-[var(--rt-foreground)]">
            <RadioGroupItem value="yearly" id="rg-all-md-yearly" size="md" />
            <label htmlFor="rg-all-md-yearly">Yearly</label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[var(--rt-foreground)]">
          Large
        </h3>
        <RadioGroup defaultValue="monthly" className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-base text-[var(--rt-foreground)]">
            <RadioGroupItem value="monthly" id="rg-all-lg-monthly" size="lg" />
            <label htmlFor="rg-all-lg-monthly">Monthly</label>
          </div>
          <div className="flex items-center gap-3 text-base text-[var(--rt-foreground)]">
            <RadioGroupItem value="yearly" id="rg-all-lg-yearly" size="lg" />
            <label htmlFor="rg-all-lg-yearly">Yearly</label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
}
