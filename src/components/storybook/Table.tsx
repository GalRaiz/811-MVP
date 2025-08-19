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
      (request.requesterName ?? '').toLowerCase().includes(query) ||
      (request.requestName ?? '').toLowerCase().includes(query)
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
                    <td className='table-cell'>{request.requestName}</td>
                    <td className='table-cell'>{request.requestType}</td>
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
                    requestName: selectedRequest.requestName ?? '',
                    requestType: selectedRequest.requestType ?? '',
                    requestSubType: selectedRequest.requestSubType || [],
                    requestStatus: selectedRequest.requestStatus ?? '',
                    createdAt: selectedRequest.createdAt ?? 0,
                    updatedAt: selectedRequest.updatedAt ?? 0,
                    district: selectedRequest.district ?? '',
                    city: selectedRequest.city ?? '',
                    street: selectedRequest.street ?? '',
                    requesterName: selectedRequest.requesterName ?? '',
                    requesterPhone: selectedRequest.requesterPhone ?? '',
                    needTransportation:
                      selectedRequest.needTransportation ?? false,
                    needVolunteers: selectedRequest.needVolunteers ?? false,
                    description: selectedRequest.requestDescription ?? '',
                    attachment: selectedRequest.attachment ?? '',
                  }
                : undefined
            }
            filterType='requestDetails ?? filterRequests'
            onFilterChange={() => {}}
          />
        </div>
      )}
    </>
  );
};

export default Table;
