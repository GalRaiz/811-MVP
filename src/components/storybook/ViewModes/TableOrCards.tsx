import { useState, useCallback, useMemo, useEffect } from 'react';
import Table, { Column } from '../Table/Table';
import SidePanel from '../SidePanel/SidePanel';
import SearchBar from '../FormField/SearchBar';
import EmptyState from '../EmptyState/EmptyState';
import Modal from '../Modal/Modal';
import Card from '../Card/Card';
import Button from '../Button/Button';
import { getNestedValue } from '../../../utils/getNestedValue';

import './TableOrCards.scss';
import { Icons } from '../icons/EmojiIcons';

// Types
export type ViewMode = 'table' | 'cards';

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

export interface ICardRenderer<T> {
  title: (item: T) => string;
  description?: (item: T) => string;
  imageUrl?: (item: T) => string | undefined;
  metaData?: (item: T) => { label: string; icon: string }[];
}

export interface TableOrCardsProps<T> {
  data: T[];
  columns: Column<T>[];
  filterOptions?: IFilterOption[];
  onFilterChange?: (filters: Record<string, string>) => void;
  panelRenderer?: (row: T) => IDetailItem[];
  searchField?: string;
  searchPlaceholder?: string;
  defaultViewMode?: ViewMode;
  cardRenderer: ICardRenderer<T>;
  showViewToggle?: boolean;
  onViewModeChange?: (mode: ViewMode) => void;
}

// Custom hooks for better separation of concerns
const useSearchAndFilter = <T extends { id: string | number }>(
  data: T[],
  searchField?: string,
  filterOptions: IFilterOption[] = [],
  onFilterChange?: (filters: Record<string, string>) => void
) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [debouncedFilters, setDebouncedFilters] = useState<
    Record<string, string>
  >({});

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Debounce filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  // Apply debounced filters to parent
  useEffect(() => {
    onFilterChange?.(debouncedFilters);
  }, [debouncedFilters, onFilterChange]);

  const handleFilterChange = useCallback(
    (filterChange: { key: string; value: string }) => {
      setFilters(prev => ({ ...prev, [filterChange.key]: filterChange.value }));
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setDebouncedFilters({});
    setSearchQuery('');
    setDebouncedSearchQuery('');
    onFilterChange?.({});
  }, [onFilterChange]);

  const filteredData = useMemo(() => {
    console.log('Filtering data:', {
      totalData: data.length,
      debouncedFilters,
      debouncedSearchQuery,
    });

    const result = data.filter(row => {
      // Search filtering
      const query = debouncedSearchQuery.toLowerCase();
      let matchesSearch = true;

      if (query && searchField) {
        // Search on specific field
        const fieldValue = getNestedValue(
          row as Record<string, unknown>,
          searchField
        );
        matchesSearch = String(fieldValue).toLowerCase().includes(query);
      } else if (query) {
        // Search on all values if no specific field - enhanced to search nested objects and displayed labels
        const searchInObject = (obj: unknown): boolean => {
          if (obj === null || obj === undefined) return false;

          if (typeof obj === 'string') {
            return obj.toLowerCase().includes(query);
          }

          if (typeof obj === 'number') {
            return String(obj).toLowerCase().includes(query);
          }

          if (Array.isArray(obj)) {
            return obj.some(item => searchInObject(item));
          }

          if (typeof obj === 'object') {
            return Object.values(obj as Record<string, unknown>).some(value =>
              searchInObject(value)
            );
          }

          return false;
        };

        // Search in the raw data
        const matchesRawData = searchInObject(row);

        // Also search in displayed labels for specific fields
        let matchesDisplayedLabels = false;

        // Search in displayed labels for IRequest type
        if ('requestDetails' in row && row.requestDetails) {
          const requestDetails = row.requestDetails as Record<string, unknown>;

          // Search in request type label
          if (requestDetails.requestType) {
            const requestType = requestDetails.requestType as Record<string, unknown>;
            if (requestType.label && String(requestType.label).toLowerCase().includes(query)) {
              matchesDisplayedLabels = true;
            }
          }

          // Search in request sub-type labels
          if (
            requestDetails.requestSubType &&
            Array.isArray(requestDetails.requestSubType)
          ) {
            const subTypeLabels = (requestDetails.requestSubType as Record<string, unknown>[])
              .map((subType: Record<string, unknown>) => subType.label)
              .filter(label => label)
              .join(' ');
            if (subTypeLabels.toLowerCase().includes(query)) {
              matchesDisplayedLabels = true;
            }
          }
        }

        // Search in request status label
        if ('requestStatus' in row && row.requestStatus) {
          const requestStatus = row.requestStatus as Record<string, unknown>;
          if (requestStatus.requestStatus) {
            const statusLabels: Record<string, string> = {
              pending: 'ממתין',
              'in-progress': 'בטיפול',
              completed: 'הושלם',
              cancelled: 'בוטל',
            };
            const statusLabel =
              statusLabels[requestStatus.requestStatus as string];
            if (statusLabel && statusLabel.toLowerCase().includes(query)) {
              matchesDisplayedLabels = true;
            }
          }
        }

        matchesSearch = matchesRawData || matchesDisplayedLabels;
      }

      // Filter filtering
      const matchesFilters = Object.entries(debouncedFilters).every(
        ([key, value]) => {
          if (!value) return true;

          // Find the filter option to get the name field for filtering
          const filterOption = filterOptions.find(opt => opt.key === key);
          if (filterOption && filterOption.name) {
            // Get the actual field value from the data
            const fieldValue = getNestedValue(
              row as Record<string, unknown>,
              filterOption.name
            );

            // For multi-select filters, check if any of the selected values match
            if (filterOption.type === 'multi-select') {
              const selectedValues = value
                .split(',')
                .map(v => v.trim())
                .filter(v => v);
              if (Array.isArray(fieldValue)) {
                // If field value is an array, check if any selected value is in the array
                const matches = selectedValues.some(selectedValue =>
                  fieldValue.some(item => {
                    // Handle object items (like requestSubType which contains objects with id, label, name)
                    if (item && typeof item === 'object' && 'id' in item) {
                      return item.id === selectedValue;
                    }
                    return String(item) === selectedValue;
                  })
                );
                console.log('Multi-select filter:', {
                  key,
                  selectedValues,
                  fieldValue,
                  matches,
                });
                return matches;
              } else {
                // If field value is a single value, check if it matches any selected value
                const matches = selectedValues.some(selectedValue => {
                  // Handle object field value
                  if (fieldValue && typeof fieldValue === 'object' && 'id' in fieldValue) {
                    return fieldValue.id === selectedValue;
                  }
                  return String(fieldValue) === selectedValue;
                });
                console.log('Multi-select filter (single):', {
                  key,
                  selectedValues,
                  fieldValue,
                  matches,
                });
                return matches;
              }
            }
            // For select filters, we need to match the value exactly
            else if (filterOption.type === 'select') {
              let matches = false;
              
              // Handle object fields (like requestType which is an object with id, label, name)
              if (fieldValue && typeof fieldValue === 'object' && 'id' in fieldValue) {
                matches = fieldValue.id === value;
              } else {
                matches = String(fieldValue) === value;
              }
              
              console.log('Select filter:', {
                key,
                value,
                fieldValue,
                matches,
              });
              return matches;
            } else {
              // For text filters, use contains matching
              const matches = String(fieldValue)
                .toLowerCase()
                .includes(value.toLowerCase());
              console.log('Text filter:', { key, value, fieldValue, matches });
              return matches;
            }
          } else {
            // Fallback to original behavior if no name field is specified
            const fieldValue = getNestedValue(
              row as Record<string, unknown>,
              key
            );
            const matches = String(fieldValue)
              .toLowerCase()
              .includes(value.toLowerCase());
            console.log('Fallback filter:', {
              key,
              value,
              fieldValue,
              matches,
            });
            return matches;
          }
        }
      );

      return matchesSearch && matchesFilters;
    });

    console.log('Filter result:', {
      totalData: data.length,
      filteredCount: result.length,
    });

    return result;
  }, [
    data,
    debouncedSearchQuery,
    searchField,
    debouncedFilters,
    filterOptions,
  ]);

  const hasActiveFilters = useMemo(() => {
    return (
      Object.values(debouncedFilters).some(v => v.trim() !== '') ||
      debouncedSearchQuery.trim() !== ''
    );
  }, [debouncedFilters, debouncedSearchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    handleFilterChange,
    handleClearFilters,
    filteredData,
    hasActiveFilters,
  };
};

const useViewMode = (
  defaultViewMode: ViewMode = 'table',
  onViewModeChange?: (mode: ViewMode) => void
) => {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode);

  const handleViewModeChange = useCallback(
    (mode: ViewMode) => {
      setViewMode(mode);
      onViewModeChange?.(mode);
    },
    [onViewModeChange]
  );

  return {
    viewMode,
    handleViewModeChange,
  };
};

const useModal = <T,>() => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = useCallback((item: T) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
    setIsModalOpen(false);
  }, []);

  return {
    selectedItem,
    isModalOpen,
    handleItemClick,
    handleCloseModal,
  };
};

const useCardFilterPanel = () => {
  const [isCardFilterPanelOpen, setIsCardFilterPanelOpen] = useState(false);

  const handleCardFilterButtonClick = useCallback(() => {
    setIsCardFilterPanelOpen(true);
  }, []);

  const handleCloseCardFilterPanel = useCallback(() => {
    setIsCardFilterPanelOpen(false);
  }, []);

  return {
    isCardFilterPanelOpen,
    handleCardFilterButtonClick,
    handleCloseCardFilterPanel,
  };
};

const useTableFilterPanel = () => {
  const [isTableFilterPanelOpen, setIsTableFilterPanelOpen] = useState(false);

  const handleTableFilterButtonClick = useCallback(() => {
    setIsTableFilterPanelOpen(true);
  }, []);

  const handleCloseTableFilterPanel = useCallback(() => {
    setIsTableFilterPanelOpen(false);
  }, []);

  return {
    isTableFilterPanelOpen,
    setIsTableFilterPanelOpen,
    handleTableFilterButtonClick,
    handleCloseTableFilterPanel,
  };
};

// Main component
function TableOrCards<T extends { id: string | number }>({
  data,
  columns,
  filterOptions = [],
  onFilterChange,
  panelRenderer,
  searchField,
  searchPlaceholder,
  defaultViewMode = 'table',
  cardRenderer,
  showViewToggle = true,
  onViewModeChange,
}: TableOrCardsProps<T>) {
  const {
    searchQuery,
    setSearchQuery,
    handleFilterChange,
    handleClearFilters,
    filteredData,
    hasActiveFilters,
  } = useSearchAndFilter(data, searchField, filterOptions, onFilterChange);

  const { viewMode, handleViewModeChange } = useViewMode(
    defaultViewMode,
    onViewModeChange
  );

  const { selectedItem, isModalOpen, handleItemClick, handleCloseModal } =
    useModal<T>();

  const {
    isCardFilterPanelOpen,
    handleCardFilterButtonClick,
    handleCloseCardFilterPanel,
  } = useCardFilterPanel();
  const { isTableFilterPanelOpen, setIsTableFilterPanelOpen } =
    useTableFilterPanel();

  // State for selected row and panel mode
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [panelMode, setPanelMode] = useState<'filter' | 'details'>('filter');

  // Handle row click from table
  const handleTableRowClick = useCallback(
    (row: T) => {
      setSelectedRow(row);
      setPanelMode('details');
      setIsTableFilterPanelOpen(true);
    },
    [setIsTableFilterPanelOpen]
  );

  // Handle filter button click
  const handleTableFilterButtonClickWithMode = useCallback(() => {
    setPanelMode('filter');
    setIsTableFilterPanelOpen(true);
  }, [setIsTableFilterPanelOpen]);

  // Handle close panel
  const handleCloseTableFilterPanelWithReset = useCallback(() => {
    setSelectedRow(null);
    setIsTableFilterPanelOpen(false);
  }, [setIsTableFilterPanelOpen]);

  // Close filter panels when switching views
  const handleViewModeChangeWithPanelClose = useCallback(
    (mode: ViewMode) => {
      // Close any open filter panels when switching views
      if (isCardFilterPanelOpen) {
        handleCloseCardFilterPanel();
      }
      if (isTableFilterPanelOpen) {
        handleCloseTableFilterPanelWithReset();
      }
      handleViewModeChange(mode);
    },
    [
      handleViewModeChange,
      isCardFilterPanelOpen,
      handleCloseCardFilterPanel,
      isTableFilterPanelOpen,
      handleCloseTableFilterPanelWithReset,
    ]
  );

  // Adapter function to convert the filter change format for Table component
  const handleTableFilterChange = useCallback(
    (filters: Record<string, string | string[]>) => {
      // Convert array values to strings for compatibility
      const stringFilters: Record<string, string> = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          stringFilters[key] = value.join(',');
        } else {
          stringFilters[key] = value;
        }
      });
      onFilterChange?.(stringFilters);
    },
    [onFilterChange]
  );

  const renderViewToggle = () => {
    if (!showViewToggle) return null;

    return (
      <div className="table-or-cards__view-toggle">
        <Button
          type={viewMode === 'table' ? 'primary' : 'secondary'}
          size="medium"
          btnText="Table"
          onClick={() => handleViewModeChangeWithPanelClose('table')}
          icon={Icons.calendar}
        />
        <Button
          type={viewMode === 'cards' ? 'primary' : 'secondary'}
          size="medium"
          btnText="Cards"
          onClick={() => handleViewModeChangeWithPanelClose('cards')}
          icon={Icons.box}
        />
      </div>
    );
  };

  const renderTable = () => {
    console.log('Rendering table with filteredData:', {
      totalData: data.length,
      filteredDataLength: filteredData.length,
    });

    return (
      <div
        className={`table-or-cards__table-view ${isTableFilterPanelOpen ? 'table-or-cards__table-view--panel-open' : ''}`}
      >
        <div className="table-or-cards__table-content">
          <div className="table-or-cards__table-search">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              showFilterButton={filterOptions.length > 0}
              onFilterClick={handleTableFilterButtonClickWithMode}
              searchField={searchField}
              placeholder={searchPlaceholder}
            />
          </div>
          <Table
            data={filteredData}
            columns={columns}
            filterOptions={filterOptions}
            onFilterChange={handleTableFilterChange}
            panelRenderer={panelRenderer}
            searchField={searchField}
            searchPlaceholder={searchPlaceholder}
            disableInternalFiltering={true}
            onRowClick={handleTableRowClick}
          />
        </div>
        <SidePanel
          mode={panelMode}
          isOpen={isTableFilterPanelOpen}
          onClose={handleCloseTableFilterPanelWithReset}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          detailsData={
            selectedRow && panelRenderer ? panelRenderer(selectedRow) : []
          }
        />
      </div>
    );
  };

  const renderCards = () => (
    <div
      className={`table-or-cards__cards-layout ${isCardFilterPanelOpen ? 'table-or-cards__cards-layout--panel-open' : ''}`}
    >
      <div className="table-or-cards__cards-content">
        <div className="table-or-cards__cards-wrapper">
          <div className="table-or-cards__cards-search">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              showFilterButton={filterOptions.length > 0}
              onFilterClick={handleCardFilterButtonClick}
              searchField={searchField}
              placeholder={searchPlaceholder}
            />
          </div>
          <div className="table-or-cards__cards-grid">
            {filteredData.length > 0 ? (
              filteredData.map(item => (
                <Card
                  key={item.id}
                  cardType="marketplace"
                  title={cardRenderer.title(item)}
                  description={cardRenderer.description?.(item)}
                  imageUrl={cardRenderer.imageUrl?.(item)}
                  metaData={cardRenderer.metaData?.(item)}
                  buttons={[
                    {
                      btnText: 'פרטים נוספים',
                      onClick: () => handleItemClick(item),
                      icon: Icons.info,
                      type: 'secondary',
                    },
                    {
                      btnText: 'שייך משימה',
                      onClick: () => alert('טרם ממומש: שייך משימה'),
                    },
                  ]}
                />
              ))
            ) : (
              <div className="table-or-cards__cards-empty">
                {hasActiveFilters && (
                  <EmptyState
                    title="לא נמצאו תוצאות"
                    subtitle="נסה לשנות את הסינון כדי לראות את כל התוצאות."
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <SidePanel
        mode="filter"
        isOpen={isCardFilterPanelOpen}
        onClose={handleCloseCardFilterPanel}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
    </div>
  );

  return (
    <div className="table-or-cards">
      <div className="table-or-cards__controls">{renderViewToggle()}</div>

      {viewMode === 'table' ? renderTable() : renderCards()}

      {selectedItem && panelRenderer && isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Request Details"
          size="medium"
        >
          <div className="table-or-cards__modal-details">
            {panelRenderer(selectedItem).map((item, idx) => (
              <div key={idx} className="table-or-cards__modal-item">
                <div className="table-or-cards__modal-label">{item.label}</div>
                <div className="table-or-cards__modal-value">{item.value}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default TableOrCards;
