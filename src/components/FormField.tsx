import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'tel' | 'email' | 'password' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hasDropdown?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
  required = false,
  hasDropdown = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const districts = [
    'מחוז תל אביב',
    'מחוז המרכז',
    'מחוז חיפה',
    'מחוז ירושלים',
    'מחוז הדרום',
    'מחוז הצפון'
  ];

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label 
        htmlFor={id}
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '500',
          color: '#495057'
        }}
      >
        {label}
        {required && <span style={{ color: '#d9534f' }}> *</span>}
      </label>
      
      {hasDropdown ? (
        <div style={{ position: 'relative' }}>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required={required}
            list={`${id}-options`}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e9ecef',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
          <datalist id={`${id}-options`}>
            {districts.map((district, index) => (
              <option key={index} value={district} />
            ))}
          </datalist>
          <div style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: '#6c757d'
          }}>
            ▼
          </div>
        </div>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required={required}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #e9ecef',
            borderRadius: '4px',
            fontSize: '1rem',
            fontFamily: 'inherit',
            resize: 'vertical',
            minHeight: '100px',
            boxSizing: 'border-box'
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required={required}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #e9ecef',
            borderRadius: '4px',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
      )}
    </div>
  );
};

export default FormField;
