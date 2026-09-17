import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog'

const meta: Meta<typeof AlertDialogContent> = {
  tags: ['autodocs'],
  title: 'Components/Alert Dialog',
  component: AlertDialogContent,
  parameters: {
    docs: {
      description: {
        component:
          'A modal dialog that interrupts the user with important content and expects a response.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" colorScheme="destructive">
          Delete project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete the
            project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction colorScheme="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const WithColorSchemes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" colorScheme="primary">
            Confirm Action
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm this action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to proceed with this action?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction colorScheme="primary">Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" colorScheme="success">
            Approve Request
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve this request?</AlertDialogTitle>
            <AlertDialogDescription>
              This will approve the request and notify the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction colorScheme="success">Approve</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" colorScheme="warning">
            Proceed with Caution
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Warning</AlertDialogTitle>
            <AlertDialogDescription>
              This action may have unintended consequences. Please review
              carefully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction colorScheme="warning">Proceed</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Alert dialog actions support semantic color schemes to communicate the nature of the action: destructive for dangerous actions, success for confirmations, warning for cautionary actions, and primary for general confirmations.',
      },
    },
  },
}

export const WithButtonSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm">Small Buttons</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Small button size</AlertDialogTitle>
            <AlertDialogDescription>
              Dialog actions can have different sizes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel size="sm">Cancel</AlertDialogCancel>
            <AlertDialogAction size="sm" colorScheme="primary">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="md">Medium Buttons</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Medium button size</AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="lg">Large Buttons</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Large button size</AlertDialogTitle>
            <AlertDialogDescription>
              Dialog actions can have different sizes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel size="lg">Cancel</AlertDialogCancel>
            <AlertDialogAction size="lg" colorScheme="primary">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Alert dialog action buttons support size variants: sm, md (default), and lg.',
      },
    },
  },
}
