import React, { useState } from 'react';
import './Table.scss';
import SidePanel from './SidePanel';
import SearchBar from './SearchBar';
import EmptyState from '../EmptyState';
import { IRequest } from '../../store/types';

interface TableProps {
  data: IRequest[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const [selectedRequest, setSelectedRequest] = useState<IRequest | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleRowClick = (Request: IRequest) => {
    setSelectedRequest(Request);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedRequest(null);
  };

  const columns = ['Name', 'Type'];

  const filteredData = data.filter((request: IRequest) => {
    const query = searchQuery.toLowerCase();
    return (
      (request.requestDetails.requestName ?? '').toLowerCase().includes(query) ||
      (request.requestDetails.requestType ?? '').toLowerCase().includes(query)
    );
  });

  return (
    <>
      <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      {filteredData.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={`table-layout ${isPanelOpen ? 'panel-open' : ''}`}>
          <div className='table-wrapper'>
            <table className='custom-table'>
              <thead>
                <tr>
                  {columns.map(col => (
                    <th key={col} className='table-header'>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map(request => (
                  <tr
                    key={request.id}
                    className='table-row'
                    onClick={() => handleRowClick(request)}
                  >
                    <td className='table-cell'>{request.requestDetails.requestName}</td>
                    <td className='table-cell'>{request.requestDetails.requestType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SidePanel
            sidePanelType='requestDetails'
            isOpen={isPanelOpen}
            onClose={handleClosePanel}
            request={
              selectedRequest
                ? {
                    id: selectedRequest.id ?? '',
                    requesterDetails: {
                      requesterName: selectedRequest.requesterDetails.requesterName ?? '',
                      phone: selectedRequest.requesterDetails.phone ?? '',
                      district: selectedRequest.requesterDetails.district ?? '',
                      city: selectedRequest.requesterDetails.city ?? '',
                      street: selectedRequest.requesterDetails.street ?? '',
                    },
                    requestDetails: {
                      requestName: selectedRequest.requestDetails.requestName ?? '',
                      requestType: selectedRequest.requestDetails.requestType ?? '',
                      requestSubType: selectedRequest.requestDetails.requestSubType || [],
                      requestDescription: selectedRequest.requestDetails.requestDescription ?? '',
                      requestImage: selectedRequest.requestDetails.requestImage ?? '',
                      needTransportation: selectedRequest.requestDetails.needTransportation ?? false,
                      needVolunteers: selectedRequest.requestDetails.needVolunteers ?? false,
                      attachment: selectedRequest.requestDetails.attachment ?? '',
                    },
                    requestStatus: {
                      requestStatus: selectedRequest.requestStatus.requestStatus ?? "pending",
                      createdAt: selectedRequest.requestStatus.createdAt ?? 0,
                      updatedAt: selectedRequest.requestStatus.updatedAt ?? 0,
                      assignedTo: selectedRequest.requestStatus.assignedTo ?? [],
                    },
                  }
                : undefined
            }
            filterType='details ?? filter'
            onFilterChange={() => {}}
          />
        </div>
      )}
    </>
  );
};

export default Table;
