import { useState, useEffect, useCallback, useMemo } from "react";
import Table, { Column } from "../Table/Table";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import SearchBar from "../SearchBar";
import Button from "../Button/Button";
import EmptyState from "../../EmptyState";
import { getNestedValue } from "../../../utils/getNestedValue";
import "./TableOrCards.scss";

// Types
export type ViewMode = "table" | "cards";

export interface IFilterOption {
  key: string;
  label: string;
  type?: "select" | "text";
  options?: { value: string; label: string }[];
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
const useFiltering = <T extends { id: string | number }>(
  data: T[],
  searchField?: string,
  onFilterChange?: (filters: Record<string, string>) => void
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [debouncedFilters, setDebouncedFilters] = useState<Record<string, string>>({});

  // Debounce filters
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
    setFilters(prev => ({ ...prev, [filterChange.key]: filterChange.value }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setDebouncedFilters({});
    setSearchQuery("");
    onFilterChange?.({});
  }, [onFilterChange]);

  const filteredData = useMemo(() => {
    return data.filter(row => {
      const query = searchQuery.toLowerCase();
      let matchesSearch = true;

      if (query && searchField) {
        const fieldValue = getNestedValue(row as Record<string, unknown>, searchField);
        matchesSearch = String(fieldValue).toLowerCase().includes(query);
      } else if (query) {
        matchesSearch = Object.values(row).some(val => 
          String(val).toLowerCase().includes(query)
        );
      }

      const matchesFilters = Object.entries(debouncedFilters).every(([key, value]) => {
        if (!value) return true;
        const fieldValue = getNestedValue(row as Record<string, unknown>, key);
        return String(fieldValue).toLowerCase().includes(value.toLowerCase());
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchQuery, searchField, debouncedFilters]);

  const hasActiveFilters = useMemo(() => {
    return Object.values(debouncedFilters).some(v => v.trim() !== '') || searchQuery.trim() !== '';
  }, [debouncedFilters, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
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
    filteredData,
    hasActiveFilters,
  } = useFiltering(data, searchField, onFilterChange);

  const { viewMode, handleViewModeChange } = useViewMode(defaultViewMode, onViewModeChange);

  const { selectedItem, isModalOpen, handleItemClick, handleCloseModal } = useModal<T>();

  // Adapter function to convert the filter change format
  const handleTableFilterChange = useCallback((filters: Record<string, string>) => {
    onFilterChange?.(filters);
  }, [onFilterChange]);

  const renderViewToggle = () => {
    if (!showViewToggle) return null;

    return (
      <div className="view-toggle">
        <Button
          type={viewMode === "table" ? "primary" : "secondary"}
          size="small"
          btnText="Table"
          onClick={() => handleViewModeChange("table")}
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
          onClick={() => handleViewModeChange("cards")}
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

  const renderTable = () => (
    <Table
      data={filteredData}
      columns={columns}
      filterOptions={filterOptions}
      onFilterChange={handleTableFilterChange}
      panelRenderer={panelRenderer}
      searchField={searchField}
      searchPlaceholder={searchPlaceholder}
    />
  );

  const renderCards = () => (
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
  );

  return (
    <div className="table-or-cards-container">
      <div className="controls-section">
        <SearchBar 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery}
          showFilterButton={filterOptions.length > 0}
          onFilterClick={() => {}}
          searchField={searchField}
          placeholder={searchPlaceholder}
        />
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
