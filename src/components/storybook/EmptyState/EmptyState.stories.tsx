import type { Meta, StoryObj } from '@storybook/react';
import EmptyState from './EmptyState';
import Button from '../Button/Button';
import { useState } from 'react';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An empty state component for displaying when there is no content or data to show.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title of the empty state',
    },
    subtitle: {
      control: 'text',
      description: 'The subtitle text explaining the empty state',
    },


  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic EmptyState Stories
export const Default: Story = {
  args: {
    title: 'No items found',
    subtitle: 'There are no items to display at the moment.',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'No results found',
    subtitle: 'Try adjusting your search criteria or filters.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No projects yet',
    subtitle: 'Get started by creating your first project.',
  },
};

export const WithMultipleActions: Story = {
  args: {
    title: 'No data available',
    subtitle: 'You can either import existing data or start from scratch.',
  },
};

// Common Empty State Scenarios
export const NoSearchResults: Story = {
  args: {
    title: 'No search results',
    subtitle: 'We couldn\'t find any results matching your search. Try different keywords or check your spelling.',
  },
};

export const NoNotifications: Story = {
  args: {
    title: 'All caught up!',
    subtitle: 'You have no new notifications at this time.',
  },
};

export const NoMessages: Story = {
  args: {
    title: 'No messages yet',
    subtitle: 'Start a conversation by sending your first message.',
  },
};

export const NoFiles: Story = {
  args: {
    title: 'No files uploaded',
    subtitle: 'Upload your first file to get started.',
  },
};

export const NoTasks: Story = {
  args: {
    title: 'No tasks assigned',
    subtitle: 'Great job! You have completed all your assigned tasks.',
  },
};

export const NoConnections: Story = {
  args: {
    title: 'No connections yet',
    subtitle: 'Connect with other users to build your network.',
  },
};

// Empty State Variations
export const LongDescription: Story = {
  args: {
    title: 'No recent activity',
    subtitle: 'It looks like there hasn\'t been any recent activity in your account. This could mean that all your tasks are up to date, or that you might want to check if there are any pending items that need your attention.',
  },
};

export const NoIcon: Story = {
  args: {
    title: 'Empty workspace',
    subtitle: 'Your workspace is currently empty. Start building by adding some content.',
  },
};

export const NoAction: Story = {
  args: {
    title: 'No data to display',
    subtitle: 'This section is currently empty. Check back later for updates.',
  },
};

// Custom Styling Examples
export const CustomStyling: Story = {
  args: {
    title: 'Custom styled empty state',
    subtitle: 'This empty state uses custom CSS classes for unique styling.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how to apply custom CSS classes to empty states.',
      },
    },
  },
};

// Empty State Comparison
export const EmptyStateComparison: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '2rem',
      padding: '2rem',
      maxWidth: '1200px'
    }}>
      <EmptyState
        title="No items"
        subtitle="Basic empty state without icon or action."
      />
      
      <EmptyState
        title="No results"
        subtitle="Empty state with an icon for visual appeal."
      />
      
      <EmptyState
        title="Get started"
        subtitle="Empty state with a call-to-action button."
      />
      
      <EmptyState
        title="No data"
        subtitle="Empty state with multiple action options."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A comparison of different empty state configurations.',
      },
    },
  },
};

// Interactive Examples
export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p>Current count: {count}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button 
              btnText="Increment" 
              type="primary" 
              onClick={() => setCount(prev => prev + 1)} 
            />
            <Button 
              btnText="Decrement" 
              type="secondary" 
              onClick={() => setCount(prev => Math.max(0, prev - 1))} 
            />
            <Button 
              btnText="Reset" 
              type="secondary" 
              onClick={() => setCount(0)} 
            />
          </div>
        </div>
        
        {count === 0 ? (
          <EmptyState
            title="No items yet"
            subtitle="Click the increment button to add items to your list."
          />
        ) : (
          <div style={{ 
            padding: '2rem',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#f9fafb'
          }}>
            <h3>Items List</h3>
            <p>You have {count} item{count !== 1 ? 's' : ''} in your list.</p>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {Array.from({ length: count }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive example showing how empty states can change based on data.',
      },
    },
  },
};
