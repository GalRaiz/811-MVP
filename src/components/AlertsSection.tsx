import React from 'react';
import './AlertsSection.scss';
import Button from './storybook/Button/Button';

interface IAlert {
  id: number;
  type: 'pending' | 'update';
  title: string;
  description?: string;
  actionText?: string;
  requestName?: string;
  icon?: React.ReactNode;
}

const AlertsSection: React.FC = () => {
  const alerts: IAlert[] = [
    {
      id: 1,
      type: 'pending',
      title: 'בקשה ממתינה',
      description: 'הבקשה שלך ממתינה כבר שבוע. תרצה להקפיץ מחדש למערכת?',
      actionText: 'הקפץ למערכת',
      requestName: 'מזון למשפחת מפונים',
      icon: <span className="assistance-form-footer__button-arrow">←</span>,
    },
    {
      id: 2,
      type: 'update',
      title: 'עדכון בקשה',
      description: 'הבקשה שלך "עבודות גיזום" הועברה לטיפול',
      requestName: 'עבודות גיזום',
    },
  ];

  const getAlertIcon = (type: string) => {
    return type === 'pending' ? '⏰' : '💚';
  };

  return (
    <div className='alerts-section'>
      <div className='section-header'>
        <h2>התראות מערכת</h2>
      </div>

      <div className='alerts-list'>
        {alerts.map(alert => (
          <div key={alert.id} className='alert-item'>
            <div className='alert-icon'>{getAlertIcon(alert.type)}</div>

            <div className='alert-content'>
              <div className='alert-header'>
                <h3>{alert.title}</h3>
                {alert.requestName && (
                  <span className='request-name'>{alert.requestName}</span>
                )}
              </div>

              <p className='alert-description'>{alert.description}</p>

              {alert.actionText && (
                <Button
                  type='tertiary'
                  btnText={alert.actionText}
                  onClick={() => {}}
                  icon={alert.icon}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsSection;
