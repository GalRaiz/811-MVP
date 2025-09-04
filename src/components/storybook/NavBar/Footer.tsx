import React from 'react';
import Button from '../Button/Button';
import { ButtonProps } from '../Button/Button';
import Progress from './Progress';
import Pagination from './Pagination';
import './Footer.scss';

// ==== Interfaces ====
export interface ProgressProps {
  current: number;
  total: number;
  size?: 'small' | 'medium' | 'large';
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
}

export interface FooterProps {
  text?: string;
  buttons: ButtonProps[];
  progress?: ProgressProps;
  pagination?: PaginationProps;
  children?: React.ReactNode;
  className?: string;
}

// ==== Footer Component ====
const Footer: React.FC<FooterProps> = ({
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

        {/* Progress Section */}
        {progress && (
          <div className="page-footer__progress-wrapper">
            <Progress {...progress} />
          </div>
        )}

        {/* Pagination Section */}
        {pagination && (
          <div className="page-footer__pagination-wrapper">
            <Pagination {...pagination} />
          </div>
        )}

        {/* Buttons Section */}
        {buttons && buttons.length > 0 && (
          <div className="page-footer__buttons">
            {buttons.map((button) => (
              <Button
                id={button.id}
                key={button.id}
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

export default Footer;
