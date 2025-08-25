import React from 'react';
import './DisplayField.scss';

// ============================================================================
// DISPLAY FIELD COMPONENT - Read-only Information Display
// ============================================================================

export interface DisplayFieldProps {
  /** The label for the display field */
  label?: string;
  /** The value to display */
  value?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether the field is required (adds asterisk) */
  required?: boolean;
  /** The size variant for the label */
  labelSize?: 'small' | 'normal' | 'large';
  /** The size variant for the value */
  valueSize?: 'small' | 'normal' | 'large';
  /** The color variant for the value */
  valueVariant?:
    | 'primary'
    | 'secondary'
    | 'highlighted'
    | 'success'
    | 'warning'
    | 'error';
  /** Whether to truncate long values */
  truncated?: boolean;
  /** Whether the value supports multiline text */
  multiline?: boolean;
  /** Whether to highlight this field */
  highlighted?: boolean;
  /** Whether to use compact spacing */
  compact?: boolean;
  /** Whether to display inline (label and value on same line) */
  inline?: boolean;
  /** Whether to remove the bottom border */
  noBorder?: boolean;
}

/**
 * DisplayField component for showing read-only information
 *
 * @example
 * ```tsx
 * <DisplayField
 *   label="Status"
 *   value="Active"
 *   valueVariant="success"
 * />
 * ```
 */
export const DisplayField: React.FC<DisplayFieldProps> = ({
  label,
  value,
  className = '',
  required = false,
  labelSize = 'normal',
  valueSize = 'normal',
  valueVariant = 'primary',
  truncated = false,
  multiline = false,
  highlighted = false,
  compact = false,
  inline = false,
  noBorder = false,
}) => {
  const labelClasses = [
    'display-label',
    labelSize !== 'normal' && `display-label--${labelSize}`,
    required && 'display-label--required',
    inline && 'display-label--inline',
  ]
    .filter(Boolean)
    .join(' ');

  const valueClasses = [
    'display-value',
    valueSize !== 'normal' && `display-value--${valueSize}`,
    valueVariant !== 'primary' && `display-value--${valueVariant}`,
    truncated && 'display-value--truncated',
    multiline && 'display-value--multiline',
    inline && 'display-value--inline',
  ]
    .filter(Boolean)
    .join(' ');

  const itemClasses = [
    'display-item',
    highlighted && 'display-item--highlighted',
    compact && 'display-item--compact',
    inline && 'display-item--inline',
    noBorder && 'display-item--no-border',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${itemClasses} ${className}`}>
      {label && <div className={labelClasses}>{label}</div>}
      {value !== undefined && <div className={valueClasses}>{value}</div>}
    </div>
  );
};

// ============================================================================
// DISPLAY FIELD CONTAINER COMPONENT
// ============================================================================

export interface DisplayFieldContainerProps {
  /** The children to render */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** The layout variant */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** Whether to use compact spacing */
  compact?: boolean;
}

/**
 * DisplayFieldContainer component for grouping multiple display fields
 *
 * @example
 * ```tsx
 * <DisplayFieldContainer layout="horizontal" compact>
 *   <DisplayField label="Name" value="John Doe" />
 *   <DisplayField label="Email" value="john@example.com" />
 * </DisplayFieldContainer>
 * ```
 */
export const DisplayFieldContainer: React.FC<DisplayFieldContainerProps> = ({
  children,
  className = '',
  layout = 'vertical',
  compact = false,
}) => {
  const containerClasses = [
    'display-field',
    layout !== 'vertical' && `display-field--${layout}`,
    compact && 'display-field--compact',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={`${containerClasses} ${className}`}>{children}</div>;
};

// ============================================================================
// DISPLAY GROUP COMPONENT
// ============================================================================

export interface DisplayGroupProps {
  /** The title for the group */
  title?: string;
  /** The children to render */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** The layout variant */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** Whether to use compact spacing */
  compact?: boolean;
}

/**
 * DisplayGroup component for grouping related display fields with a title
 *
 * @example
 * ```tsx
 * <DisplayGroup title="Personal Information" layout="horizontal">
 *   <DisplayField label="Name" value="John Doe" />
 *   <DisplayField label="Email" value="john@example.com" />
 * </DisplayGroup>
 * ```
 */
export const DisplayGroup: React.FC<DisplayGroupProps> = ({
  title,
  children,
  className = '',
  layout = 'vertical',
  compact = false,
}) => {
  const groupClasses = [
    'display-group',
    layout !== 'vertical' && `display-group--${layout}`,
    compact && 'display-group--compact',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${groupClasses} ${className}`}>
      {title && <div className="display-group__title">{title}</div>}
      {children}
    </div>
  );
};

// ============================================================================
// DISPLAY SECTION COMPONENT
// ============================================================================

export interface DisplaySectionProps {
  /** The title for the section */
  title?: string;
  /** The subtitle for the section */
  subtitle?: string;
  /** The children to render */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to use compact spacing */
  compact?: boolean;
  /** Whether to remove the header border */
  noHeaderBorder?: boolean;
  /** Actions to display in the header */
  actions?: React.ReactNode;
}

/**
 * DisplaySection component for creating sections with headers
 *
 * @example
 * ```tsx
 * <DisplaySection
 *   title="Contact Information"
 *   subtitle="Primary contact details"
 *   actions={<Button>Edit</Button>}
 * >
 *   <DisplayField label="Name" value="John Doe" />
 *   <DisplayField label="Email" value="john@example.com" />
 * </DisplaySection>
 * ```
 */
export const DisplaySection: React.FC<DisplaySectionProps> = ({
  title,
  subtitle,
  children,
  className = '',
  compact = false,
  noHeaderBorder = false,
  actions,
}) => {
  const sectionClasses = [
    'display-section',
    compact && 'display-section--compact',
  ]
    .filter(Boolean)
    .join(' ');

  const headerClasses = [
    'display-section__header',
    noHeaderBorder && 'display-section__header--no-border',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${sectionClasses} ${className}`}>
      {(title || actions) && (
        <div className={headerClasses}>
          <div>
            {title && <h3 className="display-section__title">{title}</h3>}
            {subtitle && (
              <p className="display-section__subtitle">{subtitle}</p>
            )}
          </div>
          {actions && <div className="display-section__actions">{actions}</div>}
        </div>
      )}
      <div className="display-section__content">{children}</div>
    </div>
  );
};

// ============================================================================
// DISPLAY GRID COMPONENT
// ============================================================================

export interface DisplayGridProps {
  /** The children to render */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** The number of columns */
  columns?: 2 | 3 | 4 | 'auto-fit';
  /** Whether to use compact spacing */
  compact?: boolean;
}

/**
 * DisplayGrid component for grid layout of display fields
 *
 * @example
 * ```tsx
 * <DisplayGrid columns={3} compact>
 *   <DisplayField label="Name" value="John Doe" />
 *   <DisplayField label="Email" value="john@example.com" />
 *   <DisplayField label="Phone" value="+1234567890" />
 * </DisplayGrid>
 * ```
 */
export const DisplayGrid: React.FC<DisplayGridProps> = ({
  children,
  className = '',
  columns = 'auto-fit',
  compact = false,
}) => {
  const gridClasses = [
    'display-grid',
    columns !== 'auto-fit' && `display-grid--${columns}-cols`,
    columns === 'auto-fit' && 'display-grid--auto-fit',
    compact && 'display-grid--compact',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={`${gridClasses} ${className}`}>{children}</div>;
};

// ============================================================================
// DISPLAY LIST COMPONENT
// ============================================================================

export interface DisplayListProps {
  /** The items to display */
  items: Array<{
    id: string | number;
    label?: string;
    value: React.ReactNode;
  }>;
  /** Additional CSS classes */
  className?: string;
  /** Whether to use compact spacing */
  compact?: boolean;
  /** Whether to display horizontally */
  horizontal?: boolean;
  /** Whether to highlight items */
  highlighted?: boolean;
}

/**
 * DisplayList component for displaying lists of information
 *
 * @example
 * ```tsx
 * <DisplayList
 *   items={[
 *     { id: 1, label: "Feature 1", value: "Available" },
 *     { id: 2, label: "Feature 2", value: "Not available" }
 *   ]}
 *   compact
 * />
 * ```
 */
export const DisplayList: React.FC<DisplayListProps> = ({
  items,
  className = '',
  compact = false,
  horizontal = false,
  highlighted = false,
}) => {
  const listClasses = [
    'display-list',
    compact && 'display-list--compact',
    horizontal && 'display-list--horizontal',
  ]
    .filter(Boolean)
    .join(' ');

  const itemClasses = [
    'display-list__item',
    compact && 'display-list__item--compact',
    highlighted && 'display-list__item--highlighted',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${listClasses} ${className}`}>
      {items.map(item => (
        <div key={item.id} className={itemClasses}>
          <div className="display-list__bullet" />
          {item.label && (
            <span className="display-label display-label--small">
              {item.label}:
            </span>
          )}
          <span className="display-value display-value--small">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// EXPORT ALL COMPONENTS
// ============================================================================

export default DisplayField;
