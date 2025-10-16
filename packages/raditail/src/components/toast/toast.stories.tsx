import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../button/button'
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast'

type ToastStoryArgs = {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  colorScheme:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'warning'
}

const meta: Meta<ToastStoryArgs> = {
  tags: ['autodocs'],
  title: 'Components/Toast',
  component: ToastViewport,
  parameters: {
    docs: {
      description: {
        component:
          'A notification message that appears temporarily to provide feedback or information.',
      },
    },
  },
  argTypes: {
    position: {
      control: 'inline-radio',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Position of the toast on the screen',
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
      description: 'Semantic color scheme for the toast',
    },
  },
  args: {
    position: 'bottom-right',
    colorScheme: 'default',
  },
}

export default meta

type Story = StoryObj<ToastStoryArgs>

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)

    return (
      <ToastProvider swipeDirection="right">
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <Toast
          open={open}
          onOpenChange={setOpen}
          duration={4000}
          colorScheme={args.colorScheme}
        >
          <div className="flex w-full items-start gap-3">
            <div>
              <ToastTitle>Changes deployed</ToastTitle>
              <ToastDescription>
                Production deployment finished in 46 seconds.
              </ToastDescription>
            </div>
            <ToastAction altText="View logs">View logs</ToastAction>
            <ToastClose aria-label="Dismiss" />
          </div>
        </Toast>
        <ToastViewport position={args.position} />
      </ToastProvider>
    )
  },
}

export const ColorSchemes: Story = {
  render: () => {
    const [toasts, setToasts] = useState({
      default: false,
      primary: false,
      secondary: false,
      destructive: false,
      success: false,
      warning: false,
    })

    const showToast = (type: keyof typeof toasts) => {
      setToasts((prev) => ({ ...prev, [type]: true }))
    }

    return (
      <ToastProvider swipeDirection="right">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => showToast('default')}>
            Default Toast
          </Button>
          <Button
            variant="outline"
            colorScheme="primary"
            onClick={() => showToast('primary')}
          >
            Primary Toast
          </Button>
          <Button
            variant="outline"
            colorScheme="secondary"
            onClick={() => showToast('secondary')}
          >
            Secondary Toast
          </Button>
          <Button
            variant="outline"
            colorScheme="destructive"
            onClick={() => showToast('destructive')}
          >
            Destructive Toast
          </Button>
          <Button
            variant="outline"
            colorScheme="success"
            onClick={() => showToast('success')}
          >
            Success Toast
          </Button>
          <Button
            variant="outline"
            colorScheme="warning"
            onClick={() => showToast('warning')}
          >
            Warning Toast
          </Button>
        </div>

        <Toast
          open={toasts.default}
          onOpenChange={(open) => setToasts((p) => ({ ...p, default: open }))}
          duration={3000}
        >
          <div className="flex-1">
            <ToastTitle>Default notification</ToastTitle>
            <ToastDescription>
              This is a default toast message.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <Toast
          open={toasts.primary}
          onOpenChange={(open) => setToasts((p) => ({ ...p, primary: open }))}
          duration={3000}
          colorScheme="primary"
        >
          <div className="flex-1">
            <ToastTitle>Information</ToastTitle>
            <ToastDescription>
              This is an informational message.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <Toast
          open={toasts.secondary}
          onOpenChange={(open) => setToasts((p) => ({ ...p, secondary: open }))}
          duration={3000}
          colorScheme="secondary"
        >
          <div className="flex-1">
            <ToastTitle>Update available</ToastTitle>
            <ToastDescription>A new version is available.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <Toast
          open={toasts.destructive}
          onOpenChange={(open) =>
            setToasts((p) => ({ ...p, destructive: open }))
          }
          duration={3000}
          colorScheme="destructive"
        >
          <div className="flex-1">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>
              Something went wrong. Please try again.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <Toast
          open={toasts.success}
          onOpenChange={(open) => setToasts((p) => ({ ...p, success: open }))}
          duration={3000}
          colorScheme="success"
        >
          <div className="flex-1">
            <ToastTitle>Success</ToastTitle>
            <ToastDescription>
              Your changes have been saved successfully.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <Toast
          open={toasts.warning}
          onOpenChange={(open) => setToasts((p) => ({ ...p, warning: open }))}
          duration={3000}
          colorScheme="warning"
        >
          <div className="flex-1">
            <ToastTitle>Warning</ToastTitle>
            <ToastDescription>
              Please review your changes before proceeding.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <ToastViewport position="bottom-right" />
      </ToastProvider>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Toasts support semantic color schemes to communicate different types of messages: default for general notifications, primary for information, destructive for errors, success for confirmations, and warning for cautions.',
      },
    },
  },
}
