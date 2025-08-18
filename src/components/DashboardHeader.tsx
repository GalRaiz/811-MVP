import React from 'react';
import './DashboardHeader.scss';

const DashboardHeader: React.FC = () => {
  return (
    <div className="dashboard-header">
      <div className="header-content">
        <h1 className="page-title">מרכז בקרה- מבקש סיוע</h1>
        <div className="breadcrumb">
          <span>דף הבית</span>
          <span className="separator">/</span>
          <span className="current">מרכז בקרה</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
