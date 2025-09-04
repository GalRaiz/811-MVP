import type { Meta, StoryObj } from '@storybook/react';
import TableOrCards, { ViewMode, IFilterOption, IDetailItem, ICardRenderer } from './TableOrCards';

// Sample data types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  department: string;
  avatar: string;
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
  imageUrl: string;
  description: string;
}

const meta: Meta<typeof TableOrCards> = {
  title: 'Components/ViewModes/TableOrCards',
  component: TableOrCards,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible component that allows switching between table and card view modes for displaying data, with built-in search, filtering, and side panel functionality.',
      },
    },
  },
  argTypes: {
    data: {
      control: { type: 'object' },
      description: 'Array of data objects to display',
    },
    columns: {
      control: { type: 'object' },
      description: 'Array of column definitions for table view',
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
    defaultViewMode: {
      control: { type: 'select' },
      options: ['table', 'cards'],
      description: 'Default view mode to start with',
    },
    cardRenderer: {
      control: { type: 'object' },
      description: 'Configuration for rendering cards',
    },
    showViewToggle: {
      control: 'boolean',
      description: 'Whether to show the view mode toggle',
    },
    onViewModeChange: {
      action: 'view mode changed',
      description: 'Function called when view mode changes',
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
    avatar: '👨‍💻',
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
    avatar: '👩‍💼',
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
    avatar: '👨‍💼',
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
    avatar: '👩‍🔬',
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
    avatar: '👨‍💼',
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
    imageUrl: '💻',
    description: 'High-performance laptop for professionals',
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
    imageUrl: '🖱️',
    description: 'Ergonomic wireless mouse with precision tracking',
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
    imageUrl: '⌨️',
    description: 'Premium mechanical keyboard with customizable switches',
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
    imageUrl: '🖥️',
    description: 'Ultra-high definition monitor for creative professionals',
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
    imageUrl: '🔌',
    description: 'Multi-port USB-C hub for expanded connectivity',
  },
];

// Column definitions for table view
const userColumns = [
  {
    label: 'Name',
    render: (user: User) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>{user.avatar}</span>
        <strong>{user.name}</strong>
      </div>
    ),
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
    render: (product: Product) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>{product.imageUrl}</span>
        <strong>{product.name}</strong>
      </div>
    ),
  },
  {
    label: 'Category',
    render: (product: Product) => product.category,
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
  { label: 'Description', value: product.description },
];

// Card renderers
const userCardRenderer: ICardRenderer<User> = {
  title: (user) => user.name,
  description: (user) => user.email,
  imageUrl: (user) => user.avatar,
  metaData: (user) => [
    { label: user.role, icon: '👤' },
    { label: user.department, icon: '🏢' },
    { label: user.status, icon: user.status === 'active' ? '🟢' : '🔴' },
  ],
};

const productCardRenderer: ICardRenderer<Product> = {
  title: (product) => product.name,
  description: (product) => product.description,
  imageUrl: (product) => product.imageUrl,
  metaData: (product) => [
    { label: `$${product.price.toFixed(2)}`, icon: '💰' },
    { label: `${product.stock} in stock`, icon: '📦' },
    { label: `⭐ ${product.rating}`, icon: '⭐' },
  ],
};

// Basic Stories
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    cardRenderer: userCardRenderer,
    searchPlaceholder: 'Search users...',
    defaultViewMode: 'table',
    showViewToggle: true,
  },
};

export const WithProducts: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    filterOptions: productFilterOptions,
    panelRenderer: productPanelRenderer,
    cardRenderer: productCardRenderer,
    searchPlaceholder: 'Search products...',
    defaultViewMode: 'table',
    showViewToggle: true,
  },
};

export const DefaultToCards: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    cardRenderer: userCardRenderer,
    searchPlaceholder: 'Search users...',
    defaultViewMode: 'cards',
    showViewToggle: true,
  },
};

export const WithoutViewToggle: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    cardRenderer: userCardRenderer,
    searchPlaceholder: 'Search users...',
    defaultViewMode: 'table',
    showViewToggle: false,
  },
};

export const WithoutFilters: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    panelRenderer: userPanelRenderer,
    cardRenderer: userCardRenderer,
    searchPlaceholder: 'Search users...',
    defaultViewMode: 'table',
    showViewToggle: true,
  },
};

export const WithoutSearch: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    cardRenderer: userCardRenderer,
    defaultViewMode: 'table',
    showViewToggle: true,
  },
};

// Interactive Stories
export const Interactive: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    cardRenderer: userCardRenderer,
    searchPlaceholder: 'Search users...',
    defaultViewMode: 'table',
    showViewToggle: true,
    onViewModeChange: (mode) => console.log('View mode changed to:', mode),
  },
  parameters: {
    docs: {
      description: {
        story: 'This component has interactive view mode switching with console logging.',
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
    cardRenderer: userCardRenderer,
    searchPlaceholder: 'Search users...',
    defaultViewMode: 'table',
    showViewToggle: true,
  },
};

export const SingleItem: Story = {
  args: {
    data: [sampleUsers[0]],
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    cardRenderer: userCardRenderer,
    searchPlaceholder: 'Search users...',
    defaultViewMode: 'table',
    showViewToggle: true,
  },
};

export const ManyItems: Story = {
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
    cardRenderer: userCardRenderer,
    searchPlaceholder: 'Search users...',
    defaultViewMode: 'table',
    showViewToggle: true,
  },
};

// Custom Search Field
export const WithCustomSearchField: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    filterOptions: userFilterOptions,
    panelRenderer: userPanelRenderer,
    cardRenderer: userCardRenderer,
    searchField: 'name',
    searchPlaceholder: 'Search by name...',
    defaultViewMode: 'table',
    showViewToggle: true,
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
    cardRenderer: productCardRenderer,
    searchPlaceholder: 'Search products...',
    defaultViewMode: 'table',
    showViewToggle: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This example shows complex filtering with price ranges and stock levels.',
      },
    },
  },
};
