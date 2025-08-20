import React, { useState, useEffect } from "react";
import "./FilterModal.scss";
import { IFilterOption } from "../SidePanel/SidePanel";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterOptions: IFilterOption[];
  onFilterChange: (filters: Record<string, string>) => void;
  currentFilters: Record<string, string>;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filterOptions,
  onFilterChange,
  currentFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<Record<string, string>>(currentFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<Record<string, string>>(currentFilters);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(localFilters);
    }, 300);

    return () => clearTimeout(timer);
  }, [localFilters]);

  // Apply debounced filters
  useEffect(() => {
    onFilterChange(debouncedFilters);
  }, [debouncedFilters, onFilterChange]);

  // Reset local filters when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearAll = () => {
    const clearedFilters = Object.keys(localFilters).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {} as Record<string, string>);
    setLocalFilters(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="filter-modal-header">
          <h3>Filter Requests</h3>
          <button className="close-btn" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="filter-modal-content">
          {filterOptions.map((filter) => (
            <div key={filter.key} className="filter-item">
              <label>{filter.label}</label>
              {filter.type === "text" ? (
                <input
                  type="text"
                  placeholder={`Search ${filter.label.toLowerCase()}...`}
                  value={localFilters[filter.key] || ""}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                />
              ) : (
                <select
                  value={localFilters[filter.key] || ""}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
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
          ))}
        </div>

        <div className="filter-modal-footer">
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All
          </button>
          <button className="apply-btn" onClick={onClose}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
