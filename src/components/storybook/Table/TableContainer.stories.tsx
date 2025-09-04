import type { Meta, StoryObj } from '@storybook/react';
import TableContainer, { IFilterOption, IDetailItem } from './TableContainer';

// Sample data types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  department: string;
  lastLogin: string;
  joinDate: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  stock: number;
  rating: number;
  supplier: string;
}

const meta: Meta<typeof TableContainer> = {
  title: 'Components/TableContainer',
  component: TableContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive table component with built-in search, filtering, and side panel for details or filter management.',
      },
    },
  },
  argTypes: {
    data: {
      control: { type: 'object' },
      description: 'Array of data objects to display in the table',
    },
    columns: {
      control: { type: 'object' },
      description: 'Array of column definitions with labels and render functions',
    },
    filterOptions: {
      control: { type: 'object' },
      description: 'Array of filter options for the side panel',
    },
    onFilterChange: {
      action: 'filter changed',
      description: 'Function called when filters change',
    },
    panelRenderer: {
      control: { type: 'object' },
      description: 'Function to render detail items in the side panel',
    },
    searchField: {
      control: 'text',
      description: 'Specific field to search on, or undefined for global search',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    onRowClick: {
      action: 'row clicked',
      description: 'Function called when a row is clicked',
    },
    emptyStateMessage: {
      control: 'text',
      description: 'Message to display when there is no data',
    },
    noResultsMessage: {
      control: 'text',
      description: 'Message to display when filters return no results',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    lastLogin: '2024-01-15',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    department: 'Marketing',
    lastLogin: '2024-01-14',
    joinDate: '2023-03-20',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    department: 'Sales',
    lastLogin: '2024-01-10',
    joinDate: '2023-06-10',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Engineering',
    lastLogin: '2024-01-16',
    joinDate: '2022-11-15',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'User',
    status: 'active',
    department: 'HR',
    lastLogin: '2024-01-13',
    joinDate: '2023-08-01',
  },
];

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    category: 'Electronics',
    subcategory: 'Computers',
    price: 1299.99,
    stock: 15,
    rating: 4.5,
    supplier: 'TechCorp',
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    category: 'Electronics',
    subcategory: 'Accessories',
    price: 29.99,
    stock: 50,
    rating: 4.2,
    supplier: 'AccessoryWorld',
  },
  {
    id: '3',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    subcategory: 'Accessories',
    price: 149.99,
    stock: 25,
    rating: 4.7,
    supplier: 'KeyboardPro',
  },
  {
    id: '4',
    name: '4K Monitor',
    category: 'Electronics',
    subcategory: 'Displays',
    price: 399.99,
    stock: 8,
    rating: 4.8,
    supplier: 'DisplayTech',
  },
  {
    id: '5',
    name: 'USB-C Hub',
    category: 'Electronics',
    subcategory: 'Accessories',
    price: 49.99,
    stock: 100,
    rating: 4.0,
    supplier: 'HubMaster',
  },
];

// Column definitions
const userColumns = [
  {
    label: 'Name',
    render: (user: User) => <strong>{user.name}</strong>,
  },
  {
    label: 'Email',
    render: (user: User) => user.email,
  },
  {
    label: 'Role',
    render: (user: User) => (
      <span className="badge badge--role">{user.role}</span>
    ),
  },
  {
    label: 'Department',
    render: (user: User) => user.department,
  },
  {
    label: 'Status',
    render: (user: User) => (
      <span className={`status status--${user.status}`}>
        {user.status}
      </span>
    ),
  },
  {
    label: 'Last Login',
    render: (user: User) => user.lastLogin,
  },
];

const productColumns = [
  {
    label: 'Product',
    render: (product: Product) => <strong>{product.name}</strong>,
  },
  {
    label: 'Category',
    render: (product: Product) => product.category,
  },
  {
    label: 'Subcategory',
    render: (product: Product) => product.subcategory,
  },
  {
    label: 'Price',
    render: (product: Product) => `$${product.price.toFixed(2)}`,
  },
  {
    label: 'Stock',
    render: (product: Product) => (
      <span className={product.stock < 10 ? 'low-stock' : ''}>
        {product.stock}
      </span>
    ),
  },
  {
    label: 'Rating',
    render: (product: Product) => `⭐ ${product.rating}`,
  },
  {
    label: 'Supplier',
    render: (product: Product) => product.supplier,
  },
];

// Filter options
const userFilterOptions: IFilterOption[] = [
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

const productFilterOptions: IFilterOption[] = [
  {
    key: 'category',
    label: 'Category',
    name: 'category',
    type: 'select',
    options: [
      { value: 'Electronics', label: 'Electronics' },
      { value: 'Clothing', label: 'Clothing' },
      { value: 'Books', label: 'Books' },
    ],
  },
  {
    key: 'subcategory',
    label: 'Subcategory',
    name: 'subcategory',
    type: 'select',
    options: [
      { value: 'Computers', label: 'Computers' },
      { value: 'Accessories', label: 'Accessories' },
      { value: 'Displays', label: 'Displays' },
    ],
  },
  {
    key: 'supplier',
    label: 'Supplier',
    name: 'supplier',
    type: 'text',
  },
];

// Panel renderers
const userPanelRenderer = (user: User): IDetailItem[] => [
  { label: 'Full Name', value: user.name },
  { label: 'Email Address', value: user.email },
  { label: 'Role', value: user.role },
  { label: 'Department', value: user.department },
  { label: 'Status', value: user.status },
  { label: 'Last Login', value: user.lastLogin },
  { label: 'Join Date', value: user.joinDate },
];

const productPanelRenderer = (product: Product): IDetailItem[] => [
  { label: 'Product Name', value: product.name },
  { label: 'Category', value: product.category },
  { label: 'Subcategory', value: product.subcategory },
  { label: 'Price', value: `$${product.price.toFixed(2)}` },
  { label: 'Stock Level', value: product.stock.toString() },
  { label: 'Rating', value: `${product.rating}/5` },
  { label: 'Supplier', value: product.supplier },
];

// Basic Stories
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    searchPlaceholder: 'Search users...',
  },
};

export const WithProducts: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    filterOptions: productFilterOptions,
    panelRenderer: productPanelRenderer,
    searchPlaceholder: 'Search products...',
  },
};

export const WithoutFilters: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    searchPlaceholder: 'Search users...',
  },
};

export const WithoutSearch: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
  },
};

export const WithCustomSearchField: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    searchField: 'name',
    searchPlaceholder: 'Search by name...',
  },
};

// Interactive Stories
export const Interactive: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    searchPlaceholder: 'Search users...',
    onRowClick: (user) => alert(`Selected user: ${user.name}`),
  },
  parameters: {
    docs: {
      description: {
        story: 'This table container has clickable rows that show an alert with the selected user information.',
      },
    },
  },
};

// Edge Cases
export const EmptyData: Story = {
  args: {
    data: [],
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    searchPlaceholder: 'Search users...',
    emptyStateMessage: 'No users found in the system',
  },
};

export const SingleRow: Story = {
  args: {
    data: [sampleUsers[0]],
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    searchPlaceholder: 'Search users...',
  },
};

export const ManyRows: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      ...sampleUsers[i % sampleUsers.length],
      id: String(i + 1),
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    })),
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    searchPlaceholder: 'Search users...',
  },
};

// Custom Messages
export const CustomMessages: Story = {
  args: {
    data: [],
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    searchPlaceholder: 'Search users...',
    emptyStateMessage: 'Start by adding your first user to the system',
    noResultsMessage: 'No users match your current search and filter criteria. Try adjusting your filters or search terms.',
  },
};

// Complex Filtering
export const ComplexFilters: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    filterOptions: [
      ...productFilterOptions,
      {
        key: 'priceRange',
        label: 'Price Range',
        name: 'priceRange',
        type: 'select',
        options: [
          { value: '0-50', label: '$0 - $50' },
          { value: '51-100', label: '$51 - $100' },
          { value: '101-200', label: '$101 - $200' },
          { value: '201+', label: '$201+' },
        ],
      },
      {
        key: 'stockLevel',
        label: 'Stock Level',
        name: 'stockLevel',
        type: 'select',
        options: [
          { value: 'low', label: 'Low (< 10)' },
          { value: 'medium', label: 'Medium (10-50)' },
          { value: 'high', label: 'High (> 50)' },
        ],
      },
    ],
    panelRenderer: productPanelRenderer,
    searchPlaceholder: 'Search products...',
  },
  parameters: {
    docs: {
      description: {
        story: 'This example shows complex filtering with price ranges and stock levels.',
      },
    },
  },
};
