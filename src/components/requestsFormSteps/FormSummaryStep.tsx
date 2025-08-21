import React, { useEffect } from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import './FormSummaryStep.scss';
import CollapsibleSection from '../storybook/Accordion/CollapsibleSection';

const FormSummaryStep: React.FC = () => {
  const { formState } = useAssistanceForm();

  useEffect(() => {
    console.log('=== FORM SUMMARY ===');
    console.log('Form State:', formState);
    console.log('Request Details:', {
      requestName: formState.requestName,
      requestType: formState.requestType,
      requestSubType: formState.requestSubType,
      requestDescription: formState.requestDescription,
      requesterName: formState.requesterName,
      requesterPhone: formState.requesterPhone,
      location: {
        district: formState.district,
        city: formState.city,
        street: formState.street,
      },
      needs: {
        transportation: formState.needTransportation,
        volunteers: formState.needVolunteers,
      },
      attachments: formState.attachment,
      status: formState.requestStatus,
      createdAt: new Date(formState.createdAt || Date.now()).toLocaleString(
        'he-IL'
      ),
      updatedAt: new Date(formState.updatedAt || Date.now()).toLocaleString(
        'he-IL'
      ),
    });
    console.log('===================');
  }, [formState]);

  const formatArray = (arr: string[] | undefined) =>
    arr && arr.length > 0 ? arr.join(', ') : 'לא נבחר';
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
            <span className="form-summary-step__request-icon">❤️</span>
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
              📍 {formState.district}
            </span>
          )}
          {formState.requestType && (
            <span className="form-summary-step__tag">
              {formState.requestType}
            </span>
          )}
        </div>
        <CollapsibleSection title="סוג סיוע" defaultOpen={true}>
          <div className="summary-field">
            <label>סוג סיוע:</label>
            <span>{formState.requestType || 'לא נבחר'}</span>
          </div>
          <div className="summary-field">
            <label>תת-סוגים:</label>
            <span>{formatArray(formState.requestSubType)}</span>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="פרטי התקשרות">
          <div className="summary-field">
            <label>שם מקבל הסיוע:</label>
            <span>{formState.requesterName || 'לא הוזן'}</span>
          </div>
          <div className="summary-field">
            <label>מספר טלפון:</label>
            <span>{formState.requesterPhone || 'לא הוזן'}</span>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="מיקום">
          <div className="summary-field">
            <label>מחוז:</label>
            <span>{formState.district || 'לא נבחר'}</span>
          </div>
          <div className="summary-field">
            <label>עיר:</label>
            <span>{formState.city || 'לא הוזן'}</span>
          </div>
          <div className="summary-field">
            <label>רחוב:</label>
            <span>{formState.street || 'לא הוזן'}</span>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="קבצים מצורפים">
          <div className="summary-field">
            <label>קבצים:</label>
            <span>{formatAttachments(formState.attachment)}</span>
          </div>
        </CollapsibleSection>

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
                  → {formState.requestType}
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
