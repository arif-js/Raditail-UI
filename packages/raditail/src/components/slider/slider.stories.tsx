import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  tags: ['autodocs'],
  title: 'Components/Slider',
  component: Slider,
}

export default meta

type Story = StoryObj<typeof Slider>

export const Controlled: Story = {
  render: (args) => <SliderDemo {...args} />,
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [40],
  },
}

function SliderDemo(props: React.ComponentProps<typeof Slider>) {
  const [value, setValue] = useState(props.defaultValue ?? [0])
  return (
    <div className="space-y-2">
      <Slider {...props} value={value} onValueChange={setValue} />
      <span className="text-sm text-[var(--rt-muted-foreground)]">
        Value: {value.join(', ')}
      </span>
    </div>
  )
}
