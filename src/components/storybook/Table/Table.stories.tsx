import type { Meta, StoryObj } from '@storybook/react';
import Table, { Column } from './Table';

// Sample data types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible table component that displays data in rows and columns with support for row clicks, empty states, and custom column rendering.',
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
    hasActiveFilters: {
      control: 'boolean',
      description: 'Whether there are active filters applied',
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
    lastLogin: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-14',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2024-01-10',
  },
];

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    stock: 15,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Mouse',
    category: 'Electronics',
    price: 29.99,
    stock: 50,
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Keyboard',
    category: 'Electronics',
    price: 79.99,
    stock: 25,
    rating: 4.7,
  },
];

// Column definitions
const userColumns: Column<User>[] = [
  {
    label: 'Name',
    render: (user) => <strong>{user.name}</strong>,
  },
  {
    label: 'Email',
    render: (user) => user.email,
  },
  {
    label: 'Role',
    render: (user) => <span className="badge">{user.role}</span>,
  },
  {
    label: 'Status',
    render: (user) => (
      <span className={`status status--${user.status}`}>
        {user.status}
      </span>
    ),
  },
  {
    label: 'Last Login',
    render: (user) => user.lastLogin,
  },
];

const productColumns: Column<Product>[] = [
  {
    label: 'Product',
    render: (product) => <strong>{product.name}</strong>,
  },
  {
    label: 'Category',
    render: (product) => product.category,
  },
  {
    label: 'Price',
    render: (product) => `$${product.price.toFixed(2)}`,
  },
  {
    label: 'Stock',
    render: (product) => (
      <span className={product.stock < 10 ? 'low-stock' : ''}>
        {product.stock}
      </span>
    ),
  },
  {
    label: 'Rating',
    render: (product) => `⭐ ${product.rating}`,
  },
];

// Basic Table Stories
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
};

export const WithProducts: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
  },
};

export const ClickableRows: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    onRowClick: (user) => console.log('Clicked user:', user),
  },
};

export const EmptyTable: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyStateMessage: 'No users found',
  },
};

export const NoResultsWithFilters: Story = {
  args: {
    data: [],
    columns: userColumns,
    hasActiveFilters: true,
    noResultsMessage: 'No users match your current filters',
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyStateMessage: 'Start by adding your first user to the system',
  },
};

// Interactive Stories
export const Interactive: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    onRowClick: (user) => alert(`Selected: ${user.name}`),
  },
  parameters: {
    docs: {
      description: {
        story: 'This table has clickable rows that show an alert with the selected user information.',
      },
    },
  },
};

// Edge Cases
export const SingleRow: Story = {
  args: {
    data: [sampleUsers[0]],
    columns: userColumns,
  },
};

export const ManyRows: Story = {
  args: {
    data: Array.from({ length: 20 }, (_, i) => ({
      ...sampleUsers[i % sampleUsers.length],
      id: String(i + 1),
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    })),
    columns: userColumns,
  },
};

// Custom Styling Examples
export const WithCustomStyling: Story = {
  args: {
    data: sampleUsers,
    columns: [
      {
        label: 'Name',
        render: (user) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#007bff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {user.name.charAt(0)}
            </div>
            <span>{user.name}</span>
          </div>
        ),
      },
      {
        label: 'Email',
        render: (user) => <code>{user.email}</code>,
      },
      {
        label: 'Role',
        render: (user) => (
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: user.role === 'Admin' ? '#dc3545' : '#28a745',
              color: 'white',
            }}
          >
            {user.role}
          </span>
        ),
      },
      {
        label: 'Status',
        render: (user) => (
          <span
            style={{
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '11px',
              textTransform: 'uppercase',
              backgroundColor: user.status === 'active' ? '#d4edda' : '#f8d7da',
              color: user.status === 'active' ? '#155724' : '#721c24',
            }}
          >
            {user.status}
          </span>
        ),
      },
      {
        label: 'Last Login',
        render: (user) => (
          <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            {user.lastLogin}
          </span>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This table demonstrates custom styling with avatars, badges, and formatted text.',
      },
    },
  },
};
