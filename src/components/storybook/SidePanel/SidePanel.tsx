import React, { useState, useEffect } from "react";
import "./SidePanel.scss";
import EmptyState from "../../EmptyState";
import Button from "../Button/Button";
import { Icons } from "../icons/EmojiIcons";
import FormField from "../FormField/FormField";

export interface IFilterOption {
  key: string;
  label: string;
  name: string;
  type?: "select" | "text" | "multi-select"; 
  options?: { value: string; label: string }[]; // for select
  dependsOn?: string; // key of the filter this depends on
  getOptions?: (selectedValues: Record<string, string>) => { value: string; label: string }[]; // dynamic options based on other filters
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
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  // Clear filter values when panel is closed
  useEffect(() => {
    if (!isOpen) {
      setFilterValues({});
    }
  }, [isOpen]);

  // Sync filter values when panel is opened
  useEffect(() => {
    if (isOpen) {
      // Initialize with empty values to ensure proper state
      const initialValues: Record<string, string> = {};
      filterOptions.forEach(filter => {
        initialValues[filter.key] = '';
      });
      setFilterValues(initialValues);
    }
  }, [isOpen, filterOptions]);

  const handleFilterChange = (key: string, value: string) => {
    console.log('handleFilterChange:', { key, value });
    
    // Find dependent filters that need to be cleared
    const dependentFilters = filterOptions.filter(filter => filter.dependsOn === key);
    
    // Create new filter values with the changed value and cleared dependent filters
    const newFilterValues = { ...filterValues, [key]: value };
    dependentFilters.forEach(filter => {
      newFilterValues[filter.key] = '';
      console.log('Clearing dependent filter:', filter.key);
    });
    
    // Update state with all changes at once
    setFilterValues(newFilterValues);
    
    // Call onFilterChange for the main filter change
    onFilterChange?.({ key, value });
    
    // Call onFilterChange for each cleared dependent filter
    dependentFilters.forEach(filter => {
      onFilterChange?.({ key: filter.key, value: '' });
    });
  };

  const handleMultiSelectChange = (key: string, value: string[] | string) => {
    console.log('handleMultiSelectChange:', { key, value });
    
    // Handle both array and string values for backward compatibility
    let newValues: string[];
    
    if (Array.isArray(value)) {
      // FormField multi-select passes an array
      newValues = value;
    } else {
      // Legacy string handling (comma-separated)
      const currentValues = filterValues[key] ? filterValues[key].split(',').filter(v => v.trim()) : [];
      newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
    }
    
    const newValue = newValues.join(',');
    console.log('Multi-select new value:', newValue);
    
    // Find dependent filters that need to be cleared
    const dependentFilters = filterOptions.filter(filter => filter.dependsOn === key);
    
    // Create new filter values with the changed value and cleared dependent filters
    const newFilterValues = { ...filterValues, [key]: newValue };
    dependentFilters.forEach(filter => {
      newFilterValues[filter.key] = '';
      console.log('Clearing dependent filter from multi-select:', filter.key);
    });
    
    // Update state with all changes at once
    setFilterValues(newFilterValues);
    
    // Call onFilterChange for the main filter change
    onFilterChange?.({ key, value: newValue });
    
    // Call onFilterChange for each cleared dependent filter
    dependentFilters.forEach(filter => {
      onFilterChange?.({ key: filter.key, value: '' });
    });
  };

  const handleClearAll = () => {
    console.log('handleClearAll called - clearing all filters');
    // Clear the local state
    setFilterValues({});
    
    // Call the parent's clear function if provided
    if (onClearFilters) {
      console.log('Calling parent onClearFilters');
      onClearFilters();
    }
  };

  const handleClose = () => {
    console.log('handleClose called - clearing filters and closing panel');
    // Clear filters when closing the panel
    setFilterValues({});
    onClearFilters?.();
    onClose();
  };

  const getFilterOptions = (filter: IFilterOption) => {
    if (filter.getOptions) {
      return filter.getOptions(filterValues);
    }
    return filter.options || [];
  };

  const renderFilterInput = (filter: IFilterOption) => {
    const currentValue = filterValues[filter.key];
    const options = getFilterOptions(filter);

    switch (filter.type) {
      case "text":
        return (
          <FormField // search by text
            id={filter.key}
            type="text"
            value={currentValue || ""}
            placeholder={`חפש לפי: ${filter.label.toLowerCase()}...`}
            onChange={(e) => handleFilterChange(filter.key, e as string)}
            showClear={true}
            icon={Icons.search} 
          />
        );

      case "multi-select": {
        const multiSelectValue = currentValue && currentValue.trim() 
          ? currentValue.split(',').filter(v => v.trim()) 
          : [];
        console.log('Rendering multi-select FormField:', { 
          key: filter.key, 
          currentValue, 
          multiSelectValue 
        });
        return (
          <FormField
            id={filter.key}
            type="multi-select"
            value={multiSelectValue}
            placeholder={`בחר ${filter.label.toLowerCase()}...`}
            onChange={(e) => handleMultiSelectChange(filter.key, e as string[])}
            options={options}
            hasDropdown={true}
            showClear={true}
          />
        );
      }

      case "select":
      default:
        return (
          <FormField
            id={filter.key}
            type="select"
            value={currentValue || ""}
            placeholder={`חפש לפי: ${filter.label.toLowerCase()}`}
            onChange={(e) => handleFilterChange(filter.key, e as string)}
            options={options}
            hasDropdown={true}
            showClear={true}
          />
        );
    }
  };

  const renderSidePanelContent = () => {
    switch (mode) {
      case "filter":
        return (
          <div className="side-panel-section filter-section">
            <div className="filter-header">
              <h3>Filter Requests</h3>
              {filterOptions.length > 0 && (
                <Button
                  type="secondary"
                  size="small"
                  btnText="Clear All"
                  onClick={handleClearAll}
                />
              )}
            </div>
            {filterOptions.length > 0 ? (
              filterOptions.map((filter) => (
                <div key={filter.key} className="filter-item">
                  <label>{filter.label}</label>
                  {renderFilterInput(filter)}
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
          onClick={handleClose}
          icon={
            Icons.close
          }
        />
      </div>
      {renderSidePanelContent()}
    </div>
  );
};

export default SidePanel;
