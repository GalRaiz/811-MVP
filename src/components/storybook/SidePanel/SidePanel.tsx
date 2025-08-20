import React from "react";
import "./SidePanel.scss";
import EmptyState from "../../EmptyState";
import Button from "../Button/Button";

export interface IFilterOption {
  key: string;
  label: string;
  type?: "select" | "text"; 
  options?: { value: string; label: string }[]; // for select
}

export interface IDetailItem {
  label: string;
  value: string;
}

interface ISidePanelProps {
  mode: "filter" | "details";
  filterOptions?: IFilterOption[];
  onFilterChange?: (filter: { key: string; value: string }) => void;
  onClearFilters?: () => void;
  detailsData?: IDetailItem[] | React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const SidePanel: React.FC<ISidePanelProps> = ({
  mode,
  filterOptions = [],
  onFilterChange,
  onClearFilters,
  detailsData = [],
  onClose,
  isOpen,
}) => {
  const renderSidePanelContent = () => {
    switch (mode) {
      case "filter":
        return (
          <div className="side-panel-section filter-section">
            <div className="filter-header">
              <h3>Filter Requests</h3>
              {onClearFilters && (
                <Button
                  type="secondary"
                  size="small"
                  btnText="Clear All"
                  onClick={onClearFilters}
                />
              )}
            </div>
            {filterOptions.length > 0 ? (
              filterOptions.map((filter) => (
                <div key={filter.key} className="filter-item">
                  <label>{filter.label}</label>
                  {filter.type === "text" ? (
                    <input
                      type="text"
                      placeholder={`Search ${filter.label.toLowerCase()}...`}
                      onChange={(e) => onFilterChange?.({ key: filter.key, value: e.target.value })}
                    />
                  ) : (
                    <select
                      onChange={(e) =>
                        onFilterChange?.({ key: filter.key, value: e.target.value })
                      }
                    >
                      <option value="">All {filter.label}</option>
                      {filter.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        );

      case "details":
        return (
          <div className="side-panel-section">
            <h3>Request Details</h3>
            {detailsData && Array.isArray(detailsData) && detailsData.length > 0 ? (
              detailsData.map((item, idx) => (
                <div key={idx} className="detail-item">
                  <div className="detail-label">{item.label}</div>
                  <div className="detail-value">{item.value}</div>
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
      <div className="side-panel-header">
        <h3>{mode === "filter" ? "Filter Requests" : "Request Details"}</h3>
        <Button
          type="close"
          size="small"
          onClick={onClose}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          }
        />
      </div>
      {renderSidePanelContent()}
    </div>
  );
};

export default SidePanel;
