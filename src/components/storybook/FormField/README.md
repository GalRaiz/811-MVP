# FormField Component with useFormField Hook

This document describes the improved FormField component and the new `useFormField` custom hook that provides robust form field management with validation.

## Overview

The new system consists of:
1. **`useFormField` Hook** - Manages field state, validation, and error handling
2. **Enhanced `FormField` Component** - Renders form inputs with integrated validation
3. **Predefined Validation Rules** - Common validation patterns ready to use

## useFormField Hook

### Basic Usage

```typescript
import { useFormField, validationRules } from '../../../hooks/useFormField';

const MyComponent = () => {
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
    initialValue: '',
    validationRules: [
      validationRules.required('This field is required'),
      validationRules.email('Please enter a valid email'),
    ],
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Use the hook's functions and state
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
    />
  );
};
```

### Hook Configuration

```typescript
type UseFormFieldConfig<T> = {
  initialValue: T;                    // Initial field value
  validationRules?: ValidationRule[]; // Array of validation rules
  validateOnChange?: boolean;         // Validate on every change (default: false)
  validateOnBlur?: boolean;           // Validate when field loses focus (default: false)
};
```

### Hook Return Values

```typescript
type UseFormFieldReturn<T> = {
  value: T;                    // Current field value
  setValue: (value: T) => void; // Function to update value
  error: string | null;        // Current error message
  isValid: boolean;            // Whether field passes all validations
  isDirty: boolean;            // Whether field has been modified
  validate: () => ValidationResult; // Run validation manually
  clearError: () => void;      // Clear current error
  reset: () => void;           // Reset to initial state
  setError: (error: string) => void; // Set custom error
  handleBlur: () => void;      // Handle blur event with validation
};
```

## Validation Rules

### Predefined Rules

```typescript
import { validationRules } from '../../../hooks/useFormField';

// Required field
validationRules.required('Custom message')

// Length validation
validationRules.minLength(5, 'Custom message')
validationRules.maxLength(50, 'Custom message')

// Email validation
validationRules.email('Custom message')

// Pattern validation (regex)
validationRules.pattern('^[A-Za-z]+$', 'Custom message')

// Custom validation
validationRules.custom(
  (value) => value > 18 || 'Must be 18 or older',
  'Custom message'
)
```

### Custom Validation Rules

```typescript
type ValidationRule = {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'pattern' | 'custom';
  value?: any;                    // Value for minLength, maxLength, pattern
  message?: string;               // Custom error message
  validator?: (value: any) => boolean | string; // Custom validator function
};

// Example custom rule
const customRule: ValidationRule = {
  type: 'custom',
  validator: (value: string) => {
    if (value.includes('admin')) {
      return 'Username cannot contain "admin"';
    }
    return true;
  },
  message: 'Invalid username'
};
```

## FormField Component

### Basic Props

```typescript
interface FormFieldProps {
  id: string;                    // Unique identifier
  label?: string;                // Field label
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'tel';
  value: string | number | boolean | string[];
  onChange: (value: any) => void;
  
  // Validation props
  validationRules?: ValidationRule[];
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  
  // Legacy error props (for backward compatibility)
  showError?: boolean;
  error?: string;
  
  // Other props...
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: FormFieldOption[]; // For select/radio fields
}
```

### Usage Examples

#### Simple Text Field with Validation

```typescript
<FormField
  id="email"
  label="Email Address"
  type="email"
  value={email}
  onChange={setEmail}
  required
  validationRules={[
    validationRules.required('Email is required'),
    validationRules.email('Please enter a valid email'),
  ]}
  validateOnChange={true}
  validateOnBlur={true}
/>
```

#### Password Field with Complex Validation

```typescript
<FormField
  id="password"
  label="Password"
  type="password"
  value={password}
  onChange={setPassword}
  required
  validationRules={[
    validationRules.required('Password is required'),
    validationRules.minLength(8, 'Password must be at least 8 characters'),
    validationRules.pattern(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)',
      'Password must contain lowercase, uppercase, and number'
    ),
  ]}
  validateOnChange={true}
  validateOnBlur={true}
/>
```

#### Custom Validation Field

```typescript
<FormField
  id="confirmPassword"
  label="Confirm Password"
  type="password"
  value={confirmPassword}
  onChange={setConfirmPassword}
  required
  validationRules={[
    validationRules.custom(
      (value) => value === password || 'Passwords do not match',
      'Passwords do not match'
    ),
  ]}
  validateOnChange={true}
  validateOnBlur={true}
/>
```

## Complete Form Example

See `FormFieldExample.tsx` for a complete working example that demonstrates:

- Multiple field types
- Various validation rules
- Form submission handling
- Error management
- Responsive design

## Migration from Old FormField

The new FormField component maintains backward compatibility. Existing code will continue to work, but you can now:

1. **Add validation rules** using the `validationRules` prop
2. **Enable real-time validation** with `validateOnChange` and `validateOnBlur`
3. **Use the hook directly** for more complex field management
4. **Leverage predefined validation rules** for common patterns

### Before (Old Way)

```typescript
<FormField
  id="email"
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  required
  showError={!!emailError}
  error={emailError}
/>
```

### After (New Way)

```typescript
<FormField
  id="email"
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  required
  validationRules={[
    validationRules.required('Email is required'),
    validationRules.email('Please enter a valid email'),
  ]}
  validateOnChange={true}
  validateOnBlur={true}
/>
```

## Best Practices

1. **Use `validateOnBlur`** for most fields to avoid validation spam
2. **Use `validateOnChange`** sparingly, only for fields where immediate feedback is crucial
3. **Combine multiple validation rules** for comprehensive field validation
4. **Use custom validation** for business logic that can't be expressed with predefined rules
5. **Handle form-level validation** in addition to field-level validation
6. **Provide clear, actionable error messages** that help users fix issues

## TypeScript Support

The entire system is fully typed with TypeScript:

- Generic types for field values
- Strict validation rule types
- Comprehensive prop interfaces
- Type-safe validation functions

This ensures compile-time safety and excellent IDE support.
