import React, { useState, useEffect } from 'react';
import './SidePanel.scss';
import EmptyState from '../EmptyState/EmptyState';
import Button from '../Button/Button';
import { Icons } from '../icons/EmojiIcons';
import FormField from '../FormField/FormField';
import { DisplayField, DisplayGroup } from '../FormField/DisplayField';

export interface IFilterOption {
  key: string;
  label: string;
  name: string;
  type?: 'select' | 'text' | 'multi-select';
  options?: { value: string; label: string }[]; // for select
  dependsOn?: string; // key of the filter this depends on
  getOptions?: (
    selectedValues: Record<string, string>
  ) => { value: string; label: string }[]; // dynamic options based on other filters
}

export interface IDetailItem {
  label: string;
  value: string;
}

interface ISidePanelProps {
  mode: 'filter' | 'details';
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
    const dependentFilters = filterOptions.filter(
      filter => filter.dependsOn === key
    );

    // Create new filter values with the changed value and cleared dependent filters
    const newFilterValues = { ...filterValues, [key]: value };
    dependentFilters.forEach(filter => {
      newFilterValues[filter.key] = '';
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
      const currentValues = filterValues[key]
        ? filterValues[key].split(',').filter(v => v.trim())
        : [];
      newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
    }

    const newValue = newValues.join(',');
    console.log('Multi-select new value:', newValue);

    // Find dependent filters that need to be cleared
    const dependentFilters = filterOptions.filter(
      filter => filter.dependsOn === key
    );

    // Create new filter values with the changed value and cleared dependent filters
    const newFilterValues = { ...filterValues, [key]: newValue };
    dependentFilters.forEach(filter => {
      newFilterValues[filter.key] = '';
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

    // Check if this filter depends on another filter and if that dependency is not selected
    const isDisabled: boolean = Boolean(
      filter.dependsOn && !filterValues[filter.dependsOn]?.trim()
    );

    switch (filter.type) {
      case 'text':
        return (
          <FormField // search by text
            id={filter.key}
            type="text"
            value={currentValue || ''}
            placeholder={`חפש לפי: ${filter.label.toLowerCase()}...`}
            onChange={e => handleFilterChange(filter.key, e as string)}
            showClear={true}
            icon={Icons.search}
            disabled={isDisabled}
          />
        );

      case 'multi-select': {
        const multiSelectValue =
          currentValue && currentValue.trim()
            ? currentValue.split(',').filter(v => v.trim())
            : [];
        console.log('Rendering multi-select FormField:', {
          key: filter.key,
          currentValue,
          multiSelectValue,
        });
        return (
          <FormField
            id={filter.key}
            type="multi-select"
            value={multiSelectValue}
            placeholder={
              isDisabled
                ? 'בחר תחילה סוג...'
                : `בחר ${filter.label.toLowerCase()}...`
            }
            onChange={e => handleMultiSelectChange(filter.key, e as string[])}
            options={options}
            hasDropdown={true}
            showClear={true}
            disabled={isDisabled}
          />
        );
      }

      case 'select':
      default:
        return (
          <FormField
            id={filter.key}
            type="select"
            value={currentValue || ''}
            placeholder={
              isDisabled
                ? 'תחילה בחר'
                : `חפש לפי: ${filter.label.toLowerCase()}`
            }
            onChange={e => handleFilterChange(filter.key, e as string)}
            options={options}
            hasDropdown={true}
            showClear={true}
            disabled={isDisabled}
          />
        );
    }
  };

  const renderSidePanelContent = () => {
    switch (mode) {
      case 'filter':
        return (
          <div className="side-panel__section side-panel__section--filter">
            <div className="side-panel__filter-header">
              <h5>Filter Options</h5>
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
              filterOptions.map(filter => (
                <div key={filter.key} className="side-panel__filter-item">
                  <label>{filter.label}</label>
                  {renderFilterInput(filter)}
                </div>
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        );

      case 'details':
        return (
          <div className="side-panel__section">
            {detailsData &&
            Array.isArray(detailsData) &&
            detailsData.length > 0 ? (
              <DisplayGroup layout="vertical" compact={false}>
                {detailsData.map((item, idx) => (
                  <DisplayField
                    key={idx}
                    label={item.label}
                    value={item.value}
                    valueVariant="secondary"
                    valueSize="normal"
                  />
                ))}
              </DisplayGroup>
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
    <div className={`side-panel ${isOpen ? 'side-panel--open' : ''}`}>
      <div className="side-panel__header">
        <Button
          type="close"
          size="small"
          onClick={handleClose}
          icon={Icons.close}
        />
      </div>
      {renderSidePanelContent()}
    </div>
  );
};

export default SidePanel;
