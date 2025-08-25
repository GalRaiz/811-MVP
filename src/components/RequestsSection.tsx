import React, { useState, useEffect } from 'react';
import './RequestsSection.scss';
import { IRequest } from '../store/types';
import Button from './storybook/Button/Button';
import { useNavigate } from 'react-router-dom';
import { getStatusLabel, getStatusColor } from '../utils/statusUtils';

interface RequestsSectionProps {
  data: IRequest[];
}

const RequestsSection: React.FC<RequestsSectionProps> = ({ data }) => {
  const navigate = useNavigate();
  const requests = data.slice(0, 10); // Show only first 10 items
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Show success message when requests count increases
  useEffect(() => {
    if (requests.length > 0) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  }, [requests.length]);

  const columns = ['סטאטוס', 'שם בקשה', 'שיוך'];

  // Remove the old getStatusColor function since we're using the utility now

  return (
    <div className="requests-section">
      {showSuccessMessage && (
        <div className="requests-section__success-notification">
          <span>✓ בקשה חדשה נוספה בהצלחה!</span>
        </div>
      )}

      <div className="requests-section__header">
        <div className="requests-section__header-content">
          <h2 className="requests-section__title">בקשות</h2>
        </div>
        <Button
          type="tertiary"
          btnText="ראה הכל"
          onClick={() => navigate('/RequestsPage')}
          isDisabled={false}
          icon={'←'}
        />
      </div>

      <div className="requests-section__table-wrapper">
        <table className="requests-section__table">
          <thead className="requests-section__table-header">
            <tr className="requests-section__table-row">
              {columns.map(col => (
                <th key={col} className="requests-section__table-cell">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="requests-section__table-body">
            {requests.map((request: IRequest) => (
              <tr key={request.id} className="requests-section__table-row">
                <td className="requests-section__table-cell requests-section__table-cell--status">
                  <div
                    className={`requests-section__status-dot requests-section__status-dot--${getStatusColor(
                      request.requestStatus?.requestStatus
                    )}`}
                  ></div>
                  <span className="requests-section__status-text">
                    {getStatusLabel(request.requestStatus?.requestStatus)}
                  </span>
                </td>
                <td className="requests-section__table-cell requests-section__table-cell--name">
                  {request.requestDetails?.requestName ?? 'בקשה חדשה'}
                </td>
                <td className="requests-section__table-cell requests-section__table-cell--assigned">
                  {request.requestStatus?.assignedTo?.length
                    ? request.requestStatus.assignedTo.join(', ')
                    : 'לא משויך'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="requests-section__empty-state">
            אין בקשות להצגה כרגע
          </div>
        )}
        {data.length > 10 && (
          <div className="requests-section__table-footer">
            <span className="requests-section__showing-note">
              מציג 10 מתוך {data.length} בקשות
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsSection;
