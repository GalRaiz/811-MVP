import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useFormField, validationRules } from './useFormField';
import Button from '../components/storybook/Button/Button';

const meta: Meta<typeof useFormField> = {
  title: 'Hooks/useFormField',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A custom React hook for managing form field state, validation, and error handling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Hook Demo Component
const FormFieldDemo = ({ 
  initialValue = '', 
  validationRules: rules = [],
  validateOnChange = false,
  validateOnBlur = true 
}: any) => {
  const {
    value,
    setValue,
    error,
    isValid,
    isDirty,
    validate,
    clearError,
    reset,
    setError,
    handleBlur,
  } = useFormField({
    initialValue,
    validationRules: rules,
    validateOnChange,
    validateOnBlur,
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <h3>useFormField Hook Demo</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="demo-field" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Field Label
        </label>
        <input
          id="demo-field"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1rem'
          }}
          placeholder="Type something..."
        />
        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {error}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4>Hook State:</h4>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          <p>Value: <strong>{value || '(empty)'}</strong></p>
          <p>Is Valid: <strong>{isValid ? 'Yes' : 'No'}</strong></p>
          <p>Is Dirty: <strong>{isDirty ? 'Yes' : 'No'}</strong></p>
          <p>Error: <strong>{error || 'None'}</strong></p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button 
          btnText="Validate" 
          type="primary" 
          size="small"
          onClick={validate} 
        />
        <Button 
          btnText="Clear Error" 
          type="secondary" 
          size="small"
          onClick={clearError} 
        />
        <Button 
          btnText="Reset" 
          type="secondary" 
          size="small"
          onClick={reset} 
        />
        <Button 
          btnText="Set Custom Error" 
          type="secondary" 
          size="small"
          onClick={() => setError('This is a custom error message')} 
        />
      </div>
    </div>
  );
};

// Basic Usage Story
export const BasicUsage: Story = {
  render: () => <FormFieldDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the useFormField hook with no validation rules.',
      },
    },
  },
};

// Required Field Story
export const RequiredField: Story = {
  render: () => (
    <FormFieldDemo 
      validationRules={[validationRules.required('This field is required')]}
      validateOnBlur={true}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'A required field that validates on blur.',
      },
    },
  },
};

// Email Validation Story
export const EmailValidation: Story = {
  render: () => (
    <FormFieldDemo 
      validationRules={[
        validationRules.required('Email is required'),
        validationRules.email('Please enter a valid email address')
      ]}
      validateOnBlur={true}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Email field with required and email format validation.',
      },
    },
  },
};

// Complex Validation Story
export const ComplexValidation: Story = {
  render: () => (
    <FormFieldDemo 
      validationRules={[
        validationRules.required('Username is required'),
        validationRules.minLength(3, 'Username must be at least 3 characters'),
        validationRules.maxLength(20, 'Username cannot exceed 20 characters'),
        validationRules.pattern('^[a-zA-Z0-9_]+$', 'Username can only contain letters, numbers, and underscores'),
        validationRules.custom(
          (value) => value !== 'admin' || 'Username cannot be "admin"',
          'Invalid username'
        )
      ]}
      validateOnChange={true}
      validateOnBlur={true}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Username field with multiple validation rules including custom validation.',
      },
    },
  },
};

// Password Validation Story
export const PasswordValidation: Story = {
  render: () => (
    <FormFieldDemo 
      validationRules={[
        validationRules.required('Password is required'),
        validationRules.minLength(8, 'Password must be at least 8 characters'),
        validationRules.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)',
          'Password must contain lowercase, uppercase, and number'
        )
      ]}
      validateOnChange={false}
      validateOnBlur={true}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Password field with strength requirements validation.',
      },
    },
  },
};

// Real-time Validation Story
export const RealTimeValidation: Story = {
  render: () => (
    <FormFieldDemo 
      validationRules={[
        validationRules.required('This field is required'),
        validationRules.minLength(5, 'Must be at least 5 characters')
      ]}
      validateOnChange={true}
      validateOnBlur={true}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Field with real-time validation on every change and blur.',
      },
    },
  },
};

// Multiple Fields Demo
export const MultipleFields: Story = {
  render: () => {
    const [formData] = useState({
      name: '',
      email: '',
      age: ''
    });

    const nameField = useFormField({
      initialValue: formData.name,
      validationRules: [
        validationRules.required('Name is required'),
        validationRules.minLength(2, 'Name must be at least 2 characters')
      ],
      validateOnBlur: true
    });

    const emailField = useFormField({
      initialValue: formData.email,
      validationRules: [
        validationRules.required('Email is required'),
        validationRules.email('Please enter a valid email')
      ],
      validateOnBlur: true
    });

    const ageField = useFormField({
      initialValue: formData.age,
      validationRules: [
        validationRules.custom(
          (value) => !value || (Number(value) >= 13 && Number(value) <= 120),
          'Age must be between 13 and 120'
        )
      ],
      validateOnBlur: true
    });

    const handleSubmit = () => {
      const nameValid = nameField.validate();
      const emailValid = emailField.validate();
      const ageValid = ageField.validate();

      if (nameValid.isValid && emailValid.isValid && ageValid.isValid) {
        console.log('Form is valid!', {
          name: nameField.value,
          email: emailField.value,
          age: ageField.value
        });
      } else {
        console.log('Form has validation errors');
      }
    };

    const isFormValid = nameField.isValid && emailField.isValid && ageField.isValid;

    return (
      <div style={{ padding: '2rem', maxWidth: '600px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <h3>Multiple Fields with useFormField</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Name *
            </label>
            <input
              id="name"
              type="text"
              value={nameField.value}
              onChange={(e) => nameField.setValue(e.target.value)}
              onBlur={nameField.handleBlur}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: nameField.error ? '1px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '6px'
              }}
              placeholder="Enter your name"
            />
            {nameField.error && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                {nameField.error}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={emailField.value}
              onChange={(e) => emailField.setValue(e.target.value)}
              onBlur={emailField.handleBlur}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: emailField.error ? '1px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '6px'
              }}
              placeholder="Enter your email"
            />
            {emailField.error && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                {emailField.error}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="age" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Age (Optional)
            </label>
            <input
              id="age"
              type="number"
              value={ageField.value}
              onChange={(e) => ageField.setValue(e.target.value)}
              onBlur={ageField.handleBlur}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: ageField.error ? '1px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '6px'
              }}
              placeholder="Enter your age"
            />
            {ageField.error && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                {ageField.error}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button 
              btnText="Submit Form" 
              type="primary" 
              onClick={handleSubmit}
              isDisabled={!isFormValid}
            />
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Form Valid: <strong>{isFormValid ? 'Yes' : 'No'}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple form fields using the useFormField hook with form-level validation.',
      },
    },
  },
};
