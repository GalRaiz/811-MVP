import { useState, useCallback, useMemo, useEffect } from "react";
import Table, { Column } from "../Table/Table";
import SidePanel from "../SidePanel/SidePanel";
import SearchBar from "../SearchBar";
import EmptyState from "../../EmptyState";
import Modal from "../Modal/Modal";
import Card from "../Card/Card";
import Button from "../Button/Button";
import { getNestedValue } from "../../../utils/getNestedValue";
import { getAssistanceTypeLabel, getAssistanceSubTypeLabel } from "../../../utils/assistanceTypeUtils";
import "./TableOrCards.scss";

// Types
export type ViewMode = "table" | "cards";

export interface IFilterOption {
  key: string;
  label: string;
  name: string;
  type?: "select" | "text" | "multi-select";
  options?: { value: string; label: string }[];
  dependsOn?: string; // key of the filter this depends on
  getOptions?: (selectedValues: Record<string, string>) => { value: string; label: string }[]; // dynamic options based on other filters
}

export interface IDetailItem {
  label: string;
  value: string;
}

export interface ICardRenderer<T> {
  title: (item: T) => string;
  description?: (item: T) => string;
  imageUrl?: (item: T) => string | undefined;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [debouncedFilters, setDebouncedFilters] = useState<Record<string, string>>({});

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

  const handleFilterChange = useCallback((filterChange: { key: string; value: string }) => {
    setFilters(prev => ({ ...prev, [filterChange.key]: filterChange.value }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setDebouncedFilters({});
    setSearchQuery("");
    setDebouncedSearchQuery("");
    onFilterChange?.({});
  }, [onFilterChange]);

  const filteredData = useMemo(() => {
    console.log('Filtering data:', { 
      totalData: data.length, 
      debouncedFilters, 
      debouncedSearchQuery
    });
    
    const result = data.filter(row => {
      // Search filtering
      const query = debouncedSearchQuery.toLowerCase();
      let matchesSearch = true;

      if (query && searchField) {
        // Search on specific field
        const fieldValue = getNestedValue(row as Record<string, unknown>, searchField);
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
            return Object.values(obj as Record<string, unknown>).some(value => searchInObject(value));
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
            const typeLabel = getAssistanceTypeLabel(requestDetails.requestType as string);
            if (typeLabel && typeLabel.toLowerCase().includes(query)) {
              matchesDisplayedLabels = true;
            }
          }
          
          // Search in request sub-type labels
          if (requestDetails.requestSubType && Array.isArray(requestDetails.requestSubType)) {
            const subTypeLabels = (requestDetails.requestSubType as string[]).map((subType: string) => 
              getAssistanceSubTypeLabel(subType)
            ).join(' ');
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
              'pending': 'ממתין',
              'in-progress': 'בטיפול',
              'completed': 'הושלם',
              'cancelled': 'בוטל'
            };
            const statusLabel = statusLabels[requestStatus.requestStatus as string];
            if (statusLabel && statusLabel.toLowerCase().includes(query)) {
              matchesDisplayedLabels = true;
            }
          }
        }
        
        matchesSearch = matchesRawData || matchesDisplayedLabels;
      }

      // Filter filtering
      const matchesFilters = Object.entries(debouncedFilters).every(([key, value]) => {
        if (!value) return true;
        
        // Find the filter option to get the name field for filtering
        const filterOption = filterOptions.find(opt => opt.key === key);
        if (filterOption && filterOption.name) {
          // Get the actual field value from the data
          const fieldValue = getNestedValue(row as Record<string, unknown>, filterOption.name);
          
          // For multi-select filters, check if any of the selected values match
          if (filterOption.type === "multi-select") {
            const selectedValues = value.split(',').map(v => v.trim()).filter(v => v);
            if (Array.isArray(fieldValue)) {
              // If field value is an array, check if any selected value is in the array
              const matches = selectedValues.some(selectedValue => 
                fieldValue.some(item => String(item) === selectedValue)
              );
              console.log('Multi-select filter:', { key, selectedValues, fieldValue, matches });
              return matches;
            } else {
              // If field value is a single value, check if it matches any selected value
              const matches = selectedValues.some(selectedValue => String(fieldValue) === selectedValue);
              console.log('Multi-select filter (single):', { key, selectedValues, fieldValue, matches });
              return matches;
            }
          }
          // For select filters, we need to match the value exactly
          else if (filterOption.type === "select") {
            const matches = String(fieldValue) === value;
            console.log('Select filter:', { key, value, fieldValue, matches });
            return matches;
          } else {
            // For text filters, use contains matching
            const matches = String(fieldValue).toLowerCase().includes(value.toLowerCase());
            console.log('Text filter:', { key, value, fieldValue, matches });
            return matches;
          }
        } else {
          // Fallback to original behavior if no name field is specified
          const fieldValue = getNestedValue(row as Record<string, unknown>, key);
          const matches = String(fieldValue).toLowerCase().includes(value.toLowerCase());
          console.log('Fallback filter:', { key, value, fieldValue, matches });
          return matches;
        }
      });

      return matchesSearch && matchesFilters;
    });
    
    console.log('Filter result:', { 
      totalData: data.length, 
      filteredCount: result.length
    });
    
    return result;
  }, [data, debouncedSearchQuery, searchField, debouncedFilters, filterOptions]);

  const hasActiveFilters = useMemo(() => {
    return Object.values(debouncedFilters).some(v => v.trim() !== '') || debouncedSearchQuery.trim() !== '';
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

const useViewMode = (defaultViewMode: ViewMode = "table", onViewModeChange?: (mode: ViewMode) => void) => {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    onViewModeChange?.(mode);
  }, [onViewModeChange]);

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
  defaultViewMode = "table",
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

  const { viewMode, handleViewModeChange } = useViewMode(defaultViewMode, onViewModeChange);

  const { selectedItem, isModalOpen, handleItemClick, handleCloseModal } = useModal<T>();

  const { isCardFilterPanelOpen, handleCardFilterButtonClick, handleCloseCardFilterPanel } = useCardFilterPanel();
  const { isTableFilterPanelOpen, setIsTableFilterPanelOpen } = useTableFilterPanel();

  // State for selected row and panel mode
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [panelMode, setPanelMode] = useState<"filter" | "details">("filter");

  // Handle row click from table
  const handleTableRowClick = useCallback((row: T) => {
    setSelectedRow(row);
    setPanelMode("details");
    setIsTableFilterPanelOpen(true);
  }, [setIsTableFilterPanelOpen]);

  // Handle filter button click
  const handleTableFilterButtonClickWithMode = useCallback(() => {
    setPanelMode("filter");
    setIsTableFilterPanelOpen(true);
  }, [setIsTableFilterPanelOpen]);

  // Handle close panel
  const handleCloseTableFilterPanelWithReset = useCallback(() => {
    setSelectedRow(null);
    setIsTableFilterPanelOpen(false);
  }, [setIsTableFilterPanelOpen]);

  // Close filter panels when switching views
  const handleViewModeChangeWithPanelClose = useCallback((mode: ViewMode) => {
    // Close any open filter panels when switching views
    if (isCardFilterPanelOpen) {
      handleCloseCardFilterPanel();
    }
    if (isTableFilterPanelOpen) {
      handleCloseTableFilterPanelWithReset();
    }
    handleViewModeChange(mode);
  }, [handleViewModeChange, isCardFilterPanelOpen, handleCloseCardFilterPanel, isTableFilterPanelOpen, handleCloseTableFilterPanelWithReset]);

  // Adapter function to convert the filter change format for Table component
  const handleTableFilterChange = useCallback((filters: Record<string, string | string[]>) => {
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
  }, [onFilterChange]);

  const renderViewToggle = () => {
    if (!showViewToggle) return null;

    return (
      <div className="view-toggle">
        <Button
          type={viewMode === "table" ? "primary" : "secondary"}
          size="small"
          btnText="Table"
          onClick={() => handleViewModeChangeWithPanelClose("table")}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="3" y1="15" x2="21" y2="15"></line>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          }
        />
        <Button
          type={viewMode === "cards" ? "primary" : "secondary"}
          size="small"
          btnText="Cards"
          onClick={() => handleViewModeChangeWithPanelClose("cards")}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          }
        />
      </div>
    );
  };

  const renderTable = () => {
    console.log('Rendering table with filteredData:', {
      totalData: data.length,
      filteredDataLength: filteredData.length,
      filteredData: filteredData.slice(0, 3) // Show first 3 items for debugging
    });
    
    return (
      <div className={`table-view-container ${isTableFilterPanelOpen ? "panel-open" : ""}`}>
        <div className="table-content">
          <div className="table-search-section">
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
          detailsData={selectedRow && panelRenderer ? panelRenderer(selectedRow) : []}
        />
      </div>
    );
  };

  const renderCards = () => (
    <div className={`cards-layout ${isCardFilterPanelOpen ? "panel-open" : ""}`}>
      <div className="cards-content">
        <div className="cards-wrapper">
          <div className="cards-search-section">
            <SearchBar 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery}
              showFilterButton={filterOptions.length > 0}
              onFilterClick={handleCardFilterButtonClick}
              searchField={searchField}
              placeholder={searchPlaceholder}
            />
          </div>
          <div className="cards-grid">
            {filteredData.length > 0 ? (
              filteredData.map(item => (
                <Card
                  key={item.id}
                  title={cardRenderer.title(item)}
                  description={cardRenderer.description?.(item)}
                  imageUrl={cardRenderer.imageUrl?.(item)}
                  clickHandler={() => handleItemClick(item)}
                />
              ))
            ) : (
              <div className="empty-state-cards">
                <EmptyState />
                {hasActiveFilters && (
                  <div className="no-results-message">
                    <p>No results found with current search and filters.</p>
                    <p>Try adjusting your search or filters to see all results.</p>
                  </div>
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
    <div className="table-or-cards-container">
      <div className="controls-section">
        {renderViewToggle()}
      </div>

      {viewMode === "table" ? renderTable() : renderCards()}

      {selectedItem && panelRenderer && isModalOpen && (
        <Modal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Request Details"
          size="medium"
        >
          <div className="modal-details">
            {panelRenderer(selectedItem).map((item, idx) => (
              <div key={idx} className="detail-item">
                <div className="detail-label">{item.label}</div>
                <div className="detail-value">{item.value}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default TableOrCards;
