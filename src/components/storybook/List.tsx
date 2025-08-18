import React, { useState } from "react";
import "./Table.scss";
import SidePanel from "./SidePanel";
import SearchBar from "./SearchBar";
import EmptyState from "../EmptyState";
import { IRequest } from "../../store/types";

interface TableProps {
  data: IRequest[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const [selectedRequest, setSelectedRequest] = useState< IRequest | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleRowClick = (request: IRequest) => {
    setSelectedRequest(request);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedRequest(null);
  };

  const filteredData = data.filter((request) =>
    (request.requestName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      {filteredData.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={`table-layout ${isPanelOpen ? "panel-open" : ""}`}>
          <div className="li-wrapper">
            <div className="li-row">
              <li>Name</li>
              <ul className="li-cell">Type</ul>
            </div>
            {filteredData.map((request) => (
              <div
                key={request.id}
                className="li-row"
                onClick={() => handleRowClick(request)}
              >
                <li>{request.requestName || ''}</li>
                <ul className="li-cell">{request.requestType || ''}</ul>
              </div>
            ))}
          </div>
          <SidePanel
            sidePanelType="requestDetails"
            isOpen={isPanelOpen}
            onClose={handleClosePanel}
            request={
              selectedRequest
                ? {
                    requestName: selectedRequest.requestName || "",
                    requestType: selectedRequest.requestType || "",
                    requestSubType: selectedRequest.requestSubType || [],
                    requestStatus: selectedRequest.requestStatus || "",
                    createdAt: selectedRequest.createdAt || 0,
                    updatedAt: selectedRequest.updatedAt || 0,
                    district: selectedRequest.district || "",
                    city: selectedRequest.city || "",
                    street: selectedRequest.street || "",
                    requesterName: selectedRequest.requesterName || "",
                    requesterPhone: selectedRequest.requesterPhone || "",
                    needTransportation: selectedRequest.needTransportation || false,
                    needVolunteers: selectedRequest.needVolunteers || false,
                    description: selectedRequest.requestDescription || "",
                    attachment: selectedRequest.attachment || "",
                  }
                : undefined
            }
            filterType="requestDetails ?? filterRequests"
            onFilterChange={() => {}}
          />
        </div>
      )}
    </>
  );
};

export default Table;


