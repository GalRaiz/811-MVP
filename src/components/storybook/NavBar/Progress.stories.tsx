import type { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'NavBar/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: { type: 'number', min: 1 },
      description: 'Current step number',
    },
    total: {
      control: { type: 'number', min: 1 },
      description: 'Total number of steps',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the progress component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ==== Basic Progress ====
export const Basic: Story = {
  args: {
    current: 3,
    total: 5,
    size: 'medium',
  },
};

// ==== Many Steps ====
export const ManySteps: Story = {
  args: {
    current: 8,
    total: 12,
    size: 'medium',
  },
};
