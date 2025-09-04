import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component for displaying content in a structured layout.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the card',
    },



    onClick: {
      action: 'clicked',
      description: 'Function called when card is clicked',
    },

    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Card Stories
export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a basic card with title and content.',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Card Title',
    description: 'Card Subtitle',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Image Card',
    description: 'With Featured Image',
    imageUrl: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Card+Image',
  },
};

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    description: 'Click me!',
    onClick: () => console.log('Card clicked'),
  },
};

export const LongContent: Story = {
  args: {
    title: 'Card with Long Content',
    description: 'Content that spans multiple lines',
    children: 'This is a card with longer content that demonstrates how the card handles text that spans multiple lines. It shows the flexibility of the card component in accommodating various content lengths.',
  },
};

export const NoTitle: Story = {
  args: {
    children: 'This card has no title, only content.',
  },
};

export const NoContent: Story = {
  args: {
    title: 'Title Only Card',
    description: 'No content body',
  },
};

export const ImageOnly: Story = {
  args: {
    imageUrl: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Image+Only',
  },
};

// Interactive Examples
export const Interactive: Story = {
  args: {
    title: 'Interactive Card',
    description: 'Click to see action',
    children: 'This card has an onClick handler that will log to the Actions panel.',
    onClick: () => console.log('Card clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'This card demonstrates the onClick functionality.',
      },
    },
  },
};

// Card Grid for Comparison
export const CardGrid: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '2rem',
      padding: '2rem',
      maxWidth: '1200px'
    }}>
      <Card
        title="Basic Card"
        description="Simple card with title and content."
      />
      
      <Card
        title="With Subtitle"
        description="Additional context"
      />
      
      <Card
        title="Image Card"
        description="Visual content"
        imageUrl="https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Image"
      />
      
      <Card
        title="Clickable"
        description="Interactive element"
        children="This card can be clicked to trigger actions."
        onClick={() => console.log('Card clicked')}
      />
      
      <Card
        title="Long Content"
        description="Extended text"
        children="This card demonstrates how longer content is handled. It shows the flexibility of the card component in accommodating various content lengths and types."
      />
      
      <Card
        title="Minimal"
        description="Sometimes less is more."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A grid showing various card configurations for easy comparison.',
      },
    },
  },
};

// Custom Styling Examples
export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Card',
    description: 'With custom CSS classes',
    children: 'This card uses custom CSS classes for unique styling.',
    className: 'custom-card custom-theme',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how to apply custom CSS classes to cards.',
      },
    },
  },
};
