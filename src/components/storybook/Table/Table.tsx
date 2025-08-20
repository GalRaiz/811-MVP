// Table.tsx
import React, { useState, useEffect } from "react";
import "./Table.scss";
import SidePanel, { IDetailItem, IFilterOption } from "../SidePanel/SidePanel";
import SearchBar from "../SearchBar";
import EmptyState from "../../EmptyState";
import { getNestedValue } from "../../../utils/getNestedValue";

export interface Column<T> {
  label: string;
  render: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  filterOptions?: IFilterOption[];
  onFilterChange?: (filters: Record<string, string>) => void;
  panelRenderer?: (row: T) => IDetailItem[];
  searchField?: string; // Field to search on (e.g., "requestDetails.requestName")
  searchPlaceholder?: string;
}

function Table<T extends { id: string | number }>({
  data,
  columns,
  filterOptions = [],
  onFilterChange,
  panelRenderer,
  searchField,
  searchPlaceholder,
}: TableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<"filter" | "details">("details");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [debouncedFilters, setDebouncedFilters] = useState<Record<string, string>>({});

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

  const handleFilterChange = (filterChange: { key: string; value: string }) => {
    setFilters(prev => ({
      ...prev,
      [filterChange.key]: filterChange.value
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setDebouncedFilters({});
    setSearchQuery(""); // Clear search when clearing filters
    onFilterChange?.({});
  };

  const filteredData = data.filter((row) => {
    // Search filtering
    const query = searchQuery.toLowerCase();
    let matchesSearch = true;
    
    if (query && searchField) {
      // Search on specific field
      const fieldValue = getNestedValue(row as Record<string, unknown>, searchField);
      matchesSearch = String(fieldValue).toLowerCase().includes(query);
    } else if (query) {
      // Search on all values if no specific field
      matchesSearch = Object.values(row).some((val) =>
        String(val).toLowerCase().includes(query)
      );
    }

    // Filter filtering
    const matchesFilters = Object.entries(debouncedFilters).every(([key, value]) => {
      if (!value) return true;
      const fieldValue = getNestedValue(row as Record<string, unknown>, key);
      return String(fieldValue).toLowerCase().includes(value.toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  const handleRowClick = (row: T) => {
    setSelectedRow(row);
    setPanelMode("details");
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedRow(null);
  };

  const handleFilterButtonClick = () => {
    setPanelMode("filter");
    setIsPanelOpen(true);
  };

  // Check if there are active filters or search
  const hasActiveFilters = Object.values(debouncedFilters).some(value => value.trim() !== '') || searchQuery.trim() !== '';

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
      <div className={`table-layout ${isPanelOpen ? "panel-open" : ""}`}>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.label} className="table-header">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id} className="table-row" onClick={() => handleRowClick(row)}>
                    {columns.map((col, idx) => (
                      <td key={idx} className="table-cell">
                        {col.render(row)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="empty-state-row">
                  <td colSpan={columns.length} className="empty-state-cell">
                    <div className="empty-state-container">
                      <EmptyState />
                      {hasActiveFilters && (
                        <div className="no-results-message">
                          <p>No results found with current search and filters.</p>
                          <p>Try adjusting your search or filters to see all results.</p>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <SidePanel
        mode={panelMode}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        detailsData={selectedRow && panelRenderer ? panelRenderer(selectedRow) : []}
      />
    </div>
  );
}

export default Table;
