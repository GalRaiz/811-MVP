import React, { useState } from 'react';
import FormField from '../components/storybook/FormField/FormField';
import { getAssistanceTypeOptions } from '../utils/assistanceTypeUtils';
import { Icons } from '../components/storybook/icons/EmojiIcons';
import './FormFieldDemo.scss';

const FormFieldDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    text: '',
    tel: '',
    number: 0,
    textarea: '',
    select: '',
    multiSelect: [] as string[],
    date: '',
    checkbox: false,
    radio: '',
    searchText: '',
    emailText: '',
    phoneText: '',
  });

  const assistanceTypeOptions = getAssistanceTypeOptions();

  const handleChange = (field: string, value: string | number | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="form-field-demo">
      <div className="form-field-demo__header">
        <h1>FormField Component Demo</h1>
        <p>דוגמה לכל סוגי השדות הזמינים</p>
      </div>

      <div className="form-field-demo__content">
        <div className="form-field-demo__section">
          <h2>שדות טקסט עם אייקונים</h2>
          
          <FormField
            id="search-field"
            label="חיפוש"
            placeholder="חפש כאן..."
            type="text"
            value={formData.searchText}
            onChange={(value) => handleChange('searchText', value as string)}
            icon={Icons.search}
            required
          />

          <FormField
            id="email-field"
            label="אימייל"
            placeholder="your@email.com"
            type="text"
            value={formData.emailText}
            onChange={(value) => handleChange('emailText', value as string)}
            icon={Icons.email}
          />

          <FormField
            id="phone-field"
            label="טלפון"
            placeholder="050-0000000"
            type="tel"
            value={formData.phoneText}
            onChange={(value) => handleChange('phoneText', value as string)}
            icon={Icons.phone}
          />

          <FormField
            id="text-field"
            label="שדה טקסט רגיל"
            placeholder="הכנס טקסט כאן..."
            type="text"
            value={formData.text}
            onChange={(value) => handleChange('text', value as string)}
            required
          />

          <FormField
            id="tel-field"
            label="מספר טלפון"
            placeholder="050-0000000"
            type="tel"
            value={formData.tel}
            onChange={(value) => handleChange('tel', value as string)}
          />

          <FormField
            id="number-field"
            label="מספר"
            placeholder="הכנס מספר"
            type="number"
            value={formData.number}
            onChange={(value) => handleChange('number', value as number)}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div className="form-field-demo__section">
          <h2>שדות ארוכים</h2>
          
          <FormField
            id="textarea-field"
            label="תיאור"
            placeholder="הכנס תיאור מפורט..."
            type="textarea"
            value={formData.textarea}
            onChange={(value) => handleChange('textarea', value as string)}
            rows={4}
          />
        </div>

        <div className="form-field-demo__section">
          <h2>שדות בחירה</h2>
          
          <FormField
            id="select-field"
            label="בחר סוג עזרה"
            placeholder="בחר סוג עזרה..."
            type="select"
            value={formData.select}
            onChange={(value) => handleChange('select', value as string)}
            options={assistanceTypeOptions}
            hasDropdown={true}
          />

          <FormField
            id="multi-select-field"
            label="בחר מספר סוגי עזרה"
            placeholder="בחר סוגי עזרה..."
            type="multi-select"
            value={formData.multiSelect}
            onChange={(value) => handleChange('multiSelect', value as string[])}
            options={assistanceTypeOptions}
          />

          <FormField
            id="native-select-field"
            label="בחר סוג עזרה (Native)"
            placeholder="בחר סוג עזרה..."
            type="select"
            value={formData.select}
            onChange={(value) => handleChange('select', value as string)}
            options={assistanceTypeOptions}
            hasDropdown={false}
          />
        </div>

        <div className="form-field-demo__section">
          <h2>שדות תאריך</h2>
          
          <FormField
            id="date-field"
            label="תאריך"
            type="date"
            value={formData.date}
            onChange={(value) => handleChange('date', value as string)}
          />
        </div>

        <div className="form-field-demo__section">
          <h2>שדות בוליאניים</h2>
          
          <FormField
            id="checkbox-field"
            label="אני מסכים לתנאים"
            type="checkbox"
            value={formData.checkbox}
            onChange={(value) => handleChange('checkbox', value as boolean)}
          />

          <FormField
            id="radio-field"
            label="בחר מגדר"
            type="radio"
            value={formData.radio}
            onChange={(value) => handleChange('radio', value as string)}
            options={[
              { value: 'male', label: 'זכר' },
              { value: 'female', label: 'נקבה' },
              { value: 'other', label: 'אחר' },
            ]}
          />
        </div>

        <div className="form-field-demo__section">
          <h2>שדות מושבתים</h2>
          
          <FormField
            id="disabled-text"
            label="שדה מושבת"
            placeholder="לא ניתן לערוך"
            type="text"
            value="ערך קבוע"
            onChange={() => {}}
            disabled
          />

          <FormField
            id="disabled-select"
            label="בחירה מושבתת"
            type="select"
            value=""
            onChange={() => {}}
            options={assistanceTypeOptions}
            disabled
          />
        </div>
      </div>

      <div className="form-field-demo__output">
        <h2>נתוני הטופס</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default FormFieldDemo;
