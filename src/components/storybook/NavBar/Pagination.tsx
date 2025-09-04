import React from 'react';
import './Pagination.scss';

// ==== Interfaces ====
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

// ==== Pagination Component ====
const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showPageNumbers = true,
  maxVisiblePages = 10,
  className = ''
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    
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

  const paginationClassName = `pagination ${className}`.trim();

  return (
    <div className={paginationClassName} dir="rtl">
      {/* Previous Page Arrow */}
      <button
        className="pagination__arrow pagination__arrow--prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        «
      </button>
      
      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="pagination__numbers">
          {renderPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`pagination__number ${
                page === currentPage ? 'pagination__number--active' : ''
              } ${page === '...' ? 'pagination__number--ellipsis' : ''}`}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...'}
              aria-label={page === '...' ? 'More pages' : `Go to page ${page}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
      
      {/* Next Page Arrow */}
      <button
        className="pagination__arrow pagination__arrow--next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
