import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'NavBar/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1},
      description: 'Current active page number',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    onPageChange: {
      action: 'page-changed',
      description: 'Callback function when page changes',
    },
    showPageNumbers: {
      control: 'boolean',
      description: 'Whether to show page numbers',
    },
    maxVisiblePages: {
      control: { type: 'number', max: 10 },
      description: 'Maximum number of visible page numbers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ==== Interactive Pagination Component ====
const InteractivePagination = ({ 
  initialPage = 5, 
  totalPages = 10, 
  showPageNumbers = true, 
  maxVisiblePages = 10 
}: {
  initialPage: number;
  totalPages: number;
  showPageNumbers: boolean;
  maxVisiblePages: number;
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      showPageNumbers={showPageNumbers}
      maxVisiblePages={maxVisiblePages}
    />
  );
};

// ==== With regular number of Pages ====
export const maxPages10: Story = {
  render: (args) => (
    <InteractivePagination
      initialPage={args.currentPage || 5}
      totalPages={args.totalPages || 10}
      showPageNumbers={args.showPageNumbers !== false}
      maxVisiblePages={args.maxVisiblePages || 10}
    />
  ),
  args: {   
    currentPage: 5,
    totalPages: 10,
    showPageNumbers: true,
  },
};

// ==== With Many Pages ====
export const ManyPages: Story = {
  render: (args) => (
    <InteractivePagination
      initialPage={args.currentPage || 5}
      totalPages={args.totalPages || 20}
      showPageNumbers={args.showPageNumbers !== false}
      maxVisiblePages={args.maxVisiblePages || 10}
    />
  ),
  args: {
    currentPage: 5,
    totalPages: 20,
    showPageNumbers: true,
  },
};

// ==== Custom Max Visible Pages ====
export const CustomMaxVisible: Story = {
  render: (args) => (
    <InteractivePagination
      initialPage={args.currentPage || 5}
      totalPages={args.totalPages || 10}
      showPageNumbers={args.showPageNumbers !== false}
      maxVisiblePages={args.maxVisiblePages || 7}
    />
  ),
  args: {
    currentPage: 5,
    totalPages: 10,
    showPageNumbers: true,
    maxVisiblePages: 7,
  },
};
