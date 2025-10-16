import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

const meta: Meta = {
  tags: ['autodocs'],
  title: 'Components/Tabs',
  component: Tabs,
  render: (args) => (
    <Tabs {...args}>
      <TabsList aria-label="Example tabs">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Manage your personal account details.
      </TabsContent>
      <TabsContent value="security">
        Update your password and MFA preferences.
      </TabsContent>
      <TabsContent value="notifications">
        Configure email and push notifications.
      </TabsContent>
    </Tabs>
  ),
  args: {
    defaultValue: 'account',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Controlled: Story = {
  render: () => (
    <Tabs value="security">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="security">Security content</TabsContent>
    </Tabs>
  ),
}
