import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

describe('Tabs', () => {
  it('switches content on trigger click', async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account content</TabsContent>
        <TabsContent value="security">Security content</TabsContent>
      </Tabs>
    )

    expect(screen.getByText('Account content')).toBeVisible()
    await user.click(screen.getByRole('tab', { name: 'Security' }))
    expect(await screen.findByText('Security content')).toBeVisible()
  })
})
