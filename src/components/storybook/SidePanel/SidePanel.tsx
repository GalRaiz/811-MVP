import React from "react";
import "./SidePanel.scss";
import EmptyState from "../../EmptyState";

interface IFilterOption {
  key: string;
  label: string;
}

export interface IDetailItem {
  label: string;
  value: string;
}

interface ISidePanelProps {
  sidePanelType: "filter" | "details";
  filterOptions?: IFilterOption[];
  selectedFilter?: string;
  onFilterChange?: (filterKey: string) => void;

  detailsData?: IDetailItem[] | React.ReactNode;

  onClose: () => void;
  isOpen: boolean;
}

const SidePanel: React.FC<ISidePanelProps> = ({
  sidePanelType,
  filterOptions = [],
  selectedFilter,
  onFilterChange,
  detailsData = [],
  onClose,
  isOpen,
}) => {
  const renderSidePanelContent = () => {
    switch (sidePanelType) {
      case "filter":
        return (
          <div className="side-panel-section">
            <h3>Filter Requests</h3>
            <select
              value={selectedFilter}
              onChange={(e) => onFilterChange?.(e.target.value)}
            >
              <option value="">All</option>
              {filterOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "details":
        return (
          <div className="side-panel-section">
            <h3>Details</h3>
            {detailsData && Array.isArray(detailsData) && detailsData.length > 0 ? (
              detailsData.map((item, idx) => (
                <div key={idx} className="detail-item">
                  <strong>{item.label}:</strong>
                  <p>{item.value}</p>
                </div>
              ))
            ) : (
              <EmptyState />
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
      {renderSidePanelContent()}
    </div>
  );
};

export default SidePanel;
