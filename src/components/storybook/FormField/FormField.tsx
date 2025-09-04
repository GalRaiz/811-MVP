import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button';
import { useFormField, ValidationRule } from '../../../hooks/useFormField';
import './FormField.scss';

export interface FormFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormFieldProps {
  id: string;
  label?: string;
  placeholder?: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'number'
    | 'textarea'
    | 'select'
    | 'multi-select'
    | 'date'
    | 'checkbox'
    | 'radio'
    | 'password';
  value: string | number | boolean | string[];
  onChange: (value: string | number | boolean | string[]) => void;
  options?: FormFieldOption[];
  hasDropdown?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  cols?: number;
  showClear?: boolean | (() => void);
  icon?: React.ReactNode;
  validationRules?: ValidationRule[];
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
  options = [],
  hasDropdown = false,
  disabled = false,
  required = false,
  className = '',
  name,
  min,
  max,
  step,
  rows = 3,
  cols,
  showClear = true,
  icon,
  // New validation props
  validationRules = [],
  validateOnChange = false,
  validateOnBlur = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array.isArray(value) ? value : []
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use the custom hook for form field management
  const {
    error: hookError,
    validate,
    clearError,
    handleBlur,
  } = useFormField({
    initialValue: value,
    validationRules: required ? [...validationRules, { type: 'required' }] : validationRules,
    validateOnChange,
    validateOnBlur,
  });

  // Determine which error to show (hook error takes precedence)
  const displayError = hookError;
  const showErrorState = !!displayError;

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Update selected options when value changes
  useEffect(() => {
    if (type === 'multi-select' && Array.isArray(value)) {
      setSelectedOptions(value);
    }
  }, [value, type, id, selectedOptions]);

  const handleInputChange = (newValue: string | number | boolean) => {
    if (!disabled) {
      onChange(newValue);
      // Clear error when user starts typing
      if (hookError) {
        clearError();
      }
    }
  };

  const handleMultiSelectChange = (optionValue: string) => {
    if (!disabled) {
      const newSelectedOptions = selectedOptions.includes(optionValue)
        ? selectedOptions.filter(opt => opt !== optionValue)
        : [...selectedOptions, optionValue];

      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions);
      // Clear error when user makes a selection
      if (hookError) {
        clearError();
      }
    }
  };

  const handleSelectChange = (optionValue: string) => {
    if (!disabled) {
      onChange(optionValue);
      setIsDropdownOpen(false);
      // Clear error when user makes a selection
      if (hookError) {
        clearError();
      }
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleClear = () => {
    if (!disabled) {
      if (type === 'multi-select') {
        onChange([]);
      } else if (type === 'checkbox') {
        onChange(false);
      } else if (type === 'radio') {
        onChange('');
      } else {
        onChange('');
      }
      // Clear error when field is cleared
      if (hookError) {
        clearError();
      }
    }
  };

  // Determine if clear button should be shown
  const shouldShowClear = (() => {
    // If showClear is a function, always show the button
    if (typeof showClear === 'function') {
      return true;
    }

    // If showClear is false, don't show the button
    if (showClear === false) {
      return false;
    }

    // Default behavior: show clear button when there's content
    return (
      (!disabled &&
        (type === 'text' ||
          type === 'tel' ||
          type === 'password' ||
          type === 'number' ||
          type === 'textarea') &&
        String(value).trim() !== '') ||
      (type === 'select' && String(value).trim() !== '') ||
      (type === 'multi-select' && Array.isArray(value) && value.length > 0)
    );
  })();

  // Handle clear button click
  const handleClearClick = () => {
    if (typeof showClear === 'function') {
      // If showClear is a function (like handleClearAll), call it
      showClear();
    } else {
      // Otherwise, clear just this field
      handleClear();
    }
  };

  // Enhanced input change handler with validation
  const handleInputChangeWithValidation = (newValue: string | number | boolean) => {
    handleInputChange(newValue);
    // Trigger validation if configured
    if (validateOnChange) {
      // Small delay to avoid validation on every keystroke
      setTimeout(() => {
        validate();
      }, 300);
    }
  };

  const renderInput = () => {
    const baseInputProps = {
      id,
      name: name || id,
      disabled,
      required,
      className: 'form-field__input',
      onBlur: handleBlur,
    };

    switch (type) {
      case 'text':
      case 'tel':
      case 'password':
        return (
          <div className="form-field__input-container">
            {icon && <div className="form-field__icon">{icon}</div>}
            <input
              {...baseInputProps}
              type={type}
              value={value as string}
              placeholder={placeholder}
              onChange={e => handleInputChangeWithValidation(e.target.value)}
            />
            {shouldShowClear && (
              <Button
                type="icon-only"
                size="small"
                icon="×"
                onClick={handleClearClick}
                isDisabled={disabled}
                id="clear"
              />
            )}
          </div>
        );

      case 'number':
        return (
          <div className="form-field__input-container">
            {icon && <div className="form-field__icon">{icon}</div>}
            <input
              {...baseInputProps}
              type="number"
              value={value as number}
              placeholder={placeholder}
              min={min}
              max={max}
              step={step}
              onChange={e => handleInputChangeWithValidation(Number(e.target.value))}
            />
            {shouldShowClear && (
              <Button
                type="icon-only"
                size="small"
                icon="×"
                id="clear"
                onClick={handleClearClick}
                isDisabled={disabled}
              />
            )}
          </div>
        );

      case 'textarea':
        return (
          <div className="form-field__input-container">
            {icon && <div className="form-field__icon">{icon}</div>}
            <textarea
              {...baseInputProps}
              value={value as string}
              placeholder={placeholder}
              rows={rows}
              cols={cols}
              onChange={e => handleInputChangeWithValidation(e.target.value)}
            />
            {shouldShowClear && (
              <Button
                type="icon-only"
                size="small"
                icon="×"
                id="clear"
                onClick={handleClearClick}
                isDisabled={disabled}
              />
            )}
          </div>
        );

      case 'date':
        return (
          <div className="form-field__input-container">
            {icon && <div className="form-field__icon">{icon}</div>}
            <input
              {...baseInputProps}
              type="date"
              value={value as string}
              onChange={e => handleInputChangeWithValidation(e.target.value)}
            />
            {shouldShowClear && (
              <Button
                type="icon-only"
                size="small"
                icon="×"
                id="clear"
                onClick={handleClearClick}
                isDisabled={disabled}
              />
            )}
          </div>
        );

      case 'checkbox':
        return (
          <input
            {...baseInputProps}
            type="checkbox"
            checked={value as boolean}
            onChange={e => handleInputChangeWithValidation(e.target.checked)}
          />
        );

      case 'radio':
        return (
          <div className="form-field__radio-group">
            {options.map(option => (
              <label key={option.value} className="form-field__radio-option">
                <input
                  type="radio"
                  name={name || id}
                  value={option.value}
                  checked={value === option.value}
                  disabled={disabled || option.disabled}
                  onChange={e => handleInputChangeWithValidation(e.target.value)}
                  className="form-field__radio-input"
                />
                <span className="form-field__radio-label">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'select':
        if (hasDropdown) {
          return (
            <div className="form-field__input-container">
              <div className="form-field__dropdown" ref={dropdownRef}>
                <Button
                  type="secondary"
                  size="medium"
                  btnText={
                    options.find(opt => opt.value === value)?.label ||
                    placeholder ||
                    'בחר אפשרות'
                  }
                  id="dropdown"
                  onClick={toggleDropdown}
                  isDisabled={disabled}
                  icon="▼"
                  iconPosition="right"
                  fullWidth
                />
                {isDropdownOpen && (
                  <div className="form-field__dropdown-menu">
                    {options.map(option => (
                      <Button
                        key={option.value}
                        type={
                          value === option.value
                            ? 'primary'
                            : 'transparent-on-light'
                        }
                        size="small"
                        btnText={option.label}
                        id="dropdown"
                        onClick={() => handleSelectChange(option.value)}
                        isDisabled={option.disabled}
                        fullWidth
                      />
                    ))}
                  </div>
                )}
              </div>
              {shouldShowClear && (
                <Button
                  type="icon-only"
                  size="small"
                  icon="×"
                  id="clear"
                  onClick={handleClearClick}
                  isDisabled={disabled}
                />
              )}
            </div>
          );
        }
        return (
          <div className="form-field__input-container">
            <select
              {...baseInputProps}
              value={value as string}
              onChange={e => handleInputChangeWithValidation(e.target.value)}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
            {shouldShowClear && (
              <Button
                type="icon-only"
                size="small"
                icon="×"
                id="clear"
                onClick={handleClearClick}
                isDisabled={disabled}
              />
            )}
          </div>
        );

      case 'multi-select':
        return (
          <div className="form-field__input-container">
            <div className="form-field__multi-select" ref={dropdownRef}>
              <Button
               id="dropdown"
                type="secondary"
                size="medium"
                btnText={
                  selectedOptions.length > 0
                    ? `${selectedOptions.length} נבחרו`
                    : placeholder || 'בחר אפשרויות'
                }
                onClick={toggleDropdown}
                isDisabled={disabled}
                icon="▼"
                iconPosition="right"
                fullWidth
              />
              {isDropdownOpen && (
                <div className="form-field__multi-select-menu">
                  {options.map(option => (
                    <label
                      key={option.value}
                      className="form-field__multi-select-item"
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.value)}
                        onChange={() => handleMultiSelectChange(option.value)}
                        disabled={option.disabled}
                        className="form-field__multi-select-checkbox"
                      />
                      <span className="form-field__multi-select-label">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {shouldShowClear && (
              <Button
                id="clear"
                type="icon-only"
                size="small"
                icon="×"
                onClick={handleClearClick}
                isDisabled={disabled}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`form-field ${className} ${disabled ? 'disabled' : ''} ${showErrorState ? 'form-field--error' : ''}`}>
      {label && (
        <label htmlFor={id} className="form-field__label">
          {label}
          {required && <span className="form-field__required">*</span>}
        </label>
      )}
      <div className="form-field__input-wrapper">{renderInput()}</div>
      {showErrorState && displayError && (
        <div className="form-field__error-tooltip">
          <span className="form-field__error-icon">⚠️</span>
          <span className="form-field__error-message">{displayError}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;
