import type { Meta, StoryObj } from '@storybook/react'
import { StarIcon } from 'lucide-react'
import { Button, type ButtonProps } from './button'

const meta: Meta<ButtonProps> = {
  tags: ['autodocs'],
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Raditail button variants built on CSS variables for instant theming.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'subtle'],
    },
    colorScheme: {
      control: 'inline-radio',
      options: [
        'default',
        'primary',
        'secondary',
        'destructive',
        'success',
        'warning',
      ],
      description: 'Semantic color scheme for the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    icon: {
      control: false,
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
  },
  args: {
    children: 'Click me',
    variant: 'solid',
    colorScheme: 'default',
    size: 'md',
    iconPosition: 'left',
  },
}

export default meta

type Story = StoryObj<ButtonProps>

export const Default: Story = {}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Processing',
  },
}

export const WithSlot: Story = {
  render: (args) => (
    <Button {...args} asChild>
      <a href="#">As child link</a>
    </Button>
  ),
}

const demoIcon = () => <StarIcon className="h-4 w-4" />

export const WithIconLeft: Story = {
  args: {
    children: 'Favourite',
    icon: demoIcon(),
    iconPosition: 'left',
  },
}

export const WithIconRight: Story = {
  args: {
    children: 'Share',
    icon: demoIcon(),
    iconPosition: 'right',
  },
}

export const IconOnly: Story = {
  args: {
    children: undefined,
    icon: demoIcon(),
    'aria-label': 'Mark as favourite',
  },
}

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button colorScheme="primary">Primary</Button>
        <Button colorScheme="secondary">Secondary</Button>
        <Button colorScheme="destructive">Destructive</Button>
        <Button colorScheme="success">Success</Button>
        <Button colorScheme="warning">Warning</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" colorScheme="primary">
          Primary
        </Button>
        <Button variant="outline" colorScheme="secondary">
          Secondary
        </Button>
        <Button variant="outline" colorScheme="destructive">
          Destructive
        </Button>
        <Button variant="outline" colorScheme="success">
          Success
        </Button>
        <Button variant="outline" colorScheme="warning">
          Warning
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" colorScheme="primary">
          Primary
        </Button>
        <Button variant="ghost" colorScheme="secondary">
          Secondary
        </Button>
        <Button variant="ghost" colorScheme="destructive">
          Destructive
        </Button>
        <Button variant="ghost" colorScheme="success">
          Success
        </Button>
        <Button variant="ghost" colorScheme="warning">
          Warning
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Buttons support semantic color schemes: primary, secondary, destructive, success, and warning.',
      },
    },
  },
}
