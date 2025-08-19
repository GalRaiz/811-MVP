import React from 'react';
import './RequestsSection.scss';
import { IRequest, RootState } from '../store/types';
import { useSelector } from 'react-redux';
import Button from './storybook/Button/Button';
import { useNavigate } from 'react-router-dom';

const RequestsSection: React.FC = () => {
  const navigate = useNavigate();
  const requests = useSelector(
    (state: RootState) => state.requests.requestsData
  );
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
    <div className='requests-section'>
      <div className='section-header'>
        <div className='header-content'>
          <h2>בקשות</h2>
          <p className='subtitle'>בקשות סיוע אחרונות שהוספת למערכת</p>
        </div>
        <Button
          type='tertiary'
          btnText='ראה הכל'
          onClick={() => navigate('/RequestsPage')}
          isDisabled={false}
          icon={"←"}
        />
      </div>

      <div className='requests-table-wrapper'>
        <table className='requests-table'>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col} className='table-header'>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map((request: IRequest) => (
              <tr key={request.id} className='table-row'>
                <td className='cell status'>
                  <div
                    className={`status-dot ${getStatusColor(
                      request.requestStatus
                    )}`}
                  ></div>
                  <span>{request.requestStatus ?? 'לא ידוע'}</span>
                </td>
                <td className='cell name'>{request.requestName ?? '—'}</td>
                <td className='cell assigned-to'>
                  {request.assignedTo?.length
                    ? request.assignedTo.join(', ')
                    : 'לא משויך'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className='empty-state'>אין בקשות להצגה כרגע</div>
        )}
      </div>
    </div>
  );
};

export default RequestsSection;
