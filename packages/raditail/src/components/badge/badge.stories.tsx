import type { Meta, StoryObj } from '@storybook/react'
import { Badge, type BadgeProps } from './badge'

const meta: Meta<BadgeProps> = {
  tags: ['autodocs'],
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Badge',
    variant: 'subtle',
    colorScheme: 'default',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outline', 'subtle'],
    },
    colorScheme: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'destructive',
        'success',
        'warning',
      ],
    },
  },
}

export default meta

type Story = StoryObj<BadgeProps>

export const Default: Story = {}

export const Solid: Story = {
  args: { variant: 'solid', colorScheme: 'primary' },
}

export const Outline: Story = {
  args: { variant: 'outline', colorScheme: 'destructive' },
}

export const AllColorSchemes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(
        [
          'default',
          'primary',
          'secondary',
          'destructive',
          'success',
          'warning',
        ] as const
      ).map((colorScheme) => (
        <Badge key={colorScheme} {...args} colorScheme={colorScheme}>
          {colorScheme}
        </Badge>
      ))}
    </div>
  ),
}
