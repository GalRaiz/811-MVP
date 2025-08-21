import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import FormField from '../storybook/FormField/FormField';
import './AssistanceForm.scss';

const AssistanceForm: React.FC = () => {
  const { formState, updateFormField } = useAssistanceForm();

  const handleFieldChange = (
    fieldName: 'requesterName' | 'requesterPhone' | 'requestName',
    value: string
  ) => {
    updateFormField(fieldName, value);
  };

  return (
    <div className="assistance-form">
      <h2 className="assistance-form__title">מי צריך עזרה?</h2>

      <div className="assistance-form__fields">
        <FormField
          id="requesterName"
          label="שם מקבל הסיוע"
          placeholder="שם מלא"
          type="text"
          value={formState.requesterName || ''}
          onChange={value =>
            handleFieldChange('requesterName', value as string)
          }
        />

        <FormField
          id="requesterPhone"
          label="מספר טלפון"
          placeholder="מספר טלפון"
          type="tel"
          value={formState.requesterPhone || ''}
          onChange={value =>
            handleFieldChange('requesterPhone', value as string)
          }
        />

        <FormField
          id="requestName"
          label="כותרת הבקשה"
          placeholder="תיאור קצר של הבקשה"
          type="text"
          value={formState.requestName || ''}
          onChange={value => handleFieldChange('requestName', value as string)}
        />
      </div>

      <div className="assistance-form__instructions">
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
