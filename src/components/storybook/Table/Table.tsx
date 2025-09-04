// Table.tsx
import React from 'react';
import './Table.scss';
import EmptyState from '../EmptyState/EmptyState';

export interface Column<T> {
  label: string;
  render: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  emptyStateMessage?: string;
  noResultsMessage?: string;
  hasActiveFilters?: boolean;
}

function Table<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  emptyStateMessage = 'No data available',
  noResultsMessage = 'No results found with current search and filters.',
  hasActiveFilters = false,
}: TableProps<T>) {
  const handleRowClick = (row: T) => {
    onRowClick?.(row);
  };

  return (
    <div className="table">
      <div className="table__layout">
        <div className="table__wrapper">
          <table className="table__content">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.label} className="table__header">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map(row => (
                  <tr
                    key={row.id}
                    className="table__row"
                    onClick={() => handleRowClick(row)}
                  >
                    {columns.map((col, idx) => (
                      <td key={idx} className="table__cell">
                        {col.render(row)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="table__row table__row--empty">
                  <td
                    colSpan={columns.length}
                    className="table__cell table__cell--empty"
                  >
                    <div className="table__empty-container">
                      <EmptyState />
                      {hasActiveFilters ? (
                        <div className="table__no-results">
                          <p>{noResultsMessage}</p>
                          <p>
                            Try adjusting your search or filters to see all
                            results.
                          </p>
                        </div>
                      ) : (
                        <div className="table__empty-message">
                          <p>{emptyStateMessage}</p>
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
    </div>
  );
}

export default Table;
