import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import FormField from '../storybook/FormField/FormField';
import './AssistanceFormFinalStep.scss';

const AssistanceFormFinalStep: React.FC = () => {
  const { formState, updateFormField } = useAssistanceForm();
  
  const handleFieldChange = (
    fieldName: 'requestName' | 'requestDescription',
    value: string
  ) => {
    updateFormField(fieldName, value);
  };

  return (
    <div className='assistance-form'>
      <h2 className='assistance-form__title'>תיאור פרטים חשובים</h2>

      <div className='assistance-form__fields'>
        <FormField
          id="requestName"
          label=""
          placeholder="כותרת הבקשה"
          type="text"
          value={formState.requestName || ''}
          onChange={(value) => handleFieldChange('requestName', value as string)}
        />

        <FormField
          id="requestDescription"
          label=""
          placeholder="פה זה המקום לפרט..."
          type="textarea"
          value={formState.requestDescription || ''}
          onChange={(value) => handleFieldChange('requestDescription', value as string)}
          rows={6}
        />
      </div>

      <div className='assistance-form__instructions'>
        <p>ככל שנדע יותר על הבקשה במדויק, כך יצטמצם זמן הטיפול בה.</p>
      </div>
    </div>
  );
};

export default AssistanceFormFinalStep;
