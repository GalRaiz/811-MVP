import React, { useState } from 'react';
import FormField from './FormField';
import { validationRules } from '../../../hooks/useFormField';
import Button from '../Button/Button';
import './FormField.scss';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  age: number;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  phone?: string;
  age?: string;
}

const FormFieldExample: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    age: 18,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom validation function for password confirmation
  const validatePasswordMatch = (value: string) => {
    return value === formData.password || 'Passwords do not match';
  };

  // Custom validation function for age
  const validateAge = (value: number) => {
    if (value < 13) return 'You must be at least 13 years old';
    if (value > 120) return 'Please enter a valid age';
    return true;
  };

  const handleFieldChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters long';
    }

    // Phone validation
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Age validation
    if (formData.age < 13) {
      newErrors.age = 'You must be at least 13 years old';
    } else if (formData.age > 120) {
      newErrors.age = 'Please enter a valid age';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted successfully:', formData);
        alert('Form submitted successfully!');
        
        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          phone: '',
          age: 18,
        });
        setErrors({});
      } catch (error) {
        console.error('Form submission failed:', error);
        alert('Form submission failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  const handleReset = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      age: 18,
    });
    setErrors({});
  };

  return (
    <div className="form-example">
      <h2>Form Field Example with Validation</h2>
      <p>This example demonstrates the improved FormField component with the useFormField hook and multiple validation rules.</p>
      
      <form onSubmit={handleSubmit} className="form-example__form">
        {/* Email field with multiple validation rules */}
        <FormField
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => handleFieldChange('email', value)}
          placeholder="Enter your email address"
          required
          validationRules={[
            validationRules.email('Please enter a valid email address'),
            validationRules.minLength(5, 'Email must be at least 5 characters'),
          ]}
          validateOnChange={true}
          validateOnBlur={true}
          error={errors.email}
          showError={!!errors.email}
        />

        {/* Password field with complex validation */}
        <FormField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => handleFieldChange('password', value)}
          placeholder="Enter your password"
          required
          validationRules={[
            validationRules.minLength(8, 'Password must be at least 8 characters'),
            validationRules.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)',
              'Password must contain lowercase, uppercase, and number'
            ),
          ]}
          validateOnChange={true}
          validateOnBlur={true}
          error={errors.password}
          showError={!!errors.password}
        />

        {/* Confirm Password field with custom validation */}
        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => handleFieldChange('confirmPassword', value)}
          placeholder="Confirm your password"
          required
          validationRules={[
            validationRules.custom(
              validatePasswordMatch,
              'Passwords do not match'
            ),
          ]}
          validateOnChange={true}
          validateOnBlur={true}
          error={errors.confirmPassword}
          showError={!!errors.confirmPassword}
        />

        {/* Full Name field with basic validation */}
        <FormField
          id="fullName"
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={(value) => handleFieldChange('fullName', value)}
          placeholder="Enter your full name"
          required
          validationRules={[
            validationRules.minLength(2, 'Name must be at least 2 characters'),
            validationRules.maxLength(50, 'Name cannot exceed 50 characters'),
          ]}
          validateOnChange={false}
          validateOnBlur={true}
          error={errors.fullName}
          showError={!!errors.fullName}
        />

        {/* Phone field with pattern validation */}
        <FormField
          id="phone"
          label="Phone Number (Optional)"
          type="tel"
          value={formData.phone}
          onChange={(value) => handleFieldChange('phone', value)}
          placeholder="Enter your phone number"
          validationRules={[
            validationRules.pattern(
              '^[\\+]?[1-9][\\d]{0,15}$',
              'Please enter a valid phone number'
            ),
          ]}
          validateOnChange={false}
          validateOnBlur={true}
          error={errors.phone}
          showError={!!errors.phone}
        />

        {/* Age field with custom validation */}
        <FormField
          id="age"
          label="Age"
          type="number"
          value={formData.age}
          onChange={(value) => handleFieldChange('age', value)}
          min={13}
          max={120}
          step={1}
          required
          validationRules={[
            validationRules.custom(validateAge, 'Please enter a valid age'),
          ]}
          validateOnChange={false}
          validateOnBlur={true}
          error={errors.age}
          showError={!!errors.age}
        />

        {/* Form Actions */}
        <div className="form-example__actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="form-example__submit-btn"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>
          
          <Button
            type="secondary"
            size="large"
            btnText="Reset Form"
            onClick={handleReset}
            isDisabled={isSubmitting}
            fullWidth
          />
        </div>
      </form>

      {/* Form Data Display */}
      <div className="form-example__data">
        <h3>Current Form Data:</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        
        <h3>Validation Errors:</h3>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      </div>
    </div>
  );
};

export default FormFieldExample;
