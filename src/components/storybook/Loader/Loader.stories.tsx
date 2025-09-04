import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A loading spinner component with customizable size and appearance.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Loader Stories
export const Default: Story = {
  args: {},
};

// Custom Color Stories
export const CustomColor: Story = {
  args: {
    size: 'medium',
  },
};

export const RedLoader: Story = {
  args: {
    size: 'large',
  },
};

export const BlueLoader: Story = {
  args: {
    size: 'medium',
  },
};

export const PurpleLoader: Story = {
  args: {
    size: 'small',
  },
};

// Loader Comparison
export const SizeComparison: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '2rem',
      padding: '2rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <Loader />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Loader</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The loader component.',
      },
    },
  },
};

export const ColorComparison: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '2rem',
      padding: '2rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <Loader />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Loader</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The loader component.',
      },
    },
  },
};

// Context Examples
export const InContext: Story = {
  render: () => (
    <div style={{ 
      padding: '2rem',
      maxWidth: '600px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#f9fafb'
    }}>
      <h3 style={{ marginBottom: '1rem' }}>Loading Content</h3>
      <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
        Please wait while we fetch your data...
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Loader />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loader in a typical loading context with descriptive text.',
      },
    },
  },
};

export const ButtonLoader: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '1rem',
      padding: '2rem'
    }}>
      <button 
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3B82F6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <Loader />
        Loading...
      </button>
      
      <button 
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#10B981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <Loader />
        Processing
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loaders integrated into buttons for loading states.',
      },
    },
  },
};

export const FullPageLoader: Story = {
  render: () => (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <Loader />
      <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#374151' }}>
        Loading application...
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A full-page loading overlay with a large loader.',
      },
    },
  },
};
