import React, { useState, useCallback, useMemo } from 'react';
import './AdminHomePage.scss';
import SideNavBar from '../../components/storybook/NavBar/SideNavBar';
import { TableContainer, Column } from '../../components/storybook/Table';
import Button from '../../components/storybook/Button/Button';
import { IRequest } from '../../store/types';
import { assistanceRequests } from '../../data/requestsData';
import { useNavigate } from 'react-router-dom';
import mateLogoWhite from '../../assets/mate-logo-white.png';
import { Icons } from '../../components/storybook/icons/EmojiIcons';
import RequestDetailPanel from '../../components/storybook/SidePanel/RequestDetailPanel';
import { RequestDetail } from '../../data/sampleRequestData';

// Types
type TabType = 'open' | 'in-progress' | 'closed' | 'all';

interface StatusConfig {
  icon: string;
  label: string;
}

interface NavButton {
  id: string;
  btnText: string;
  onClick: () => void;
  icon: string;
}

// Constants
const STATUS_CONFIGS: Record<string, StatusConfig> = {
  'pending': { icon: '🟡', label: 'פתוח' },
  'in-progress': { icon: '🟠', label: 'בטיפול' },
  'completed': { icon: '🟢', label: 'סגור' },
};

const AdminHomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('open');
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestDetail | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);

  // Memoized filtered requests based on active tab
  const filteredRequests = useMemo(() => {
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
  }, [activeTab]);

  // Memoized table columns configuration
  const requestColumns: Column<IRequest>[] = useMemo(() => [
    {
      label: 'סטטוס',
      render: (row: IRequest) => {
        const status = row.requestStatus.requestStatus;
        const config = STATUS_CONFIGS[status as keyof typeof STATUS_CONFIGS] || STATUS_CONFIGS['pending'];
        return (
          <div className="admin-home-page__status-cell">
            <p>{config.icon} {config.label}</p>
          </div>
        );
      },
    },
    {
      label: 'תחום',
      render: (row: IRequest) => (
        <div className="admin-home-page__field-cell">
          <p>{row.requestDetails.requestType.icon} {row.requestDetails.requestType.label}</p>
        </div>
      ),
    },
    {
      label: 'שם',
      render: (row: IRequest) => (
        <div className="admin-home-page__name-cell">
          {row.requestDetails.requestName}
        </div>
      ),
    },
  ], []);

  // Memoized navigation buttons
  const navButtons: NavButton[] = useMemo(() => [
    {
      id: 'center',
      btnText: 'מרכז בקרה',
      onClick: () => console.log('מרכז בקרה clicked'),
      icon: '🏠',
    },
    {
      id: 'requests',
      btnText: 'בקשות',
      onClick: () => navigate('/RequestsPage'),
      icon: '📋',
    },
    {
      id: 'organizations',
      btnText: 'ארגונים',
      onClick: () => console.log('ארגונים clicked'),
      icon: '🏢',
    },
    {
      id: 'notifications',
      btnText: 'התראות',
      onClick: () => console.log('התראות clicked'),
      icon: '🔔',
    },
    {
      id: 'personalDetails',
      btnText: 'פרטים אישיים',
      onClick: () => console.log('פרטים אישיים clicked'),
      icon: '👤',
    },
  ], [navigate]);

  // Memoized tab counts
  const tabCounts = useMemo(() => ({
    closed: assistanceRequests.filter(req => req.requestStatus.requestStatus === 'completed').length,
    inProgress: assistanceRequests.filter(req => req.requestStatus.requestStatus === 'in-progress').length,
    open: assistanceRequests.filter(req => req.requestStatus.requestStatus === 'pending').length,
    all: assistanceRequests.length,
  }), []);

  // Callback handlers
  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const handleNavToggle = useCallback((navOpen: boolean) => {
    setIsNavOpen(navOpen);
  }, []);

  const handleNewRequest = useCallback(() => {
    navigate('/AssistanceFormRequest');
  }, [navigate]);

  // Handle row click to open detail panel
  const handleRowClick = useCallback((row: IRequest) => {
    // Convert IRequest to RequestDetail format
    const requestDetail: RequestDetail = {
      id: String(row.id),
      title: row.requestDetails.requestName || 'בקשה ללא כותרת',
      dateTime: new Date().toLocaleDateString('he-IL') + ' | ' + new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      tags: [
        { id: '1', label: row.requestDetails.requestType.label || 'סוג לא ידוע', icon: row.requestDetails.requestType.icon || '❓', category: 'type' as const },
        { id: '2', label: 'מחוז מרכז', icon: '📍', category: 'location' as const },
        { id: '3', label: '3 אנשים', icon: '👥', category: 'people' as const },
      ],
      originator: {
        role: 'מעלה הבקשה',
        name: 'Unknown',
      },
      contactDetails: {
        familyName: 'משפחה',
        address: 'כתובת לא ידועה',
        phone: 'טלפון לא ידוע',
      },
      description: 'תיאור הבקשה לא זמין',
      tasks: [
        {
          id: 'task-1',
          description: 'משימה ראשונה',
          status: 'pending',
        },
      ],
    };
    
    setSelectedRequest(requestDetail);
    setIsDetailPanelOpen(true);
  }, []);

  // Handle detail panel close
  const handleDetailPanelClose = useCallback(() => {
    setIsDetailPanelOpen(false);
    setSelectedRequest(null);
  }, []);

  // Handle request save
  const handleRequestSave = useCallback((updatedRequest: RequestDetail) => {
    console.log('Request saved:', updatedRequest);
    // Here you would typically save to your backend
    setSelectedRequest(updatedRequest);
  }, []);

  // Handle request validation
  const handleRequestValidate = useCallback((requestId: string) => {
    console.log('Request validated:', requestId);
    // Here you would typically update the request status
    alert(`בקשה ${requestId} אושרה בהצלחה!`);
  }, []);

  return (
    <div className="admin-home-page">
      {/* Sidebar Navigation */}
      <SideNavBar
        logo={<img src={mateLogoWhite} alt="logo" className="nav-bar__logo" />}
        title="מטה החמ״לים הארצי"
        buttons={navButtons}
        onToggle={handleNavToggle}
      />

      {/* Main Content */}
      <div className="admin-home-page__content">
        {/* Summary Cards Section */}
        <div className="admin-home-page__summary-section">
          <Button
            id="new-request"
            btnText="פתיחת בקשה חדשה"
            type="secondary"
            onClick={handleNewRequest}
            icon={Icons.add}
            size="medium"
          />
        </div>

        {/* Requests Section */}
        <div className="admin-home-page__requests-section">
          <div className="admin-home-page__requests-header">
            <h2 className="admin-home-page__requests-title">בקשות</h2>
            <div className="admin-home-page__requests-tabs">
              <Button
                id="closed"
                type={activeTab === 'closed' ? 'primary' : 'transparent-on-light'}
                btnText={`${tabCounts.closed} בקשות סגורות`}
                onClick={() => handleTabChange('closed')}
                size="medium"
              />
              <Button
                id="in-progress"
                type={activeTab === 'in-progress' ? 'primary' : 'transparent-on-light'}
                btnText={`${tabCounts.inProgress} בקשות בטיפול`}
                onClick={() => handleTabChange('in-progress')}
                size="medium"
              />
              <Button
                id="open"
                type={activeTab === 'open' ? 'primary' : 'transparent-on-light'}
                btnText={`${tabCounts.open} בקשות פתוחות`}
                onClick={() => handleTabChange('open')}
                size="medium"
              />
              <Button
                id="all"
                type={activeTab === 'all' ? 'primary' : 'transparent-on-light'}
                btnText={`${tabCounts.all} כל המשימות`}
                onClick={() => handleTabChange('all')}
                size="medium"
              />
            </div>
          </div>
          
          <div className={`admin-home-page__container ${!isNavOpen ? 'nav-closed' : ''}`}>
            <div className="admin-home-page__container__table">
              <TableContainer<IRequest>
                data={filteredRequests}
                columns={requestColumns}
                searchField="requestDetails.requestName"
                searchPlaceholder="חיפוש לפי שם הבקשה..."
                onRowClick={handleRowClick}
                panelTitle="פרטי הבקשה"
                filterPanelTitle="אפשרויות סינון"
              />
            </div>
            
            {/* Request Detail Panel */}
            {isDetailPanelOpen && selectedRequest && (
              <RequestDetailPanel
                request={selectedRequest}
                isOpen={isDetailPanelOpen}
                onClose={handleDetailPanelClose}
                onSave={handleRequestSave}
                onValidate={handleRequestValidate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
