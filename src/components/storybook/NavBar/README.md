# NavBar Components

This directory contains modular, SOLID-compliant navigation and layout components following BEM methodology.

## Components Overview

### 🦶 Footer
A flexible footer component that can include text, buttons, progress indicators, and pagination.

**Features:**
- Configurable text content
- Dynamic button arrays
- Optional progress bar integration
- Optional pagination integration
- Support for additional children content
- RTL support
- Responsive design

**Usage:**
```tsx
import { Footer } from './NavBar';

<Footer
  text="Form step 3 of 5"
  buttons={[
    { id: 'save', type: 'primary', btnText: 'Save', onClick: handleSave },
    { id: 'cancel', type: 'secondary', btnText: 'Cancel', onClick: handleCancel }
  ]}
  progress={{ current: 3, total: 5, showLabels: true }}
  pagination={{ currentPage: 1, totalPages: 3, onPageChange: handlePageChange }}
/>
```

### 📊 Progress
A step-based progress indicator with configurable sizes.

**Features:**
- Step-by-step progress visualization
- Three size variants: small, medium, large
- RTL support
- Responsive design
- Accessibility features

**Usage:**
```tsx
import { Progress } from './NavBar';

<Progress
  current={3}
  total={5}
  size="medium"
/>
```

### 🔢 Pagination
A smart pagination component with intelligent page number display.

**Features:**
- Smart ellipsis for large page counts
- Configurable maximum visible pages
- Previous/Next navigation buttons
- RTL support
- Responsive design
- Accessibility features

**Usage:**
```tsx
import { Pagination } from './NavBar';

<Pagination
  currentPage={5}
  totalPages={20}
  onPageChange={handlePageChange}
  showPageNumbers={true}
  maxVisiblePages={7}
/>
```

## SOLID Principles Implementation

### Single Responsibility Principle (SRP)
- Each component has a single, well-defined purpose
- Footer handles layout and composition
- Progress handles step visualization
- Pagination handles page navigation

### Open/Closed Principle (OCP)
- Components are extensible through props and children
- New functionality can be added without modifying existing code
- Custom styling through className props

### Liskov Substitution Principle (LSP)
- All components can be used interchangeably with their interfaces
- Props are properly typed and validated
- Consistent behavior across different configurations

### Interface Segregation Principle (ISP)
- Components expose only the props they need
- Optional props allow flexible usage
- Clear separation of concerns

### Dependency Inversion Principle (DIP)
- Components depend on abstractions (interfaces) not concrete implementations
- Props are passed down from parent components
- Callbacks allow parent components to control behavior

## BEM Methodology

All components follow BEM (Block Element Modifier) naming conventions:

### Block
- `.page-footer` - Main footer container
- `.progress` - Progress component
- `.pagination` - Pagination component

### Element
- `.page-footer__content` - Footer content wrapper
- `.progress__steps` - Progress steps container
- `.pagination__numbers` - Page numbers container

### Modifier
- `.progress--small` - Small size variant
- `.pagination__number--active` - Active page number
- `.progress__step--completed` - Completed step

## Accessibility Features

- Proper ARIA labels for interactive elements
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- RTL language support

## Responsive Design

- Mobile-first approach
- Flexible layouts that adapt to screen sizes
- Touch-friendly interactions
- Optimized spacing for different devices

## Usage Examples

### Basic Footer
```tsx
<Footer
  text="Simple footer with buttons"
  buttons={[
    { id: 'ok', type: 'primary', btnText: 'OK', onClick: handleOk }
  ]}
/>
```

### Footer with Progress
```tsx
<Footer
  text="Multi-step form"
  buttons={[
    { id: 'next', type: 'primary', btnText: 'Next', onClick: handleNext },
    { id: 'back', type: 'secondary', btnText: 'Back', onClick: handleBack }
  ]}
  progress={{ current: 2, total: 4 }}
/>
```

### Footer with Pagination
```tsx
<Footer
  text="Data table navigation"
  buttons={[
    { id: 'refresh', type: 'secondary', btnText: 'Refresh', onClick: handleRefresh }
  ]}
  pagination={{
    currentPage: 3,
    totalPages: 15,
    onPageChange: handlePageChange,
    showPageNumbers: true
  }}
/>
```

## Styling

All components use SCSS with:
- CSS custom properties for theming
- BEM methodology for class naming
- Responsive breakpoints
- RTL support
- Consistent spacing and typography

## Testing

Components include comprehensive Storybook stories covering:
- All prop combinations
- Edge cases
- Different states
- Responsive behavior
- Accessibility scenarios

## Future Enhancements

- Animation support
- Theme customization
- Additional size variants
- Enhanced accessibility features
- Performance optimizations
