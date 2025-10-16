import type { Meta, StoryObj } from '@storybook/react'
import { UserRoundIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const meta: Meta<typeof Avatar> = {
  tags: ['autodocs'],
  title: 'Components/Avatar',
  component: Avatar,
}

export default meta

type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/000000?v=4',
    alt: 'Taylor Adams',
    className: 'h-12 w-12',
  },
}

export const WithIcon: Story = {
  args: {
    className: 'h-12 w-12',
    icon: (
      <UserRoundIcon className="h-6 w-6 text-[var(--rt-muted-foreground)]" />
    ),
  },
}

export const WithInitials: Story = {
  args: {
    className: 'h-12 w-12',
    initials: 'JD',
  },
}

export const WithAutoInitials: Story = {
  args: {
    className: 'h-12 w-12',
    alt: 'John Doe',
  },
}

export const WithLongName: Story = {
  args: {
    className: 'h-12 w-12',
    alt: 'Christopher Alexander',
  },
}

export const CustomChildren: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="https://avatars.githubusercontent.com/u/000001?v=4"
        alt="Jordan"
      />
      <AvatarFallback>JA</AvatarFallback>
    </Avatar>
  ),
  args: {
    className: 'h-12 w-12',
  },
}
