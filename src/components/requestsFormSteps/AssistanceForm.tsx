import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import FormField from '../storybook/FormField/FormField';
// import { Icons } from '../storybook/icons/EmojiIcons';

/**
 * AssistanceForm - Step 1: Requester Information
 *
 * This component handles the collection of basic requester information.
 * It's wrapped by StepWrapper for consistent styling and layout.
 */
const AssistanceForm: React.FC = () => {
  const { formState, updateFormField } = useAssistanceForm();

  const handleFieldChange = (
    fieldName: 'requesterName' | 'requesterPhone' | 'requestName',
    value: string
  ) => {
    updateFormField(fieldName, value);
  };

  return (
    <>
      <FormField
        id="requesterName"
        label="שם מקבל הסיוע"
        placeholder="שם מלא"
        type="text"
        value={formState.requesterName || ''}
        onChange={value => handleFieldChange('requesterName', value as string)}
        required
        showClear={true}
      />

      <FormField
        id="requesterPhone"
        label="מספר טלפון"
        placeholder="מספר טלפון"
        type="tel"
        // icon={Icons.phone}
        value={formState.requesterPhone || ''}
        onChange={value => handleFieldChange('requesterPhone', value as string)}
        required
        showClear={true}
      />

      <FormField
        id="requestName"
        label="כותרת הבקשה"
        placeholder="תיאור קצר של הבקשה"
        type="text"
        value={formState.requestName || ''}
        onChange={value => handleFieldChange('requestName', value as string)}
        required
        showClear={true}
      />
    </>
  );
};

export default AssistanceForm;
