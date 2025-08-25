import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import { Accordion, AccordionItem } from '../storybook/FormField/Accordion/Accordion';
import { Icons } from '../storybook/icons/EmojiIcons';

const FormSummaryStep: React.FC = () => {
  const { formState } = useAssistanceForm();

  const formatArray = (arr: string[] | undefined) =>
    arr && arr.length > 0 ? arr.join(' • ') : 'לא נבחר';
  const formatAttachments = (attachments: string | undefined) => {
    if (!attachments) return 'לא הועלו קבצים';
    const files = attachments.split(',').filter(f => f.trim());
    return files.length > 0 ? files.join(', ') : 'לא הועלו קבצים';
  };

  return (
    <div className="form-summary-step">
      <div className="form-summary-step__header">
        <h2 className="form-summary-step__title">סיכום הבקשה</h2>
        <div className="form-summary-step__date">
          {new Date(formState.createdAt || Date.now()).toLocaleDateString(
            'he-IL'
          )}{' '}
          |{' '}
          {new Date(formState.createdAt || Date.now()).toLocaleTimeString(
            'he-IL',
            { hour: '2-digit', minute: '2-digit' }
          )}
        </div>
      </div>

      <div className="form-summary-step__content">
        <div className="form-summary-step__main-info">
          <div className="form-summary-step__request-title">
            <span className="form-summary-step__request-icon">
              {Icons.greenHeart}
            </span>
            {formState.requestName || 'בקשת סיוע'}
          </div>
        </div>

        <div className="form-summary-step__tags">
          {formState.needTransportation && (
            <span className="form-summary-step__tag">🚚 שינוע</span>
          )}
          {formState.needVolunteers && (
            <span className="form-summary-step__tag">👥 מתנדבים</span>
          )}
          {formState.district && (
            <span className="form-summary-step__tag">
              📍{formState.district.label}
            </span>
          )}
          {formState.requestType && (
            <span className="form-summary-step__tag">
              {formState.requestType.label || 'לא נבחר'}
            </span>
          )}
        </div>
        <Accordion variant="compact" defaultOpenItems={['request-details']}>
          <AccordionItem
            id="request-details"
            title="פרטי הבקשה"
            subtitle="סוג הסיוע ותת-סוגים"
          >
            <div className="summary-field">
              <label>סוג סיוע:</label>
              <span>{formState.requestType.label || 'לא נבחר'}</span>
            </div>
            <div className="summary-field">
              <label>תת-סוגים:</label>
              <span>{formatArray(formState.requestSubType?.map(subType => subType.label))}</span>
            </div>
          </AccordionItem>

          <AccordionItem
            id="requester-details"
            title="פרטי מבקש הסיוע"
            subtitle="שם ומספר טלפון"
          >
            <div className="summary-field">
              <label>שם מקבל הסיוע:</label>
              <span>{formState.requesterName || 'לא הוזן'}</span>
            </div>
            <div className="summary-field">
              <label>מספר טלפון:</label>
              <span>{formState.requesterPhone || 'לא הוזן'}</span>
            </div>
          </AccordionItem>

          <AccordionItem
            id="location-details"
            title="פרטי מיקום"
            subtitle="מחוז, עיר ורחוב"
          >
            <div className="summary-field">
              <label>מחוז:</label>
              <span>{formState.district?.label || 'לא נבחר'}</span>
            </div>
            <div className="summary-field">
              <label>עיר:</label>
              <span>{formState.city?.label || 'לא הוזן'}</span>
            </div>
            <div className="summary-field">
              <label>רחוב:</label>
              <span>{formState.street || 'לא הוזן'}</span>
            </div>
          </AccordionItem>

          <AccordionItem
            id="attachments"
            title="קבצים מצורפים"
            subtitle="קבצים שהועלו"
          >
            <div className="summary-field">
              <label>קבצים:</label>
              <span>{formatAttachments(formState.attachment)}</span>
            </div>
          </AccordionItem>
        </Accordion>

        {formState.requestDescription && (
          <div className="form-summary-step__description">
            <h3 className="form-summary-step__description-title">
              תיאור הבקשה
            </h3>
            <p className="form-summary-step__description-text">
              {formState.requestDescription}
            </p>
          </div>
        )}
        <div className="form-summary-step__tasks">
          <h3 className="form-summary-step__tasks-title">משימות</h3>
          <div className="form-summary-step__task-list">
            {formState.requestType && (
              <div className="form-summary-step__task-item">
                <span className="form-summary-step__task-status">ממתין</span>
                <span className="form-summary-step__task-text">
                  → {formState.requestType.label || 'לא נבחר'}
                </span>
              </div>
            )}
            {formState.needTransportation && (
              <div className="form-summary-step__task-item">
                <span className="form-summary-step__task-status">ממתין</span>
                <span className="form-summary-step__task-text">
                  → שינוע לכתובת
                </span>
              </div>
            )}
            {formState.needVolunteers && (
              <div className="form-summary-step__task-item">
                <span className="form-summary-step__task-status">ממתין</span>
                <span className="form-summary-step__task-text">→ מתנדבים</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSummaryStep;
