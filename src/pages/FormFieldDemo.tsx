import React, { useState } from 'react';
import FormField from '../components/storybook/FormField/FormField';
import {
  DisplayField,
  DisplayGroup,
  DisplaySection,
} from '../components/storybook/FormField/DisplayField';
import {
  Accordion,
  AccordionItem,
} from '../components/storybook/FormField/Accordion/Accordion';
import { getAssistanceTypeOptions } from '../utils/assistanceTypeUtils';
import { Icons } from '../components/storybook/icons/EmojiIcons';
import './FormFieldDemo.scss';
import PageHeader from '../components/storybook/NavBar/PageHeader';
import mateLogoGreen from '../assets/mate-logo-white.png';

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

  const [accordionOpenItems, setAccordionOpenItems] = useState<string[]>([
    'personal',
  ]);

  const assistanceTypeOptions = getAssistanceTypeOptions();

  const handleChange = (
    field: string,
    value: string | number | boolean | string[]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Sample data for DisplayField examples
  const sampleUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    department: 'Engineering',
    role: 'Senior Developer',
    startDate: '2023-01-15',
    location: 'San Francisco',
  };

  return (
    <>
      <PageHeader title="דוגמה לשדות" logo={mateLogoGreen} />
      <div className="form-field-demo__container">
        <h1>FormField Component Demo</h1>
        <p>
          דוגמה לכל סוגי השדות הזמינים - FormField, DisplayField, ו-Accordion
        </p>
      </div>

      {/* FormField Examples */}
      <div className="form-field-demo">
        <div className="form-field-demo__section">
          <h2>שדות טקסט עם אייקונים</h2>

          <DisplayGroup>
            <FormField
              id="search-field"
              label="חיפוש"
              placeholder="חפש כאן..."
              type="text"
              value={formData.searchText}
              onChange={value => handleChange('searchText', value as string)}
              icon={Icons.search}
              required
              showClear={true}
            />
            <FormField
              id="email-field"
              label="אימייל"
              placeholder="your@email.com"
              type="text"
              value={formData.emailText}
              onChange={value => handleChange('emailText', value as string)}
              icon={Icons.email}
              showClear={true}
            />
          </DisplayGroup>

          <FormField
            id="email-field"
            label="אימייל"
            placeholder="your@email.com"
            type="text"
            value={formData.emailText}
            onChange={value => handleChange('emailText', value as string)}
            icon={Icons.email}
            showClear={true}
          />

          <FormField
            id="phone-field"
            label="טלפון"
            placeholder="050-0000000"
            type="tel"
            value={formData.phoneText}
            onChange={value => handleChange('phoneText', value as string)}
            icon={Icons.phone}
            showClear={true}
          />

          <FormField
            id="text-field"
            label="שדה טקסט רגיל"
            placeholder="הכנס טקסט כאן..."
            type="text"
            value={formData.text}
            onChange={value => handleChange('text', value as string)}
            required
          />

          <FormField
            id="tel-field"
            label="מספר טלפון"
            placeholder="050-0000000"
            type="tel"
            value={formData.tel}
            onChange={value => handleChange('tel', value as string)}
            showClear={true}
          />

          <FormField
            id="number-field"
            label="מספר"
            placeholder="הכנס מספר"
            type="number"
            value={formData.number}
            onChange={value => handleChange('number', value as number)}
            min={0}
            max={100}
            step={1}
            showClear={true}
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
            onChange={value => handleChange('textarea', value as string)}
            rows={4}
          />

          <FormField
            id="select-field"
            label="בחר סוג עזרה"
            placeholder="בחר סוג עזרה..."
            type="select"
            value={formData.select}
            onChange={value => handleChange('select', value as string)}
            options={assistanceTypeOptions}
            hasDropdown={true}
          />

          <FormField
            id="multi-select-field"
            label="בחר מספר סוגי עזרה"
            placeholder="בחר סוגי עזרה..."
            type="multi-select"
            value={formData.multiSelect}
            onChange={value => handleChange('multiSelect', value as string[])}
            options={assistanceTypeOptions}
            showClear={true}
          />

          <FormField
            id="native-select-field"
            label="בחר סוג עזרה (Native)"
            placeholder="בחר סוג עזרה..."
            type="select"
            value={formData.select}
            onChange={value => handleChange('select', value as string)}
            options={assistanceTypeOptions}
            hasDropdown={false}
            showClear={true}
          />
        </div>

        <div className="form-field-demo__section">
          <h2>שדות תאריך</h2>

          <FormField
            id="date-field"
            label="תאריך"
            type="date"
            value={formData.date}
            onChange={value => handleChange('date', value as string)}
            showClear={true}
          />
        </div>

        <div className="form-field-demo__section">
          <h2>שדות בוליאניים</h2>

          <FormField
            id="checkbox-field"
            label="אני מסכים לתנאים"
            type="checkbox"
            value={formData.checkbox}
            onChange={value => handleChange('checkbox', value as boolean)}
          />

          <FormField
            id="radio-field"
            label="בחר מגדר"
            type="radio"
            value={formData.radio}
            onChange={value => handleChange('radio', value as string)}
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
            showClear={false}
          />

          <FormField
            id="disabled-select"
            label="בחירה מושבתת"
            type="select"
            value=""
            onChange={() => {}}
            options={assistanceTypeOptions}
            disabled
            showClear={false}
          />
        </div>
      </div>

      {/* DisplayField Examples */}
      <div className="form-field-demo">
        <div className="form-field-demo__section">
          <h2>DisplayField Components</h2>

          <DisplaySection
            title="Basic Display Fields"
            subtitle="Simple read-only information display"
          >
            <DisplayField label="Full Name" value={sampleUserData.name} />
            <DisplayField label="Email Address" value={sampleUserData.email} />
            <DisplayField label="Phone Number" value={sampleUserData.phone} />
          </DisplaySection>

          <DisplaySection
            title="Display Fields with Variants"
            subtitle="Different styling options"
          >
            <DisplayField
              label="Status"
              value={sampleUserData.status}
              valueVariant="success"
            />
            <DisplayField
              label="Department"
              value={sampleUserData.department}
              valueVariant="primary"
            />
            <DisplayField
              label="Role"
              value={sampleUserData.role}
              valueVariant="secondary"
            />
            <DisplayField
              label="Warning Status"
              value="Pending Review"
              valueVariant="warning"
            />
            <DisplayField
              label="Error Status"
              value="Failed"
              valueVariant="error"
            />
          </DisplaySection>

          <DisplaySection
            title="Display Fields with Sizes"
            subtitle="Different size variants"
          >
            <DisplayField
              label="Small Field"
              value="Small text"
              labelSize="small"
              valueSize="small"
            />
            <DisplayField
              label="Normal Field"
              value="Normal text"
              labelSize="normal"
              valueSize="normal"
            />
            <DisplayField
              label="Large Field"
              value="Large text"
              labelSize="large"
              valueSize="large"
            />
          </DisplaySection>

          <DisplaySection
            title="Display Fields with Special Features"
            subtitle="Advanced display options"
          >
            <DisplayField
              label="Long Text (Truncated)"
              value="This is a very long text that will be truncated to show how the truncation feature works in the DisplayField component"
              truncated={true}
            />
            <DisplayField
              label="Multiline Text"
              value="This is a multiline text that supports line breaks and longer content display"
              multiline={true}
            />
            <DisplayField
              label="Highlighted Field"
              value="This field is highlighted"
              highlighted={true}
            />
            <DisplayField
              label="Compact Field"
              value="Compact spacing"
              compact={true}
            />
            <DisplayField
              label="Inline Field"
              value="Inline display"
              inline={true}
            />
            <DisplayField
              label="No Border Field"
              value="No bottom border"
              noBorder={true}
            />
          </DisplaySection>

          <DisplaySection
            title="Display Groups"
            subtitle="Grouped display fields"
          >
            <DisplayGroup title="Personal Information" layout="horizontal">
              <DisplayField label="Name" value={sampleUserData.name} />
              <DisplayField label="Email" value={sampleUserData.email} />
            </DisplayGroup>

            <DisplayGroup title="Work Information" layout="horizontal">
              <DisplayField
                label="Department"
                value={sampleUserData.department}
              />
              <DisplayField label="Role" value={sampleUserData.role} />
            </DisplayGroup>

            <DisplayGroup title="Contact Details" layout="vertical">
              <DisplayField label="Phone" value={sampleUserData.phone} />
              <DisplayField label="Location" value={sampleUserData.location} />
            </DisplayGroup>
          </DisplaySection>
        </div>
      </div>

      {/* Accordion Examples */}
      <div className="form-field-demo">
        <div className="form-field-demo__section">
          <h2>Accordion Components</h2>

          <h3>Basic Accordion</h3>
          <Accordion>
            <AccordionItem id="basic-1" title="Basic Section 1">
              <p>This is the content for basic section 1.</p>
            </AccordionItem>
            <AccordionItem id="basic-2" title="Basic Section 2">
              <p>This is the content for basic section 2.</p>
            </AccordionItem>
          </Accordion>

          <h3>Single Accordion (only one open at a time)</h3>
          <Accordion single>
            <AccordionItem id="single-1" title="Single Section 1">
              <p>Only one section can be open at a time.</p>
            </AccordionItem>
            <AccordionItem id="single-2" title="Single Section 2">
              <p>Only one section can be open at a time.</p>
            </AccordionItem>
          </Accordion>

          <h3>Card Style Accordion</h3>
          <Accordion variant="card">
            <AccordionItem
              id="card-1"
              title="Card Section 1"
              subtitle="With subtitle and badge"
              badge={{ text: 'New', variant: 'info' }}
            >
              <p>Each section looks like a card.</p>
            </AccordionItem>
            <AccordionItem
              id="card-2"
              title="Card Section 2"
              badge={{ text: 'Warning', variant: 'warning' }}
            >
              <p>Each section looks like a card.</p>
            </AccordionItem>
          </Accordion>

          <h3>Accordion with Display Fields</h3>
          <Accordion variant="card">
            <AccordionItem
              id="display-1"
              title="Personal Information"
              subtitle="Basic contact details"
              badge={{ text: 'Required', variant: 'warning' }}
            >
              <DisplayField label="Full Name" value={sampleUserData.name} />
              <DisplayField
                label="Email Address"
                value={sampleUserData.email}
              />
              <DisplayField label="Phone Number" value={sampleUserData.phone} />
            </AccordionItem>

            <AccordionItem
              id="display-2"
              title="Work Information"
              badge={{ text: 'Active', variant: 'success' }}
            >
              <DisplayField
                label="Department"
                value={sampleUserData.department}
              />
              <DisplayField label="Position" value={sampleUserData.role} />
              <DisplayField
                label="Start Date"
                value={sampleUserData.startDate}
              />
            </AccordionItem>
          </Accordion>

          <h3>Controlled Accordion</h3>
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => setAccordionOpenItems(['personal'])}
              style={{ marginRight: '0.5rem', padding: '0.5rem 1rem' }}
            >
              Open Personal Only
            </button>
            <button
              onClick={() => setAccordionOpenItems(['work'])}
              style={{ marginRight: '0.5rem', padding: '0.5rem 1rem' }}
            >
              Open Work Only
            </button>
            <button
              onClick={() => setAccordionOpenItems([])}
              style={{ padding: '0.5rem 1rem' }}
            >
              Close All
            </button>
          </div>

          <Accordion
            openItems={accordionOpenItems}
            onOpenItemsChange={setAccordionOpenItems}
            variant="card"
          >
            <AccordionItem id="personal" title="Personal Information">
              <DisplayField label="Full Name" value={sampleUserData.name} />
              <DisplayField
                label="Email Address"
                value={sampleUserData.email}
              />
            </AccordionItem>

            <AccordionItem id="work" title="Work Information">
              <DisplayField
                label="Department"
                value={sampleUserData.department}
              />
              <DisplayField label="Position" value={sampleUserData.role} />
            </AccordionItem>
          </Accordion>

          <h3>Compact Accordion</h3>
          <Accordion variant="compact">
            <AccordionItem id="compact-1" title="Compact Section 1">
              <p>Reduced spacing for dense layouts.</p>
            </AccordionItem>
            <AccordionItem id="compact-2" title="Compact Section 2">
              <p>Reduced spacing for dense layouts.</p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="form-field-demo__output">
        <h2>נתוני הטופס</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </>
  );
};

export default FormFieldDemo;
