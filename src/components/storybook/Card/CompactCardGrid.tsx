import React from 'react';
import './CompactCardGrid.scss';

export interface ICompactCardGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
  gap?: 'small' | 'normal' | 'large';
}

/**
 * CompactCardGrid - A responsive grid container for CompactCard components
 *
 * Follows SOLID principles:
 * - Single Responsibility: Handles only grid layout
 * - Open/Closed: Extensible through props without modification
 * - Dependency Inversion: Depends on React.ReactNode abstraction
 */
const CompactCardGrid: React.FC<ICompactCardGridProps> = ({
  children,
  className = '',
  columns = 3,
  gap = 'normal',
}) => {
  const getGridClassName = () => {
    const baseClass = 'compact-card-grid';
    const columnsClass = `${baseClass}--columns-${columns}`;
    const gapClass = `${baseClass}--gap-${gap}`;

    return [baseClass, columnsClass, gapClass, className]
      .filter(Boolean)
      .join(' ');
  };

  return <div className={getGridClassName()}>{children}</div>;
};

export default CompactCardGrid;
