import React from "react";
import "./SidePanel.scss";
import EmptyState from "../EmptyState.tsx";

interface ISidePanelProps {
  sidePanelType: "filterRequests" | "requestDetails";
  filterType?: string;
  onFilterChange: (filterType: string) => void;
  onClose: () => void;
  isOpen: boolean;
  request?: {
    requestName: string;
    requestType: string;
    requestSubType: string[];
    requestStatus: string;
    createdAt: number;
    updatedAt: number;
    district: string;
    city: string;
    street?: string;
    requesterName: string;
    requesterPhone: string;
    needTransportation: boolean;
    needVolunteers: boolean;
    description?: string ;
    attachment?: string;
};
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
      case "filterRequests":
        return (
          <div>
            <h3>Filter request by Type</h3>
            <select
              value={filterType}
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <option value="">All Types</option>

            </select>
          </div>
        );

      case "requestDetails":
        return (
          <div>
            {request && (
              <div className="side-panel-content">
                <h2>{request.requestName}</h2>
                <h3>{request.requestType}</h3>
                {request.requestSubType.map((subType: string) => (
                  <p key={subType}>{subType}</p>
                ))}
                <h3>סטטוס</h3>
                <p>{request.requestStatus}</p>
                <p>{request.createdAt}</p>
                <p>{request.updatedAt}</p>
                <h3>פרטים</h3>
                <p>{request.description}</p>
                <h3>מי צריך עזרה</h3>
                <p>{request.requesterName}</p>
                <p>{request.requesterPhone}</p>
                <h3>כתובת</h3>
                <p>{request.district}</p>
                <p>{request.city}</p>
                <p>{request.street}</p>
                <h3>פרטים נוספים</h3>
                <p>{request.needTransportation}</p>
                <p>{request.needVolunteers}</p>
                <p>{request.attachment}</p>
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
    <div className={`side-panel ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      {sidePanelDetails()}
    </div>
  );
};

export default SidePanel;
