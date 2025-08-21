import React, { useState, useEffect } from 'react';
import './RequestsSection.scss';
import { IRequest } from '../store/types';
import Button from './storybook/Button/Button';
import { useNavigate } from 'react-router-dom';

interface RequestsSectionProps {
  data: IRequest[];
}

const RequestsSection: React.FC<RequestsSectionProps> = ({ data }) => {
  const navigate = useNavigate();
  const requests = data;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Show success message when requests count increases
  useEffect(() => {
    if (requests.length > 0) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  }, [requests.length]);

  const columns = ['סטאטוס', 'שם בקשה', 'שיוך'];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'in-progress':
        return 'green';
      case 'completed':
        return 'grey';
      default:
        return 'grey';
    }
  };

  return (
    <div className="requests-section">
      {showSuccessMessage && (
        <div className="success-notification">
          <span>✓ בקשה חדשה נוספה בהצלחה!</span>
        </div>
      )}

      <div className="section-header">
        <div className="header-content">
          <h2>בקשות</h2>
          <p className="subtitle">בקשות סיוע אחרונות שהוספת למערכת</p>
        </div>
        <Button
          type="tertiary"
          btnText="ראה הכל"
          onClick={() => navigate('/RequestsPage')}
          isDisabled={false}
          icon={'←'}
        />
      </div>

      <div className="requests-table-wrapper">
        <table className="requests-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col} className="table-header">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map((request: IRequest) => (
              <tr key={request.id} className="table-row">
                <td className="cell status">
                  <div
                    className={`status-dot ${getStatusColor(
                      request.requestStatus?.requestStatus
                    )}`}
                  ></div>
                  <span>
                    {request.requestStatus?.requestStatus ?? 'pending'}
                  </span>
                </td>
                <td className="cell name">
                  {request.requestDetails?.requestName ?? 'בקשה חדשה'}
                </td>
                <td className="cell assigned-to">
                  {request.requestStatus?.assignedTo?.length
                    ? request.requestStatus.assignedTo.join(', ')
                    : 'לא משויך'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="empty-state">אין בקשות להצגה כרגע</div>
        )}
      </div>
    </div>
  );
};

export default RequestsSection;
