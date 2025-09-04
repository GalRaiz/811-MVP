import type { Meta, StoryObj } from '@storybook/react';
import FormField from './FormField';
import { validationRules } from '../../../hooks/useFormField';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive form field component with validation support and multiple input types.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the field',
    },
    label: {
      control: 'text',
      description: 'Label text for the field',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'tel', 'number', 'textarea', 'select', 'multi-select', 'date', 'checkbox', 'radio', 'password'],
      description: 'The type of input field',
    },
    value: {
      control: 'text',
      description: 'Current value of the field',
    },
    onChange: {
      action: 'changed',
      description: 'Function called when field value changes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the field',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    validationRules: {
      control: 'object',
      description: 'Array of validation rules for the field',
    },
    validateOnChange: {
      control: 'boolean',
      description: 'Whether to validate on every change',
    },
    validateOnBlur: {
      control: 'boolean',
      description: 'Whether to validate when field loses focus',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    showError: {
      control: 'boolean',
      description: 'Whether to show the error message',
    },
    options: {
      control: 'object',
      description: 'Options for select, radio, and multi-select fields',
    },
    hasDropdown: {
      control: 'boolean',
      description: 'Whether to use custom dropdown for select fields',
    },
    showClear: {
      control: 'boolean',
      description: 'Whether to show clear button',
    },
    icon: {
      control: 'text',
      description: 'Icon to display in the field',
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

// Basic Input Stories
export const TextInput: Story = {
  args: {
    id: 'text-field',
    label: 'Text Input',
    type: 'text',
    value: '',
    placeholder: 'Enter some text...',
    onChange: (value) => console.log('Text changed:', value),
  },
};

export const EmailInput: Story = {
  args: {
    id: 'email-field',
    label: 'Email Address',
    type: 'email',
    value: '',
    placeholder: 'Enter your email...',
    required: true,
    validationRules: [
      validationRules.required('Email is required'),
      validationRules.email('Please enter a valid email'),
    ],
    validateOnBlur: true,
    onChange: (value) => console.log('Email changed:', value),
  },
};

export const PasswordInput: Story = {
  args: {
    id: 'password-field',
    label: 'Password',
    type: 'password',
    value: '',
    placeholder: 'Enter your password...',
    required: true,
    validationRules: [
      validationRules.required('Password is required'),
      validationRules.minLength(8, 'Password must be at least 8 characters'),
    ],
    validateOnBlur: true,
    onChange: (value) => console.log('Password changed:', value),
  },
};

export const NumberInput: Story = {
  args: {
    id: 'number-field',
    label: 'Age',
    type: 'number',
    value: 25,
    min: 0,
    max: 120,
    step: 1,
    onChange: (value) => console.log('Age changed:', value),
  },
};

export const TelInput: Story = {
  args: {
    id: 'tel-field',
    label: 'Phone Number',
    type: 'tel',
    value: '',
    placeholder: 'Enter your phone number...',
    onChange: (value) => console.log('Phone changed:', value),
  },
};

export const DateInput: Story = {
  args: {
    id: 'date-field',
    label: 'Birth Date',
    type: 'date',
    value: '',
    onChange: (value) => console.log('Date changed:', value),
  },
};

// Textarea Stories
export const Textarea: Story = {
  args: {
    id: 'textarea-field',
    label: 'Description',
    type: 'textarea',
    value: '',
    placeholder: 'Enter a description...',
    rows: 4,
    onChange: (value) => console.log('Description changed:', value),
  },
};

export const TextareaWithValidation: Story = {
  args: {
    id: 'textarea-validated',
    label: 'Bio (with validation)',
    type: 'textarea',
    value: '',
    placeholder: 'Tell us about yourself...',
    required: true,
    rows: 3,
    validationRules: [
      validationRules.required('Bio is required'),
      validationRules.minLength(10, 'Bio must be at least 10 characters'),
      validationRules.maxLength(500, 'Bio cannot exceed 500 characters'),
    ],
    validateOnBlur: true,
    onChange: (value) => console.log('Bio changed:', value),
  },
};

// Select Stories
export const Select: Story = {
  args: {
    id: 'select-field',
    label: 'Country',
    type: 'select',
    value: '',
    placeholder: 'Select a country...',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'au', label: 'Australia' },
      { value: 'de', label: 'Germany' },
    ],
    onChange: (value) => console.log('Country selected:', value),
  },
};

export const SelectWithCustomDropdown: Story = {
  args: {
    id: 'select-custom',
    label: 'Custom Dropdown',
    type: 'select',
    value: '',
    placeholder: 'Choose an option...',
    hasDropdown: true,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    onChange: (value) => console.log('Option selected:', value),
  },
};

export const MultiSelect: Story = {
  args: {
    id: 'multi-select-field',
    label: 'Interests',
    type: 'multi-select',
    value: [],
    placeholder: 'Select your interests...',
    options: [
      { value: 'sports', label: 'Sports' },
      { value: 'music', label: 'Music' },
      { value: 'reading', label: 'Reading' },
      { value: 'travel', label: 'Travel' },
      { value: 'cooking', label: 'Cooking' },
    ],
    onChange: (value) => console.log('Interests changed:', value),
  },
};

// Checkbox and Radio Stories
export const Checkbox: Story = {
  args: {
    id: 'checkbox-field',
    label: 'Terms and Conditions',
    type: 'checkbox',
    value: false,
    onChange: (value) => console.log('Checkbox changed:', value),
  },
};

export const RadioGroup: Story = {
  args: {
    id: 'radio-field',
    label: 'Gender',
    type: 'radio',
    value: '',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
      { value: 'prefer-not-to-say', label: 'Prefer not to say' },
    ],
    onChange: (value) => console.log('Gender selected:', value),
  },
};

// Validation Examples
export const WithValidation: Story = {
  args: {
    id: 'validated-field',
    label: 'Username (with validation)',
    type: 'text',
    value: '',
    placeholder: 'Enter username...',
    required: true,
    validationRules: [
      validationRules.required('Username is required'),
      validationRules.minLength(3, 'Username must be at least 3 characters'),
      validationRules.pattern('^[a-zA-Z0-9_]+$', 'Username can only contain letters, numbers, and underscores'),
    ],
    validateOnChange: true,
    validateOnBlur: true,
    onChange: (value) => console.log('Username changed:', value),
  },
};

export const WithCustomValidation: Story = {
  args: {
    id: 'custom-validated',
    label: 'Custom Field',
    type: 'text',
    value: '',
    placeholder: 'Enter value...',
    validationRules: [
      validationRules.custom(
        (value) => value !== 'admin' || 'Username cannot be "admin"',
        'Invalid username'
      ),
    ],
    validateOnBlur: true,
    onChange: (value) => console.log('Value changed:', value),
  },
};

// Error States
export const WithError: Story = {
  args: {
    id: 'error-field',
    label: 'Field with Error',
    type: 'text',
    value: 'invalid value',
    error: 'This field has an error message',
    showError: true,
    onChange: (value) => console.log('Value changed:', value),
  },
};

// Disabled States
export const Disabled: Story = {
  args: {
    id: 'disabled-field',
    label: 'Disabled Field',
    type: 'text',
    value: 'Cannot edit this',
    disabled: true,
    onChange: (value) => console.log('Value changed:', value),
  },
};

// With Icon
export const WithIcon: Story = {
  args: {
    id: 'icon-field',
    label: 'Search',
    type: 'text',
    value: '',
    placeholder: 'Search...',
    icon: '🔍',
    onChange: (value) => console.log('Search changed:', value),
  },
};

// Field Comparison Grid
export const FieldComparison: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '2rem',
      padding: '2rem',
      maxWidth: '1200px'
    }}>
      <FormField
        id="text-example"
        label="Text Input"
        type="text"
        value=""
        placeholder="Enter text..."
        onChange={(value) => console.log('Text:', value)}
      />
      
      <FormField
        id="email-example"
        label="Email"
        type="email"
        value=""
        placeholder="Enter email..."
        required
        onChange={(value) => console.log('Email:', value)}
      />
      
      <FormField
        id="select-example"
        label="Select Option"
        type="select"
        value=""
        placeholder="Choose..."
        options={[
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
        ]}
        onChange={(value) => console.log('Select:', value)}
      />
      
      <FormField
        id="textarea-example"
        label="Description"
        type="textarea"
        value=""
        placeholder="Enter description..."
        rows={3}
        onChange={(value) => console.log('Textarea:', value)}
      />
      
      <FormField
        id="checkbox-example"
        label="Agree to terms"
        type="checkbox"
        value={false}
        onChange={(value) => console.log('Checkbox:', value)}
      />
      
      <FormField
        id="radio-example"
        label="Choose one"
        type="radio"
        value=""
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
        onChange={(value) => console.log('Radio:', value)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A grid showing various field types for easy comparison.',
      },
    },
  },
};
