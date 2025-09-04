// TableContainer.tsx
import { useState, useEffect, useCallback } from 'react';
import './TableContainer.scss';
import Table, { Column } from './Table';
import SidePanel, { IDetailItem, IFilterOption } from '../SidePanel/SidePanel';
import SearchBar from '../FormField/SearchBar';
import { getNestedValue } from '../../../utils/getNestedValue';


interface TableContainerProps<T> {
  data: T[];
  columns: Column<T>[];
  filterOptions?: IFilterOption[];
  onFilterChange?: (filters: Record<string, string>) => void;
  panelRenderer?: (row: T) => IDetailItem[];
  searchField?: string;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  emptyStateMessage?: string;
  noResultsMessage?: string;
  panelTitle?: string; // Optional title for the side panel
  filterPanelTitle?: string; // Optional title for the filter panel
}

function TableContainer<T extends { id: string | number }>({
  data,
  columns,
  filterOptions = [],
  onFilterChange,
  panelRenderer,
  searchField,
  searchPlaceholder,
  onRowClick,
  emptyStateMessage = 'No data available',
  noResultsMessage = 'No results found with current search and filters.',
  panelTitle,
  filterPanelTitle,
}: TableContainerProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<'filter' | 'details'>('details');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [debouncedFilters, setDebouncedFilters] = useState<
    Record<string, string>
  >({});

  // Debounce effect for filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  // Apply debounced filters
  useEffect(() => {
    onFilterChange?.(debouncedFilters);
  }, [debouncedFilters, onFilterChange]);

  const handleFilterChange = useCallback((filterChange: { key: string; value: string }) => {
    setFilters(prev => ({
      ...prev,
      [filterChange.key]: filterChange.value,
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setDebouncedFilters({});
    setSearchQuery('');
    onFilterChange?.({});
  }, [onFilterChange]);

  const filteredData = data.filter(row => {
    // Search filtering
    const query = searchQuery.toLowerCase();
    let matchesSearch = true;

    if (query && searchField) {
      // Search on specific field
      const fieldValue = getNestedValue(
        row as Record<string, unknown>,
        searchField
      );
      matchesSearch = String(fieldValue).toLowerCase().includes(query);
    } else if (query) {
      // Search on all values if no specific field - enhanced to search nested objects
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
          return Object.values(obj).some(value => searchInObject(value));
        }

        return false;
      };

      matchesSearch = searchInObject(row);
    }

    // Filter filtering
    const matchesFilters = Object.entries(debouncedFilters).every(
      ([key, value]) => {
        if (!value) return true;

        const fieldValue = getNestedValue(
          row as Record<string, unknown>,
          key
        );

        // Handle string values (single select and text)
        return String(fieldValue)
          .toLowerCase()
          .includes(String(value).toLowerCase());
      }
    );

    return matchesSearch && matchesFilters;
  });

  const handleRowClick = useCallback((row: T) => {
    if (onRowClick) {
      onRowClick(row);
    } else {
      // Use internal panel state
      setSelectedRow(row);
      setPanelMode('details');
      setIsPanelOpen(true);
    }
  }, [onRowClick]);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedRow(null);
  }, []);

  const handleFilterButtonClick = useCallback(() => {
    setPanelMode('filter');
    setIsPanelOpen(true);
  }, []);

  // Check if there are active filters or search
  const hasActiveFilters =
    Object.values(debouncedFilters).some(value => {
      return String(value).trim() !== '';
    }) || searchQuery.trim() !== '';

  // Get panel title based on mode
  const getPanelTitle = () => {
    if (panelMode === 'filter') {
      return filterPanelTitle || 'Filter Options';
    }
    return panelTitle || 'Details';
  };

  return (
    <div className="table-container">
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFilterButton={filterOptions.length > 0}
        onFilterClick={handleFilterButtonClick}
        searchField={searchField}
        placeholder={searchPlaceholder}
      />
      <div
        className={`table-container__layout ${isPanelOpen ? 'table-container__layout--panel-open' : ''}`}
      >
        <div className="table-container__table">
          <Table<T>
            data={filteredData}
            columns={columns}
            onRowClick={handleRowClick}
            emptyStateMessage={emptyStateMessage}
            noResultsMessage={noResultsMessage}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
        <SidePanel
          mode={panelMode}
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          detailsData={
            selectedRow && panelRenderer ? panelRenderer(selectedRow) : []
          }
          title={getPanelTitle()}
        />
      </div>
    </div>
  );
}

export default TableContainer;
