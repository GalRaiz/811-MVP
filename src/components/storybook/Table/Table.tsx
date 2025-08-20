// Table.tsx
import React, { useState, useEffect } from "react";
import "./Table.scss";
import SidePanel, { IDetailItem, IFilterOption } from "../SidePanel/SidePanel";
import SearchBar from "../SearchBar";
import EmptyState from "../../EmptyState";
import { getNestedValue } from "../../../utils/getNestedValue";
import { getAssistanceTypeLabel, getAssistanceSubTypeLabel } from "../../../utils/assistanceTypeUtils";

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
  disableInternalFiltering?: boolean; // New prop to disable internal filtering
  onRowClick?: (row: T) => void; // New prop for row click handling
}

function Table<T extends { id: string | number }>({
  data,
  columns,
  filterOptions = [],
  onFilterChange,
  panelRenderer,
  searchField,
  searchPlaceholder,
  disableInternalFiltering = false,
  onRowClick,
}: TableProps<T>) {
  console.log('Table component received:', {
    dataLength: data.length,
    disableInternalFiltering,
    filterOptions: filterOptions.map(f => ({ key: f.key, type: f.type }))
  });
  
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

  const filteredData = disableInternalFiltering ? data : data.filter((row) => {
    // Search filtering
    const query = searchQuery.toLowerCase();
    let matchesSearch = true;
    
    if (query && searchField) {
      // Search on specific field
      const fieldValue = getNestedValue(row as Record<string, unknown>, searchField);
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
      
      const fieldValue = getNestedValue(row as Record<string, unknown>, key);
      
      // Handle string values (single select and text)
      return String(fieldValue).toLowerCase().includes(String(value).toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  console.log('Table filteredData:', {
    originalDataLength: data.length,
    filteredDataLength: filteredData.length,
    disableInternalFiltering,
    firstFewItems: filteredData.slice(0, 2)
  });

  const handleRowClick = (row: T) => {
    if (disableInternalFiltering && onRowClick) {
      // When internal filtering is disabled, delegate to parent component
      onRowClick(row);
    } else {
      // Use internal panel state
      setSelectedRow(row);
      setPanelMode("details");
      setIsPanelOpen(true);
    }
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
  const hasActiveFilters = Object.values(debouncedFilters).some(value => {
    return String(value).trim() !== '';
  }) || searchQuery.trim() !== '';

  return (
    <div className="table-container">
      {!disableInternalFiltering && (
        <SearchBar 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery}
          showFilterButton={filterOptions.length > 0}
          onFilterClick={handleFilterButtonClick}
          searchField={searchField}
          placeholder={searchPlaceholder}
        />
      )}
      <div 
        className={`table-layout ${!disableInternalFiltering && isPanelOpen ? "panel-open" : ""}`}
        data-grid-layout={disableInternalFiltering ? "true" : "false"}
      >
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
      {!disableInternalFiltering && (
        <SidePanel
          mode={panelMode}
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          detailsData={selectedRow && panelRenderer ? panelRenderer(selectedRow) : []}
        />
      )}
    </div>
  );
}

export default Table;
