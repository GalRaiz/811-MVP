import React from 'react';
import './SidePanel.scss';
import EmptyState from '../EmptyState.tsx';
import { IRequest } from '../../store/types.ts';

interface ISidePanelProps {
  sidePanelType: 'filterRequests' | 'requestDetails';
  filterType?: string;
  onFilterChange: (filterType: string) => void;
  onClose: () => void;
  isOpen: boolean;
  request?: IRequest;
}

const SidePanel: React.FC<ISidePanelProps> = ({
  sidePanelType,
  filterType,
  onFilterChange,
  onClose,
  isOpen,
  request,
}) => {
  const sidePanelDetails = () => {
    switch (sidePanelType) {
      case 'filterRequests':
        return (
          <div>
            <h3>Filter request by Type</h3>
            <select
              value={filterType}
              onChange={e => onFilterChange(e.target.value)}
            >
              <option value=''>All Types</option>
            </select>
          </div>
        );

      case 'requestDetails':
        return (
          <div>
            {request && (
              <div className='side-panel-content'>
                <h2>{request.requesterDetails.requestName}</h2>
                <h3>{request.requestDetails.requestType}</h3>
                {request.requestDetails.requestSubType?.map((subType: string) => (
                  <p key={subType}>{subType}</p>
                ))}

                <h3>סטטוס</h3>
                <p>{request.requestStatus.requestStatus}</p>
                <p>{request.requestStatus.createdAt}</p>
                <p>{request.requestStatus.updatedAt}</p>
                <h3>פרטים</h3>
                <p>{request.requestDetails.requestDescription}</p>
                <h3>מי צריך עזרה</h3>
                <p>{request.requesterDetails.requestName}</p>
                <p>{request.requesterDetails.phone}</p>
                <h3>כתובת</h3>
                <p>{request.requesterDetails.district}</p>
                <p>{request.requesterDetails.city}</p>
                <p>{request.requesterDetails.street}</p>
                <h3>פרטים נוספים</h3>
                <p>{request.requestDetails.needTransportation}</p>
                <p>{request.requestDetails.needVolunteers}</p>
                <p>{request.requestDetails.attachment}</p>
              </div>
            )}
          </div>
        );

      default:
        return <EmptyState />;
    }
  };

  if (!isOpen) return null;
  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      <button className='close-btn' onClick={onClose}>
        X
      </button>
      {sidePanelDetails()}
    </div>
  );
};

export default SidePanel;
