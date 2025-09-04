import React, { useMemo, useState } from 'react';
import './RequesterHomePage.scss';
import DashboardHeader from '../../components/storybook/NavBar/DashboardHeader';
import RequestsSection from '../../components/RequestsSection';
import AlertsSection from '../../components/AlertsSection';
import { Card } from '../../components/storybook/Card';
import SideNavBar from '../../components/storybook/NavBar/SideNavBar';
import logo from '../../assets/mate-logo-white.png';
import { useNavigate } from 'react-router-dom';
import { assistanceRequests } from '../../data/requestsData';
import { Icons } from '../../components/storybook/icons/EmojiIcons';

const RequesterHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(true);

  const summaryCards = useMemo(() => {
    const openCount = assistanceRequests.filter(
      request => request.requestStatus?.requestStatus === 'pending'
    ).length;
    const inProgressCount = assistanceRequests.filter(
      request => request.requestStatus?.requestStatus === 'in-progress'
    ).length;
    const closedCount = assistanceRequests.filter(
      request => request.requestStatus?.requestStatus === 'completed'
    ).length;
    return [
      {
        id: 1,
        title: 'בקשות פתוחות',
        count: openCount,
        icon: '🟡',
      },
      {
        id: 2,
        title: 'בקשות בטיפול',
        count: inProgressCount,
        icon: '🟢',
      },
      {
        id: 3,
        title: 'בקשות סגורות',
        count: closedCount,
        icon: '⚫',
      },
    ];
  }, []);


  return (
    <div className="requester-home-page">
      <div className="dashboard-container">
        <SideNavBar
          logo={<img src={logo} alt="logo" className="nav-bar__logo" />}
          title="מטה החמ״לים הארצי"
          buttons={[
            { btnText: 'עמוד הבית', onClick: () => navigate('/HomePage') },
            { btnText: 'בקשות', onClick: () => navigate('/RequestsPage') },
            { btnText: 'הפרופיל שלי', onClick: () => navigate('/ProfilePage') },
          ]}
          onToggle={isOpen => setIsNavOpen(isOpen)}
        />
        <div className={`main-content ${!isNavOpen ? 'nav-closed' : ''}`}>
          <DashboardHeader
            title="מרכז בקרה"
            breadcrumb={[{ label: 'דף הבית' }, { label: 'מרכז בקרה' }]}
          />

          <div className="dashboard-grid">
            <div className="left-column">
              <RequestsSection data={assistanceRequests} />
            </div>

            <div className="right-column">
              <AlertsSection />
              <div className="summary-cards">
                {summaryCards.map(card => (
                  <Card
                    key={card.id}
                    type="info"
                    title={card.title}
                    icon={card.icon}
                    className="summary-card"
                  >
                    <div className="summary-card__count">{card.count}</div>
                  </Card>
                ))}
                <Card
                  type="info"
                  title="בקשה חדשה"
                  icon={Icons.add}
                  onClick={() => navigate('/AssistanceFormRequest')}
                  className="summary-card summary-card--new"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequesterHomePage;
