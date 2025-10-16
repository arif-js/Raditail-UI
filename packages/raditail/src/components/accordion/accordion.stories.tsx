import type { Meta, StoryObj } from '@storybook/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion'

const meta: Meta<typeof Accordion> = {
  tags: ['autodocs'],
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['single', 'multiple'],
      description:
        'Whether only one item can be open at a time (single) or multiple items can be open (multiple)',
    },
    collapsible: {
      control: 'boolean',
      description: 'When type is "single", allow closing the open item',
      if: { arg: 'type', eq: 'single' },
    },
  },
  args: {
    type: 'single',
    collapsible: true,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Single-selection mode (default). Only one item can be open at a time. Use the `collapsible` prop to allow closing the open item.',
      },
    },
  },
  render: (args) => (
    <div className="w-[500px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Raditail UI?</AccordionTrigger>
          <AccordionContent>
            Accessible Radix UI primitives styled with Tailwind CSS tokens.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I customize themes?</AccordionTrigger>
          <AccordionContent>
            Yes, override CSS variables or extend the Tailwind preset.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multiple-selection mode. Multiple accordion items can be open simultaneously. Try opening all three items at once.',
      },
    },
  },
  render: (args) => (
    <div className="w-[500px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Raditail UI?</AccordionTrigger>
          <AccordionContent>
            Accessible Radix UI primitives styled with Tailwind CSS tokens.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I customize themes?</AccordionTrigger>
          <AccordionContent>
            Yes, override CSS variables or extend the Tailwind preset.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes, built on Radix UI primitives which follow WAI-ARIA design
            patterns.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const WithLongContent: Story = {
  render: (args) => (
    <div className="w-[500px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What is Raditail UI and how does it work?
          </AccordionTrigger>
          <AccordionContent>
            Raditail UI is a comprehensive design system that provides
            accessible Radix UI primitives styled with Tailwind CSS tokens. It
            offers a wide range of customizable components that follow best
            practices for accessibility and user experience. The library is
            built with TypeScript for type safety and includes extensive
            documentation and examples.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Can I customize themes and styling options?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you have complete control over theming! You can override CSS
            variables to customize colors, spacing, and other design tokens.
            Additionally, you can extend the Tailwind preset to add your own
            utility classes or modify existing ones. The system is designed to
            be flexible and adaptable to your specific design needs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            VeryLongWordWithoutSpacesLikeThisOneToTestWordBreaking
          </AccordionTrigger>
          <AccordionContent>
            ThisIsAVeryLongWordWithoutAnySpacesOrHyphensToTestIfTheWordBreakingWorksProperlyAndDoesNotCauseTheAccordionWidthToChange.
            The accordion should maintain its width regardless of content
            length.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
