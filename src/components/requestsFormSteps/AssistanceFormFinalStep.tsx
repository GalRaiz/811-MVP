import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import FormField from './FormAssets/FormField';
import './AssistanceFormFinalStep.scss';

const AssistanceFormFinalStep: React.FC = () => {
  const { formState, updateFormField } = useAssistanceForm();
  const handleFieldChange = (
    fieldName: 'requestName' | 'requestDescription',
    value: string
  ) => {
    updateFormField(fieldName, value);
  };

  const fields = [
    {
      id: 'requestName',
      label: '',
      placeholder: 'כותרת הבקשה',
      type: 'text' as const,
      value: formState.requestName || '',
    },
    {
      id: 'requestDescription',
      label: '',
      placeholder: 'פה זה המקום לפרט...',
      type: 'textarea' as const,
      value: formState.requestDescription || '',
    },
  ];

  return (
    <div className='assistance-form'>
      <h2 className='assistance-form__title'>תיאור פרטים חשובים</h2>

      <div className='assistance-form__fields'>
        {fields.map(field => (
          <FormField
            key={field.id}
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            value={field.value}
            onChange={value =>
              handleFieldChange(
                field.id as 'requestName' | 'requestDescription',
                value
              )
            }
          />
        ))}
      </div>

      <div className='assistance-form__instructions'>
        <p>ככל שנדע יותר על הבקשה במדויק, כך יצטמצם זמן הטיפול בה.</p>
      </div>
    </div>
  );
};

export default AssistanceFormFinalStep;
