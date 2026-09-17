import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
} from './card'
import { Button } from '../button/button'

const meta: Meta<CardProps> = {
  tags: ['autodocs'],
  title: 'Components/Card',
  component: Card,
  args: { variant: 'outline' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['outline', 'elevated', 'flat'],
    },
  },
}

export default meta

type Story = StoryObj<CardProps>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Deployments</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">1,204 builds succeeded.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">View all</Button>
      </CardFooter>
    </Card>
  ),
}

export const Elevated: Story = {
  ...Default,
  args: { variant: 'elevated' },
}
