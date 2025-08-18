import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import FormField from '../storybook/FormField';
import './LocationStep.scss';

const LocationStep: React.FC = () => {
  const { formState, updateFormField } = useAssistanceForm();

  const handleFieldChange = (fieldName: 'district' | 'city' | 'street', value: string) => {
    updateFormField(fieldName, value);
  };

  const fields = [
    {
      id: 'district',
      label: 'מחוז',
      placeholder: 'בחר מחוז',
      type: 'text' as const,
      value: formState.district || '',
      hasDropdown: true
    },
    {
      id: 'city',
      label: 'עיר',
      placeholder: 'שם העיר',
      type: 'text' as const,
      value: formState.city || ''
    },
    {
      id: 'street',
      label: 'רחוב',
      placeholder: 'שם הרחוב',
      type: 'text' as const,
      value: formState.street || ''
    }
  ];

  return (
    <div className="location-step">
      <h2 className="location-step__title">לאיפה להגיע?</h2>
      
      <div className="location-step__fields">
        {fields.map(field => (
          <FormField
            key={field.id}
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            value={field.value}
            hasDropdown={field.hasDropdown}
            onChange={(value) => handleFieldChange(field.id as 'district' | 'city' | 'street', value)}
          />
        ))}
      </div>
      
      <div className="location-step__instructions">
        <p>
          אנחנו עובדים עם מחוזות פיקוד העורף. מיקום מדויק מאפשר לנו לשייך את הבקשה לחמ"ל הקרוב.
        </p>
      </div>
    </div>
  );
};

export default LocationStep;
