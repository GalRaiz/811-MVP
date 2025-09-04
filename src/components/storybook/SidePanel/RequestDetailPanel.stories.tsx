import type { Meta, StoryObj } from '@storybook/react';
import RequestDetailPanel from './RequestDetailPanel';
import { sampleRequest, sampleRequests } from '../../../data/sampleRequestData';

const meta: Meta<typeof RequestDetailPanel> = {
  title: 'SidePanel/RequestDetailPanel',
  component: RequestDetailPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive request detail panel that displays request information with editable fields, tags, tasks, and contact details. Supports both view and edit modes.',
      },
    },
  },
  argTypes: {
    request: {
      description: 'The request data to display',
      control: { type: 'object' },
    },
    isOpen: {
      description: 'Whether the panel is open',
      control: { type: 'boolean' },
    },
    onClose: {
      description: 'Callback when panel is closed',
      action: 'closed',
    },
    onSave: {
      description: 'Callback when request is saved',
      action: 'saved',
    },
    onValidate: {
      description: 'Callback when request is validated',
      action: 'validated',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base story with sample request
export const Default: Story = {
  args: {
    request: sampleRequest,
    isOpen: true,
  },
};

// Story showing the panel in closed state
export const Closed: Story = {
  args: {
    request: sampleRequest,
    isOpen: false,
  },
};

// Story with medical assistance request
export const MedicalRequest: Story = {
  args: {
    request: sampleRequests[1], // Medical assistance request
    isOpen: true,
  },
};

// Story with clothing assistance request
export const ClothingRequest: Story = {
  args: {
    request: sampleRequests[2], // Clothing assistance request
    isOpen: true,
  },
};

// Story showing editing mode
export const EditingMode: Story = {
  args: {
    request: sampleRequest,
    isOpen: true,
  },
  play: async ({ canvasElement }) => {
    // This would simulate clicking the edit button
    // In a real implementation, you might use testing-library
    console.log('Editing mode story loaded');
  },
};

// Story with minimal request data
export const MinimalRequest: Story = {
  args: {
    request: {
      id: 'minimal-001',
      title: 'בקשה מינימלית',
      dateTime: '22.07.2025 | 10:00',
      tags: [
        { id: '1', label: 'מזון', icon: '🍽️', category: 'type' },
      ],
      originator: {
        role: 'מעלה הבקשה',
        name: 'Unknown',
      },
      contactDetails: {
        familyName: 'משפחה',
        address: 'כתובת',
        phone: 'טלפון',
      },
      description: 'תיאור קצר',
      tasks: [],
    },
    isOpen: true,
  },
};

// Story with many tasks
export const ManyTasks: Story = {
  args: {
    request: {
      ...sampleRequest,
      tasks: [
        { id: 'task-1', description: 'משימה ראשונה - איסוף חומרים', status: 'completed' as const },
        { id: 'task-2', description: 'משימה שנייה - מיון חומרים', status: 'in-progress' as const },
        { id: 'task-3', description: 'משימה שלישית - אריזה', status: 'pending' as const },
        { id: 'task-4', description: 'משימה רביעית - משלוח', status: 'pending' as const },
        { id: 'task-5', description: 'משימה חמישית - מעקב', status: 'pending' as const },
      ],
    },
    isOpen: true,
  },
};

// Story with many tags
export const ManyTags: Story = {
  args: {
    request: {
      ...sampleRequest,
      tags: [
        { id: '1', label: 'מזון', icon: '🍽️', category: 'type' },
        { id: '2', label: 'מנות חמות', icon: '🔥', category: 'service' },
        { id: '3', label: 'מחוז מרכז', icon: '📍', category: 'location' },
        { id: '4', label: '3 אנשים', icon: '👥', category: 'people' },
        { id: '5', label: 'שינוע', icon: '🚚', category: 'delivery' },
        { id: '6', label: 'דחוף', icon: '⚡', category: 'service' },
        { id: '7', label: 'מחוז צפון', icon: '📍', category: 'location' },
        { id: '8', label: '5+ אנשים', icon: '👥', category: 'people' },
      ],
    },
    isOpen: true,
  },
};

// Interactive story
export const Interactive: Story = {
  args: {
    request: sampleRequest,
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the interactive features of the RequestDetailPanel. You can click the edit button to enter editing mode, modify fields, add/remove tasks, and save changes.',
      },
    },
  },
};
