import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import FormField from '../storybook/FormField/FormField';
import './LocationStep.scss';

const LocationStep: React.FC = () => {
  const { formState, updateFormField } = useAssistanceForm();

  const handleFieldChange = (
    fieldName: 'district' | 'city' | 'street',
    value: string
  ) => {
    updateFormField(fieldName, value);
  };

  const districtOptions = [
    { value: 'מחוז תל אביב', label: 'מחוז תל אביב' },
    { value: 'מחוז המרכז', label: 'מחוז המרכז' },
    { value: 'מחוז חיפה', label: 'מחוז חיפה' },
    { value: 'מחוז ירושלים', label: 'מחוז ירושלים' },
    { value: 'מחוז הדרום', label: 'מחוז הדרום' },
    { value: 'מחוז הצפון', label: 'מחוז הצפון' },
  ];

  return (
    <div className="location-step">
      <h2 className="location-step__title">לאיפה להגיע?</h2>

      <div className="location-step__fields">
        <FormField
          id="district"
          label="מחוז"
          placeholder="בחר מחוז"
          type="select"
          value={formState.district || ''}
          onChange={value => handleFieldChange('district', value as string)}
          options={districtOptions}
          hasDropdown={true}
        />

        <FormField
          id="city"
          label="עיר"
          placeholder="שם העיר"
          type="text"
          value={formState.city || ''}
          onChange={value => handleFieldChange('city', value as string)}
        />

        <FormField
          id="street"
          label="רחוב"
          placeholder="שם הרחוב"
          type="text"
          value={formState.street || ''}
          onChange={value => handleFieldChange('street', value as string)}
        />
      </div>

      <div className="location-step__instructions">
        <p>
          אנחנו עובדים עם מחוזות פיקוד העורף. מיקום מדויק מאפשר לנו לשייך את
          הבקשה לחמ"ל הקרוב.
        </p>
      </div>
    </div>
  );
};

export default LocationStep;
