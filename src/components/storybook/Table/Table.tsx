import React, { useState } from "react";
import "./Table.scss";
import SidePanel from "../SidePanel/SidePanel";
import SearchBar from "../SearchBar";
import EmptyState from "../../EmptyState";
import { IDetailItem } from "../SidePanel/SidePanel"; 

export interface Column<T> {
  label: string;
  render: (row: T) => React.ReactNode;
}

interface TableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  panelRenderer?: (row: T) => IDetailItem[];
}

function Table<T extends { id: string | number }>({
  data,
  columns,
  panelRenderer,
}: TableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const onSearchChange = (query: string) => setSearchQuery(query);

  const handleRowClick = (row: T) => {
    setSelectedRow(row);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedRow(null);
  };

  // חיפוש בסיסי על מה שמוחזר מה־columns
  const filteredData = data.filter((row) => {
    const query = searchQuery.toLowerCase();
    return columns.some((col) => {
      const cell = col.render(row);
      return (
        typeof cell === "string" &&
        cell.toLowerCase().includes(query)
      );
    });
  });

  return (
    <>
      <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      {filteredData.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={`table-layout ${isPanelOpen ? "panel-open" : ""}`}>
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  {columns.map((col, idx) => (
                    <th key={idx} className="table-header">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="table-row"
                    onClick={() => handleRowClick(row)}
                  >
                    {columns.map((col, idx) => (
                      <td key={idx} className="table-cell">
                        {col.render(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SidePanel
            sidePanelType="details"
            isOpen={isPanelOpen}
            onClose={handleClosePanel}
            detailsData={
              selectedRow && panelRenderer
                ? panelRenderer(selectedRow)
                : undefined
            }
          />
        </div>
      )}
    </>
  );
}

export default Table;
