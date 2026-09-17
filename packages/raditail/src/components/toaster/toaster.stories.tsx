import type { Meta, StoryObj } from '@storybook/react'
import { Toaster, useToast, type ToasterProps } from './toaster'
import { Button } from '../button/button'

const meta: Meta<ToasterProps> = {
  tags: ['autodocs'],
  title: 'Components/Toaster',
  component: Toaster,
  args: { position: 'bottom-right', duration: 5000, max: 3 },
}

export default meta

type Story = StoryObj<ToasterProps>

function Demo() {
  const { toast, dismissAll } = useToast()

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast({ title: 'Saved', description: 'Changes stored.' })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        colorScheme="destructive"
        onClick={() =>
          toast({
            title: 'Upload failed',
            description: 'The file exceeded 10 MB.',
            colorScheme: 'destructive',
            action: {
              label: 'Retry',
              altText: 'Retry the upload',
              onClick: () => {},
            },
          })
        }
      >
        With action
      </Button>
      <Button variant="ghost" onClick={dismissAll}>
        Dismiss all
      </Button>
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <Toaster {...args}>
      <Demo />
    </Toaster>
  ),
}
