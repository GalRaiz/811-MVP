import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';
import { ButtonProps } from '../Button/Button';

const meta: Meta<typeof Footer> = {
  title: 'NavBar/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Footer text content',
    },
    buttons: {
      control: 'object',
      description: 'Array of button configurations',
    },
    progress: {
      control: 'object',
      description: 'Progress bar configuration',
    },
    pagination: {
      control: 'object',
      description: 'Pagination configuration',
    },
    children: {
      control: false,
      description: 'Additional content below the footer',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ==== Sample Button Data ====
const sampleButtons: ButtonProps[] = [
  {
    id: 'save',
    type: 'primary',
    size: 'medium',
    btnText: 'שמור',
    onClick: () => console.log('Save clicked'),
  },
  {
    id: 'cancel',
    type: 'secondary',
    size: 'medium',
    btnText: 'ביטול',
    onClick: () => console.log('Cancel clicked'),
  },
];

// ==== Basic Footer ====
export const Basic: Story = {
  args: {
    text: 'זהו תוכן טקסט בסיסי בכפתור',
    buttons: sampleButtons,
  },
};

// ==== Footer with Progress ====
export const WithProgress: Story = {
  args: {
    text: 'טופס עזרה - שלב 3 מתוך 5',
    buttons: sampleButtons,
    progress: {
      current: 3,
      total: 5,
      size: 'medium',
    },
  },
};

// ==== Footer with Pagination ====
export const WithPagination: Story = {
  args: {
    text: 'רשימת בקשות - עמוד 2 מתוך 8',
    buttons: sampleButtons,
    pagination: {
      currentPage: 2,
      totalPages: 8,
      onPageChange: (page) => console.log(`Page changed to ${page}`),
      showPageNumbers: true,
    },
  },
};

// ==== Footer with Progress and Pagination ====
export const WithProgressAndPagination: Story = {
  args: {
    text: 'טופס רב-שלבי עם דפדוף',
    buttons: sampleButtons,
    progress: {
      current: 2,
      total: 4,
      size: 'medium',
    },
    pagination: {
      currentPage: 1,
      totalPages: 3,
      onPageChange: (page) => console.log(`Page changed to ${page}`),
      showPageNumbers: true,
    },
  },
};

// ==== Footer with Many Buttons ====
export const ManyButtons: Story = {
  args: {
    text: 'פעולות מרובות זמינות',
    buttons: [
      ...sampleButtons,
      {
        id: 'preview',
        type: 'secondary',
        size: 'medium',
        btnText: 'תצוגה מקדימה',
        onClick: () => console.log('Preview clicked'),
      },
      {
        id: 'export',
        type: 'secondary',
        size: 'medium',
        btnText: 'ייצוא',
        onClick: () => console.log('Export clicked'),
      },
    ],
  },
};

// ==== Footer with Children ====
export const WithChildren: Story = {
  args: {
    text: 'פוטר עם תוכן נוסף',
    buttons: sampleButtons,
    children: (
      <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f5f5f5' }}>
        <p>תוכן נוסף מתחת לפוטר</p>
        <small>זה יכול להיות מידע נוסף או קישורים</small>
      </div>
    ),
  },
};

// ==== Footer with Long Text ====
export const LongText: Story = {
  args: {
    text: 'זהו טקסט ארוך יותר שמדגים כיצד הפוטר מתנהג עם תוכן טקסט מורחב שעלול לקחת יותר מקום בשורה',
    buttons: sampleButtons,
  },
};

// ==== Footer with No Text ====
export const NoText: Story = {
  args: {
    buttons: sampleButtons,
    progress: {
      current: 1,
      total: 3,
      size: 'medium',
    },
  },
};
