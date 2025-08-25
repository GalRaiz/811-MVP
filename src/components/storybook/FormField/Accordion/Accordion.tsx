import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from 'react';
import './Accordion.scss';

// ============================================================================
// ACCORDION CONTEXT
// ============================================================================

interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
  isSingle: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion component');
  }
  return context;
};

// ============================================================================
// ACCORDION COMPONENT
// ============================================================================

export interface AccordionProps {
  /** The children to render */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether only one item can be open at a time */
  single?: boolean;
  /** The style variant */
  variant?: 'default' | 'card' | 'compact';
  /** Default open items */
  defaultOpenItems?: string[];
  /** Controlled open items */
  openItems?: string[];
  /** Callback when open items change */
  onOpenItemsChange?: (openItems: string[]) => void;
}

/**
 * Simple Accordion component for collapsible content sections
 *
 * @example
 * ```tsx
 * <Accordion single variant="card">
 *   <AccordionItem id="1" title="Section 1">
 *     <p>Content here</p>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion: React.FC<AccordionProps> = ({
  children,
  className = '',
  single = false,
  variant = 'default',
  defaultOpenItems = [],
  openItems: controlledOpenItems,
  onOpenItemsChange,
}) => {
  const [internalOpenItems, setInternalOpenItems] = useState<Set<string>>(
    new Set(defaultOpenItems)
  );

  const isControlled = controlledOpenItems !== undefined;
  const openItemsSet = isControlled
    ? new Set(controlledOpenItems)
    : internalOpenItems;

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItemsSet);

    if (single) {
      newOpenItems.clear();
      newOpenItems.add(id);
    } else {
      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        newOpenItems.add(id);
      }
    }

    if (!isControlled) {
      setInternalOpenItems(newOpenItems);
    }

    onOpenItemsChange?.(Array.from(newOpenItems));
  };

  const accordionClasses = [
    'accordion',
    single && 'accordion--single',
    variant !== 'default' && `accordion--${variant}`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <AccordionContext.Provider
      value={{
        openItems: openItemsSet,
        toggleItem,
        isSingle: single,
      }}
    >
      <div className={`${accordionClasses} ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

// ============================================================================
// ACCORDION ITEM COMPONENT
// ============================================================================

export interface AccordionItemProps {
  /** Unique identifier for the accordion item */
  id: string;
  /** The title for the accordion item */
  title: string;
  /** The subtitle for the accordion item */
  subtitle?: string;
  /** The children to render */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Badge to display in the header */
  badge?: {
    text: string;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'secondary';
  };
}

/**
 * AccordionItem component for individual accordion sections
 *
 * @example
 * ```tsx
 * <AccordionItem
 *   id="personal-info"
 *   title="Personal Information"
 *   subtitle="Basic contact details"
 *   badge={{ text: "Required", variant: "warning" }}
 * >
 *   <DisplayField label="Name" value="John Doe" />
 * </AccordionItem>
 * ```
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  disabled = false,
  badge,
}) => {
  const { openItems, toggleItem } = useAccordionContext();
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const isOpen = openItems.has(id);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, [children]);

  const itemClasses = [
    'accordion-item',
    isOpen && 'accordion-item--open',
    disabled && 'accordion-item--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    if (!disabled) {
      toggleItem(id);
    }
  };

  return (
    <div className={`${itemClasses} ${className}`}>
      <button
        className="accordion-item__header"
        onClick={handleToggle}
        disabled={disabled}
        type="button"
      >
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div className="accordion-item__title">{title}</div>
          {subtitle && (
            <div className="accordion-item__subtitle">{subtitle}</div>
          )}
        </div>

        {badge && (
          <div
            className={`accordion-item__badge accordion-item__badge--${badge.variant || 'secondary'}`}
          >
            {badge.text}
          </div>
        )}

        <div className="accordion-item__icon">▼</div>
      </button>

      <div
        className="accordion-item__content"
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : '0px',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

// ============================================================================
// EXPORT
// ============================================================================

export default Accordion;
