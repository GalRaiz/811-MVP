import React from 'react';
import './AlertsSection.scss';
import Button from './storybook/Button/Button';
import { Icons } from './storybook/icons/EmojiIcons';

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
    <div className="alerts-section">
      <div className="alerts-section__header">
        <div className="alerts-section__title-wrapper">
          <div className="alerts-section__bell-icon">
            <span className="alerts-section__bell">{Icons.bell}</span>
            {alerts.length > 0 && (
              <span className="alerts-section__notification-count">
                {alerts.length}
              </span>
            )}
          </div>
          <h2 className="alerts-section__title">התראות מערכת</h2>
        </div>
      </div>

      <div className="alerts-section__alerts-list">
        {alerts.map(alert => (
          <div key={alert.id} className="alerts-section__alert-item">
            <div className="alerts-section__alert-icon">
              {getAlertIcon(alert.type)}
            </div>

            <div className="alerts-section__alert-content">
              <div className="alerts-section__alert-header">
                <h3 className="alerts-section__alert-title">{alert.title}</h3>
                {alert.requestName && (
                  <span className="alerts-section__request-name">
                    {alert.requestName}
                  </span>
                )}
              </div>

              <p className="alerts-section__alert-description">
                {alert.description}
              </p>

              {alert.actionText && (
                <Button
                  type="tertiary"
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
