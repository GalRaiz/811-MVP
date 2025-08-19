import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import FormField from './FormAssets/FormField';
import './AssistanceForm.scss';

const AssistanceForm: React.FC = () => {
  const { formState, updateFormField } = useAssistanceForm();

  const handleFieldChange = (
    fieldName: 'requesterName' | 'requesterPhone' | 'requestName',
    value: string
  ) => {
    updateFormField(fieldName, value);
  };

  const fields = [
    {
      id: 'requesterName',
      label: 'שם מקבל הסיוע',
      placeholder: 'שם מלא',
      type: 'text' as const,
      value: formState.requesterName || '',
    },
    {
      id: 'requesterPhone',
      label: 'מספר טלפון',
      placeholder: 'מספר טלפון',
      type: 'tel' as const,
      value: formState.requesterPhone || '',
    },
    {
      id: 'requestName',
      label: 'כותרת הבקשה',
      placeholder: 'תיאור קצר של הבקשה',
      type: 'text' as const,
      value: formState.requestName || '',
    },
  ];

  return (
    <div className='assistance-form'>
      <h2 className='assistance-form__title'>מי צריך עזרה?</h2>

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
                field.id as 'requesterName' | 'requesterPhone' | 'requestName',
                value
              )
            }
          />
        ))}
      </div>

      <div className='assistance-form__instructions'>
        <p>
          כתבו שם שמייצג את מי שצריך את העזרה. זה יכול להיות "ישראל ישראלי" או
          "קבוצת דיירי רח' הארזים". אנחנו רק רוצים לדעת למי בדיוק להפנות את
          הסיוע. מספר הטלפון צריך להיות של מישהו שנמצא עם המקבלים ויכול לענות
          לשליח או למתנדב בשטח.
        </p>
      </div>
    </div>
  );
};

export default AssistanceForm;
