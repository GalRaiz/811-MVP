import React from 'react';
import { useParams } from 'react-router-dom';
import Table from '../components/storybook/Table';
import './RequestsPage.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IRequest } from '../store/types';
import Modal from '../components/storybook/Modal/Modal';

const RequestsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const requests =
    useSelector((state: RootState) => state.requests.requestsData) || [];

  const filteredRequests = category
    ? requests.filter((request: IRequest) => {
        const requestType =
          request.requestType || (request as { type?: string }).type || '';
        return requestType.toLowerCase() === category.toLowerCase();
      })
    : requests;

  return (
    <div>
      <h2>Requests Table</h2>
      <Modal isOpen={false} onClose={() => {}} title={'Hello World'}>
        <div>Modal content</div>
      </Modal>
      <Table data={filteredRequests} />
    </div>
  );
};

export default RequestsPage;
