import React from 'react';
import './DashboardHeader.scss';

interface DashboardHeaderProps {
  title: string;
  breadcrumb?: { label: string }[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, breadcrumb }) => {
  return (
    <div className='dashboard-header'>
      <div className='header-content'>
        <h1 className='page-title'>{title}</h1>
        {breadcrumb && (
          <div className='breadcrumb'>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <span>{item.label}</span>
                {index < breadcrumb.length - 1 && <span className='separator'>/</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
