import React, { useState } from 'react';
import './AdminHomePage.scss';
import SideNavBar from '../../components/storybook/NavBar/SideNavBar';
import Table, { Column } from '../../components/storybook/Table/Table';
import Button from '../../components/storybook/Button/Button';
import { IRequest } from '../../store/types';
import { assistanceRequests } from '../../data/requestsData';
import { useNavigate } from 'react-router-dom';
import mateLogoWhite from '../../assets/mate-logo-white.png';
import { Icons } from '../../components/storybook/icons/EmojiIcons';

const AdminHomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'open' | 'in-progress' | 'closed' | 'all'>('open');
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);  
  // Filter requests based on active tab
  const getFilteredRequests = () => {
    switch (activeTab) {
      case 'open':
        return assistanceRequests.filter(req => req.requestStatus.requestStatus === 'pending');
      case 'in-progress':
        return assistanceRequests.filter(req => req.requestStatus.requestStatus === 'in-progress');
      case 'closed':
        return assistanceRequests.filter(req => req.requestStatus.requestStatus === 'completed');
      case 'all':
        return assistanceRequests;
      default:
        return assistanceRequests;
    }
  };

  // Table columns for requests
  const requestColumns: Column<IRequest>[] = [
    {
      label: 'סטטוס',
      render: (row) => {
        const status = row.requestStatus.requestStatus;
        const statusConfig = {
          'pending': { icon: '🟡', label: 'פתוח' },
          'in-progress': { icon: '🟠', label: 'בטיפול' },
          'completed': { icon: '🟢', label: 'סגור' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return (
          <div className="admin-home-page__status-cell">
            <span className="admin-home-page__status-icon">{config.icon}</span>
            <span className="admin-home-page__status-label">{config.label}</span>
          </div>
        );
      },
    },
    {
      label: 'תחום',
      render: (row) => (
        <div className="admin-home-page__field-cell">
          <span className="admin-home-page__field-icon">{row.requestDetails.requestType.icon}</span>
          <span className="admin-home-page__field-label">{row.requestDetails.requestType.label}</span>
        </div>
      ),
    },
    {
      label: 'שם',
      render: (row) => (
        <div className="admin-home-page__name-cell">
          {row.requestDetails.requestName}
        </div>
      ),
    },
  ];

  // Navigation buttons for sidebar
  const navButtons = [
    {
      btnText: 'מרכז בקרה',
      onClick: () => console.log('מרכז בקרה clicked'),
      icon: '🏠',
    },
    {
      btnText: 'בקשות',
      onClick: () => navigate('/RequestsPage'),
      icon: '📋',
    },
    {
      btnText: 'ארגונים',
      onClick: () => console.log('ארגונים clicked'),
      icon: '🏢',
    },
    {
      btnText: 'התראות',
      onClick: () => console.log('התראות clicked'),
      icon: '🔔',
    },
    {
      btnText: 'פרטים אישיים',
      onClick: () => console.log('פרטים אישיים clicked'),
      icon: '👤',
    },
  ];

  return (
    <div className="admin-home-page">
      {/* Sidebar Navigation */}
      <SideNavBar
          logo={<img src={mateLogoWhite} alt="logo" className="nav-bar__logo" />}
          title="מטה החמ״לים הארצי"
          buttons={navButtons}
          onToggle={isNavOpen => setIsNavOpen(isNavOpen)}
        />

      {/* Main Content */}
      <div className="admin-home-page__content">
        {/* Summary Cards Section */}
        <div className="admin-home-page__summary-section">
          <Button
            btnText="פתיחת בקשה חדשה"
            onClick={() => navigate('/AssistanceFormRequest')}
            icon={Icons.add}
            size="medium"
            type="secondary"
          />
        </div>

        {/* Requests Section */}
        <div className="admin-home-page__requests-section">
          <div className="admin-home-page__requests-header">
            <h2 className="admin-home-page__requests-title">בקשות</h2>
            <div className="admin-home-page__requests-tabs">
              <Button
                type={activeTab === 'closed' ? 'primary' : 'transparent-on-light'}
                btnText={`${assistanceRequests.filter(req => req.requestStatus.requestStatus === 'completed').length} בקשות סגורות`}
                onClick={() => setActiveTab('closed')}
                size="medium"
              />
              <Button
                type={activeTab === 'in-progress' ? 'primary' : 'transparent-on-light'}
                btnText={`${assistanceRequests.filter(req => req.requestStatus.requestStatus === 'in-progress').length} בקשות בטיפול`}
                onClick={() => setActiveTab('in-progress')}
                size="medium"
              />
              <Button
                type={activeTab === 'open' ? 'primary' : 'transparent-on-light'}
                btnText={`${assistanceRequests.filter(req => req.requestStatus.requestStatus === 'pending').length} בקשות פתוחות`}
                onClick={() => setActiveTab('open')}
                size="medium"
              />
              <Button
                type={activeTab === 'all' ? 'primary' : 'transparent-on-light'}
                btnText={`${assistanceRequests.length} כל המשימות`}
                onClick={() => setActiveTab('all')}
                size="medium"
              />
            </div>
          </div>
          <div className={`admin-home-page__container ${!isNavOpen ? 'nav-closed' : ''}`}>
          <div className="admin-home-page__container__table">
            <Table<IRequest>
              data={getFilteredRequests()}
              columns={requestColumns}
              searchField="requestDetails.requestName"
              searchPlaceholder="חיפוש לפי שם הבקשה..."
              disableInternalFiltering={true}
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
