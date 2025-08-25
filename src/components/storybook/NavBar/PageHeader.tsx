import React from 'react';
import './PageHeader.scss';

interface PageHeaderProps {
  title: string;
  logo?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, logo }) => {
  return (
    <header className="assistance-form-header">
      <div className="assistance-form-header__content">
        <div className="assistance-form-header__logo">
          {logo && <img src={logo} alt="logo" className="nav-bar__logo" />}
        </div>
        <h1 className="assistance-form-header__title">{title}</h1>
      </div>
    </header>
  );
};

export default PageHeader;
