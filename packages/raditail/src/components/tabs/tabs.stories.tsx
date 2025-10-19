import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
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
  args: {
    value: 'account',
  },
  argTypes: {
    value: {
      control: 'inline-radio',
      options: ['account', 'security', 'notifications'],
      description: 'Control the active tab',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || 'account')

    // Sync with Storybook controls
    React.useEffect(() => {
      if (args.value !== undefined) {
        setValue(args.value)
      }
    }, [args.value])

    return (
      <Tabs value={value} onValueChange={setValue}>
        <TabsList aria-label="Controlled tabs">
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
    )
  },
  parameters: {
    docs: {
      source: {
        code: `function ControlledTabs() {
  const [value, setValue] = React.useState('account')
  
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList aria-label="Controlled tabs">
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
  )
}`,
      },
      description: {
        story:
          'Control the active tab externally using the `value` prop and `onValueChange` callback. Use the `value` control below to programmatically switch tabs.',
      },
    },
  },
}
