import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { Icons } from '../icons/EmojiIcons';
import Footer from '../NavBar/Footer';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states.',
      },
    },
  },
  argTypes: {
    btnText: {
      control: 'text',
      description: 'The text content of the button',
    },
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'transparent-on-light', 'transparent-on-dark', 'icon-only'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width of its container',
    },
    icon: {
      control: 'text',
      description: 'Icon to display (can be text like "→" or icon component)',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the icon relative to the text',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Button Stories
export const Primary: Story = {
  args: {
    btnText: 'Primary Button',
    type: 'primary',
    size: 'medium',
  },
};

export const PrimaryFullWidth: Story = {
  args: {
    btnText: 'Full Width Primary',
    type: 'primary',
    size: 'large',
    fullWidth: true,
  },
};

// Secondary Button Stories
export const SecondaryWithIcon: Story = {
  args: {
    btnText: 'Secondary Button with Icon',
    type: 'secondary',
    size: 'medium',
    icon: Icons.greenHeart,
    iconPosition: 'right',
  },
};

// Transparent Button Stories
export const TransparentOnLight: Story = {
  args: {
    btnText: 'Transparent on Light',
    type: 'transparent-on-light',
    size: 'medium',
  },
};

export const TransparentOnDark: Story = {
  args: {
    btnText: 'Transparent on Dark- please change div\'s background color to something dark in Elements tab',
    icon: Icons.home,
    type: 'transparent-on-dark',
    size: 'medium',
  },
};

export const DisabledSecondary: Story = {
  args: {
    btnText: 'Disabled Secondary',
    type: 'secondary',
    size: 'medium',
    isDisabled: true,
  },
};

// Interactive Examples
export const Interactive: Story = {
  args: {
    btnText: 'Click Me!',
    type: 'primary',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'This button has an onClick handler that will log to the Actions panel.',
      },
    },
  },
};

// Button Grid for Comparison
export const ButtonGrid: Story = {
  render: () => (<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ 
      display: 'flex', 
      flexFlow: 'row wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '24px',
      gap: '24px',
    }}>
      <Button btnText="Primary Full Width" type="primary" size="large" fullWidth id='primary-large-fullWidth'/>

      <Button btnText="Primary Small" type="primary" size="small" id='primary-small'/>
      <Button btnText="Primary Medium" type="primary" size="medium" id='primary-medium'/>
      <Button btnText="Primary Large" type="primary" size="large" id='primary-large'/>
      
      <Button btnText="Secondary Small" type="secondary" size="small" id='secondary-small'/>
      <Button btnText="Secondary Medium" type="secondary" size="medium" id='secondary-medium'/>
      <Button btnText="Secondary Large" type="secondary" size="large" id='secondary-large'/>
      
      <Button btnText="Transparent Small" type="transparent-on-light" size="small" id='transparent-small'/>
      <Button btnText="Transparent Medium" type="transparent-on-light" size="medium" id='transparent-medium'/>
      <Button btnText="Transparent Large" type="transparent-on-light" size="large" id='transparent-large'/>
      
      <Button type="icon-only" size="small" icon={Icons.close} id='icon-only-small'/>
      <Button type="icon-only" size="medium" icon="→" id='icon-only-medium'/>
      <Button type="icon-only" size="large" icon={Icons.heart} id='icon-only-large' /> 
      
    </div>
    <Footer 
    progress={{current: 1, total: 10}}
    buttons={[
      {
        id: 'previousPage',
        type: 'secondary',
        size: 'small',
        btnText: 'Previous Page',
      },
      {
        id: 'nextPage',
        type: 'secondary',
        size: 'small',
        btnText: 'Next Page',
      }]} />

    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A grid showing all button variants and sizes for easy comparison.',
      },
    },
  },
};
