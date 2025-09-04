import type { Meta, StoryObj } from '@storybook/react';
import SidePanel, { IFilterOption, IDetailItem } from './SidePanel';

const meta: Meta<typeof SidePanel> = {
  title: 'Components/SidePanel',
  component: SidePanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A side panel component that can display either filter options or detailed information.',
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['filter', 'details'],
      description: 'The mode of the side panel',
    },
    filterOptions: {
      control: { type: 'object' },
      description: 'Array of filter options for filter mode',
    },
    onFilterChange: {
      action: 'filter changed',
      description: 'Function called when a filter value changes',
    },
    onClearFilters: {
      action: 'filters cleared',
      description: 'Function called when filters are cleared',
    },
    detailsData: {
      control: { type: 'object' },
      description: 'Data to display in details mode',
    },
    onClose: {
      action: 'panel closed',
      description: 'Function called when the panel is closed',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the panel is open',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample filter options
const sampleFilterOptions: IFilterOption[] = [
  {
    key: 'role',
    label: 'Role',
    name: 'role',
    type: 'select',
    options: [
      { value: 'Admin', label: 'Admin' },
      { value: 'Manager', label: 'Manager' },
      { value: 'User', label: 'User' },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    name: 'status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    key: 'department',
    label: 'Department',
    name: 'department',
    type: 'select',
    options: [
      { value: 'Engineering', label: 'Engineering' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Sales', label: 'Sales' },
      { value: 'HR', label: 'HR' },
    ],
  },
];

// Sample details data
const sampleDetailsData: IDetailItem[] = [
  { label: 'Full Name', value: 'John Doe' },
  { label: 'Email Address', value: 'john.doe@example.com' },
  { label: 'Role', value: 'Admin' },
  { label: 'Department', value: 'Engineering' },
  { label: 'Status', value: 'Active' },
  { label: 'Last Login', value: '2024-01-15' },
  { label: 'Join Date', value: '2023-01-15' },
];

// Basic Stories
export const FilterMode: Story = {
  args: {
    mode: 'filter',
    filterOptions: sampleFilterOptions,
    isOpen: true,
    onClose: () => {},
  },
};

export const DetailsMode: Story = {
  args: {
    mode: 'details',
    detailsData: sampleDetailsData,
    isOpen: true,
    onClose: () => {},
  },
};

export const Closed: Story = {
  args: {
    mode: 'filter',
    filterOptions: sampleFilterOptions,
    isOpen: false,
    onClose: () => {},
  },
};

export const NoFilterOptions: Story = {
  args: {
    mode: 'filter',
    filterOptions: [],
    isOpen: true,
    onClose: () => {},
  },
};

export const EmptyDetails: Story = {
  args: {
    mode: 'details',
    detailsData: [],
    isOpen: true,
    onClose: () => {},
  },
};

// Interactive Stories
export const Interactive: Story = {
  args: {
    mode: 'filter',
    filterOptions: sampleFilterOptions,
    isOpen: true,
    onClose: () => {},
    onFilterChange: (filter) => console.log('Filter changed:', filter),
    onClearFilters: () => console.log('Filters cleared'),
  },
  parameters: {
    docs: {
      description: {
        story: 'This side panel has interactive filters with console logging.',
      },
    },
  },
};
