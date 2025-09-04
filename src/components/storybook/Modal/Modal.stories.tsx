import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal component for displaying overlays, dialogs, and forms.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    onClose: {
      action: 'closed',
      description: 'Function called when modal is closed',
    },
    title: {
      control: 'text',
      description: 'The title of the modal',
    },
    children: {
      control: false,
      description: 'The content of the modal',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'full'],
      description: 'The size of the modal',
    },

    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },

  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Modal Wrapper Component for Stories
const ModalWrapper = ({ children, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <Button 
        btnText="Open Modal" 
        type="primary" 
        onClick={() => setIsOpen(true)} 
      />
      <Modal 
        {...props} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Modal>
    </div>
  );
};

// Basic Modal Stories
export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div style={{ padding: '1rem' }}>
        <p>This is a basic modal with default content.</p>
        <p>You can put any content here - forms, images, text, etc.</p>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Basic Modal',
    size: 'medium',
  },
};

export const SmallModal: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div style={{ padding: '1rem' }}>
        <p>This is a small modal, perfect for quick confirmations or small forms.</p>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Small Modal',
    size: 'small',
  },
};

export const LargeModal: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div style={{ padding: '1rem' }}>
        <h3>Large Modal Content</h3>
        <p>This modal is larger and can accommodate more content.</p>
        <p>It's great for forms, detailed views, or complex interactions.</p>
        <div style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '1rem', 
          borderRadius: '6px',
          marginTop: '1rem'
        }}>
          <p>You can include various UI elements like:</p>
          <ul>
            <li>Forms and inputs</li>
            <li>Tables and data</li>
            <li>Images and media</li>
            <li>Complex layouts</li>
          </ul>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Large Modal',
    size: 'large',
  },
};

export const FullScreenModal: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div style={{ padding: '1rem' }}>
        <h3>Large Modal</h3>
        <p>This modal is very large and can accommodate extensive content.</p>
        <p>It's ideal for:</p>
        <ul>
          <li>Image galleries</li>
          <li>Video players</li>
          <li>Complex dashboards</li>
          <li>Full-page forms</li>
        </ul>
        <div style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '1rem', 
          borderRadius: '6px',
          marginTop: '1rem',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <p>Large content area</p>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Large Modal',
    size: 'large',
  },
};

export const NoTitle: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div style={{ padding: '1rem' }}>
        <p>This modal has no title, just content.</p>
        <p>Useful for image galleries or content-focused displays.</p>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'medium',
  },
};

export const NoCloseButton: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div style={{ padding: '1rem' }}>
        <p>This modal has no close button in the header.</p>
        <p>Users must click the overlay or use the ESC key to close it.</p>
        <Button 
          btnText="Close Modal" 
          type="secondary" 
          onClick={() => args.onClose?.()} 
        />
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'No Close Button',
    size: 'medium',
    showCloseButton: false,
  },
};

export const NoOverlayClose: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div style={{ padding: '1rem' }}>
        <p>This modal demonstrates custom close behavior.</p>
        <p>Users can use the close button or ESC key.</p>
        <Button 
          btnText="Close Modal" 
          type="primary" 
          onClick={() => args.onClose?.()} 
        />
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Custom Close Modal',
    size: 'medium',
  },
};

// Form Modal Example
export const FormModal: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div style={{ padding: '1rem' }}>
        <h3>Contact Form</h3>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Name
            </label>
            <input
              id="name"
              type="text"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px'
              }}
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px'
              }}
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px'
              }}
              placeholder="Enter your message"
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button 
              btnText="Cancel" 
              type="secondary" 
              onClick={() => args.onClose?.()} 
            />
            <Button 
              btnText="Submit" 
              type="primary" 
              onClick={() => console.log('Form submitted')} 
            />
          </div>
        </form>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Contact Form',
    size: 'medium',
  },
};

// Confirmation Modal Example
export const ConfirmationModal: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h3>Confirm Action</h3>
        <p>Are you sure you want to perform this action?</p>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          This action cannot be undone.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Button 
            btnText="Cancel" 
            type="secondary" 
            onClick={() => args.onClose?.()} 
          />
          <Button 
            btnText="Confirm" 
            type="primary" 
            onClick={() => {
              console.log('Action confirmed');
              args.onClose?.();
            }} 
          />
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    title: 'Confirm Action',
    size: 'small',
  },
};

// Image Gallery Modal Example
export const ImageGalleryModal: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div style={{ padding: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <img
            src="https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Gallery+Image"
            alt="Gallery image"
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: '8px'
            }}
          />
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>
            Beautiful landscape photography
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            <Button 
              btnText="Previous" 
              type="secondary" 
              onClick={() => console.log('Previous image')} 
            />
            <Button 
              btnText="Next" 
              type="secondary" 
              onClick={() => console.log('Next image')} 
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: 'large',
  },
};

// Modal Size Comparison
export const SizeComparison: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    
    return (
      <div style={{ padding: '2rem' }}>
        <h3>Modal Size Comparison</h3>
        <p>Click the buttons below to see different modal sizes:</p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button 
            btnText="Small Modal" 
            type="primary" 
            onClick={() => setOpenModal('small')} 
          />
          <Button 
            btnText="Medium Modal" 
            type="primary" 
            onClick={() => setOpenModal('medium')} 
          />
          <Button 
            btnText="Large Modal" 
            type="primary" 
            onClick={() => setOpenModal('large')} 
          />
          <Button 
            btnText="Extra Large Modal" 
            type="primary" 
            onClick={() => setOpenModal('large')} 
          />
        </div>
        
        {openModal && (
          <Modal
            isOpen={true}
            onClose={() => setOpenModal(null)}
            title={`${openModal.charAt(0).toUpperCase() + openModal.slice(1)} Modal`}
            size={openModal as any}
          >
            <div style={{ padding: '1rem' }}>
              <p>This is a <strong>{openModal}</strong> modal.</p>
              <p>Notice how the size affects the content area and overall appearance.</p>
            </div>
          </Modal>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive comparison of different modal sizes.',
      },
    },
  },
};
