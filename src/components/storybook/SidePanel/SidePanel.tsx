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
  options?: { value: string; label: string }[];
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
  title?: string; // Optional title for the panel
}

const SidePanel: React.FC<ISidePanelProps> = ({
  mode,
  filterOptions = [],
  onFilterChange,
  onClearFilters,
  detailsData = [],
  onClose,
  isOpen,
  title,
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
      // Handle string value (fallback)
      newValues = value ? [value] : [];
    }

    // Convert array back to string for consistency with existing logic
    const stringValue = newValues.join(',');
    handleFilterChange(key, stringValue);
  };

  const handleClearAll = () => {
    setFilterValues({});
    onClearFilters?.();
  };

  const getCurrentValue = (key: string): string => {
    return filterValues[key] || '';
  };

  const getOptions = (filter: IFilterOption): { value: string; label: string }[] => {
    if (filter.getOptions) {
      return filter.getOptions(filterValues);
    }
    return filter.options || [];
  };

  const isDisabled = (filter: IFilterOption): boolean => {
    if (!filter.dependsOn) return false;
    const parentValue = filterValues[filter.dependsOn];
    return !parentValue || parentValue.trim() === '';
  };

  const renderFilterInput = (filter: IFilterOption) => {
    const currentValue = getCurrentValue(filter.key);
    const options = getOptions(filter);
    const disabled = isDisabled(filter);

    switch (filter.type) {
      case 'multi-select':
        return (
          <FormField
            id={filter.key}
            type="multi-select"
            value={currentValue ? currentValue.split(',').filter(Boolean) : []}
            placeholder={
              disabled
                ? 'תחילה בחר'
                : `חפש לפי: ${filter.label.toLowerCase()}`
            }
            onChange={e => handleMultiSelectChange(filter.key, e as string[])}
            options={options}
            hasDropdown={true}
            showClear={true}
            disabled={disabled}
          />
        );

      case 'text':
        return (
          <FormField
            id={filter.key}
            type="text"
            value={currentValue}
            placeholder={`חפש לפי: ${filter.label.toLowerCase()}`}
            onChange={e => handleFilterChange(filter.key, e as string)}
            showClear={true}
          />
        );

      case 'select':
      default:
        return (
          <FormField
            id={filter.key}
            type="select"
            value={currentValue}
            placeholder={
              disabled
                ? 'תחילה בחר'
                : `חפש לפי: ${filter.label.toLowerCase()}`
            }
            onChange={e => handleFilterChange(filter.key, e as string)}
            options={options}
            hasDropdown={true}
            showClear={true}
            disabled={disabled}
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
              <h5>{title || 'Filter Options'}</h5>
              {filterOptions.length > 0 && (
                <Button
                  type="secondary"
                  size="small"
                  btnText="Clear All"
                  onClick={handleClearAll}
                  icon={Icons.refresh}
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
              <div className="empty-state">
                <div className="empty-state__icon">🔍</div>
                <div className="empty-state__title">No Filters Available</div>
                <div className="empty-state__description">
                  There are no filter options configured for this view.
                </div>
              </div>
            )}
          </div>
        );

      case 'details':
        return (
          <div className="side-panel__section">
            <h5>{title || 'Details'}</h5>
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
              <div className="empty-state">
                <div className="empty-state__icon">📋</div>
                <div className="empty-state__title">No Details Available</div>
                <div className="empty-state__description">
                  Select an item to view its details.
                </div>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="empty-state">
            <div className="empty-state__icon">❓</div>
            <div className="empty-state__title">Unknown Mode</div>
            <div className="empty-state__description">
              The side panel is in an unknown mode.
            </div>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`side-panel ${isOpen ? 'side-panel--open' : ''}`}>
      <div className="side-panel__header">
        <Button
          type="icon-only"
          size="small"
          onClick={onClose}
          icon={Icons.close}
        />
      </div>
      {renderSidePanelContent()}
    </div>
  );
};

export default SidePanel;
