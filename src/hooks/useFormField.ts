import { useState, useCallback, useMemo } from 'react';

// Validation rule types
export type ValidationRule = {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'pattern' | 'custom';
  value?: any;
  message?: string;
  validator?: (value: any) => boolean | string;
};

// Validation result type
export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

// Hook return type
export type UseFormFieldReturn<T> = {
  value: T;
  setValue: (value: T) => void;
  error: string | null;
  isValid: boolean;
  isDirty: boolean;
  validate: () => ValidationResult;
  clearError: () => void;
  reset: () => void;
  setError: (error: string) => void;
  handleBlur: () => void;
};

// Hook configuration type
export type UseFormFieldConfig<T> = {
  initialValue: T;
  validationRules?: ValidationRule[];
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
};

export function useFormField<T>({
  initialValue,
  validationRules = [],
  validateOnChange = false,
  validateOnBlur = false,
}: UseFormFieldConfig<T>): UseFormFieldReturn<T> {
  const [value, setValueState] = useState<T>(initialValue);
  const [error, setErrorState] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [initialValueRef] = useState(initialValue);

  // Set value and optionally validate
  const setValue = useCallback((newValue: T) => {
    setValueState(newValue);
    setIsDirty(true);
    
    if (validateOnChange) {
      const result = validateValue(newValue, validationRules);
      setErrorState(result.errors[0] || null);
    }
  }, [validateOnChange, validationRules]);

  // Clear error
  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  // Set custom error
  const setError = useCallback((errorMessage: string) => {
    setErrorState(errorMessage);
  }, []);

  // Reset to initial state
  const reset = useCallback(() => {
    setValueState(initialValueRef);
    setErrorState(null);
    setIsDirty(false);
  }, [initialValueRef]);

  // Validate value against all rules
  const validateValue = useCallback((valueToValidate: T, rules: ValidationRule[]): ValidationResult => {
    const errors: string[] = [];

    for (const rule of rules) {
      let isValid = true;
      let errorMessage = rule.message;

      switch (rule.type) {
        case 'required':
          isValid = valueToValidate !== null && valueToValidate !== undefined && 
                   (typeof valueToValidate === 'string' ? valueToValidate.trim() !== '' : true) &&
                   (Array.isArray(valueToValidate) ? valueToValidate.length > 0 : true);
          errorMessage = errorMessage || 'This field is required';
          break;

        case 'minLength':
          if (typeof valueToValidate === 'string' || Array.isArray(valueToValidate)) {
            isValid = valueToValidate.length >= (rule.value || 0);
            errorMessage = errorMessage || `Minimum length is ${rule.value}`;
          }
          break;

        case 'maxLength':
          if (typeof valueToValidate === 'string' || Array.isArray(valueToValidate)) {
            isValid = valueToValidate.length <= (rule.value || 0);
            errorMessage = errorMessage || `Maximum length is ${rule.value}`;
          }
          break;

        case 'email':
          if (typeof valueToValidate === 'string') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(valueToValidate);
            errorMessage = errorMessage || 'Please enter a valid email address';
          }
          break;

        case 'pattern':
          if (typeof valueToValidate === 'string' && rule.value) {
            const regex = new RegExp(rule.value);
            isValid = regex.test(valueToValidate);
            errorMessage = errorMessage || 'Please match the required pattern';
          }
          break;

        case 'custom':
          if (rule.validator) {
            const result = rule.validator(valueToValidate);
            if (typeof result === 'string') {
              isValid = false;
              errorMessage = result;
            } else {
              isValid = result;
              errorMessage = errorMessage || 'Validation failed';
            }
          }
          break;
      }

      if (!isValid && errorMessage) {
        errors.push(errorMessage);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);

  // Main validate function
  const validate = useCallback((): ValidationResult => {
    const result = validateValue(value, validationRules);
    setErrorState(result.errors[0] || null);
    return result;
  }, [value, validationRules, validateValue]);

  // Validate on blur if configured
  const handleBlur = useCallback(() => {
    if (validateOnBlur) {
      validate();
    }
  }, [validateOnBlur, validate]);

  // Computed isValid state
  const isValid = useMemo(() => {
    if (error) return false;
    const result = validateValue(value, validationRules);
    return result.isValid;
  }, [value, error, validationRules, validateValue]);

  return {
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
  };
}

// Predefined validation rules for common use cases
export const validationRules = {
  required: (message?: string): ValidationRule => ({
    type: 'required',
    message: message || 'This field is required',
  }),
  
  minLength: (length: number, message?: string): ValidationRule => ({
    type: 'minLength',
    value: length,
    message: message || `Minimum length is ${length}`,
  }),
  
  maxLength: (length: number, message?: string): ValidationRule => ({
    type: 'maxLength',
    value: length,
    message: message || `Maximum length is ${length}`,
  }),
  
  email: (message?: string): ValidationRule => ({
    type: 'email',
    message: message || 'Please enter a valid email address',
  }),
  
  pattern: (regex: string, message?: string): ValidationRule => ({
    type: 'pattern',
    value: regex,
    message: message || 'Please match the required pattern',
  }),
  
  custom: (validator: (value: any) => boolean | string, message?: string): ValidationRule => ({
    type: 'custom',
    validator,
    message: message || 'Validation failed',
  }),
};
