import React from 'react';
import './CompactCard.scss';

// SOLID Principles: Single Responsibility - each interface has one purpose
export interface ICompactCardProps {
  id: string;
  label: string;
  icon?: string;
  onClick?: () => void;
  isSelected?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * CompactCard - A reusable compact card component for assistance types and sub-types
 *
 * Follows SOLID principles:
 * - Single Responsibility: Handles only card display and interaction
 * - Open/Closed: Extensible through props without modification
 * - Liskov Substitution: Both type and sub-type variants work interchangeably
 * - Interface Segregation: Separate interfaces for different use cases
 * - Dependency Inversion: Depends on abstractions (interfaces) not concrete implementations
 */
const CompactCard: React.FC<ICompactCardProps> = ({
  label,
  icon,
  onClick,
  isSelected = false,
  disabled = false,
  className = '',
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const getCardClassName = () => {
    const baseClass = 'compact-card';
    const modifierClass = isSelected ? `${baseClass}--selected` : '';
    const disabledClass = disabled ? `${baseClass}--disabled` : '';

    return [baseClass, modifierClass, disabledClass, className]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div
      className={getCardClassName()}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={isSelected}
      aria-disabled={disabled}
    >
      <div className="compact-card__content">
        {icon && <div className="compact-card__icon">{icon}</div>}

        <div className="compact-card__text">
          <span className="compact-card__label">{label}</span>
        </div>
      </div>

      {isSelected && <div className="compact-card__check">✓</div>}
    </div>
  );
};

export default CompactCard;
