import React from 'react';
import './FormField.scss';

interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'tel' | 'number' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  hasDropdown?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
  hasDropdown = false,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange(event.target.value);
  };

  const districts = [
    'מחוז תל אביב',
    'מחוז המרכז',
    'מחוז חיפה',
    'מחוז ירושלים',
    'מחוז הדרום',
    'מחוז הצפון',
  ];

  return (
    <div className='form-field'>
      <label htmlFor={id} className='form-field__label'>
        {label}
      </label>
      {hasDropdown ? (
        <div className='form-field__dropdown-container'>
          {type === 'textarea' ? (
            <textarea
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={handleTextareaChange}
              className='form-field__input form-field__input--with-dropdown'
            />
          ) : (
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              className='form-field__input form-field__input--with-dropdown'
              list={`${id}-options`}
            />
          )}
          <datalist id={`${id}-options`}>
            {districts.map((district, index) => (
              <option key={index} value={district} />
            ))}
          </datalist>
          <div className='form-field__dropdown-arrow'>▼</div>
        </div>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          rows={10}
          onChange={handleTextareaChange}
          className='form-field__input'
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          className='form-field__input'
        />
      )}
    </div>
  );
};

export default FormField;
