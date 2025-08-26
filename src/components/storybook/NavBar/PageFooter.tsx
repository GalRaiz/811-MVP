import React from 'react';
import Button from '../Button/Button';
import { ButtonProps } from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import './PageFooter.scss';

// ==== Interfaces ====
interface PageFooterProgressProps {
  current: number;
  total: number;
  showLabels?: boolean;
  showPercentage?: boolean;
  size?: 'small' | 'medium' | 'large';
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
}

interface PageFooterProps {
  text: string;
  buttons: ButtonProps[];
  progress?: PageFooterProgressProps;
  pagination?: PaginationProps;
  children?: React.ReactNode;
  className?: string;
}



const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showPageNumbers = true 
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="page-footer__pagination">
      <Button
        type="secondary"
        size="small"
        btnText="הקודם"
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage <= 1}
        icon="◀"
      />
      
      {showPageNumbers && (
        <div className="page-footer__pagination-numbers">
          {renderPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`page-footer__pagination-number ${
                page === currentPage ? 'page-footer__pagination-number--active' : ''
              } ${page === '...' ? 'page-footer__pagination-ellipsis' : ''}`}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}
        </div>
      )}
      
      <Button
        type="secondary"
        size="small"
        btnText="הבא"
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
        icon="▶"
        iconPosition="right"
      />
    </div>
  );
};

// ==== Main Component ====
const PageFooter: React.FC<PageFooterProps> = ({
  text,
  buttons,
  progress,
  pagination,
  children,
  className = ''
}) => {
  const footerClassName = `page-footer ${className}`.trim();

  return (
    <footer className={footerClassName} dir="rtl">
      <div className="page-footer__content">
        {/* Text Section */}
        {text && (
          <div className="page-footer__text">
            <p>{text}</p>
          </div>
        )}

        {/* Progress Bar Section */}
        {progress && (
          <div className="page-footer__progress-wrapper">
            <ProgressBar {...progress} />
          </div>
        )}

        {/* Pagination Section */}
        {pagination && (
          <Pagination {...pagination} />
        )}

        {/* Buttons Section */}
        {buttons && buttons.length > 0 && (
          <div className="page-footer__buttons">
            {buttons.map((button, index) => (
              <Button
                key={index}
                type={button.type}
                size={button.size}
                btnText={button.btnText}
                icon={button.icon}
                iconPosition={button.iconPosition}
                onClick={button.onClick}
                isDisabled={button.isDisabled}
                fullWidth={button.fullWidth}
              />
            ))}
          </div>
        )}
      </div>

      {/* Children Section */}
      {children && (
        <div className="page-footer__children">
          {children}
        </div>
      )}
    </footer>
  );
};

export default PageFooter;
