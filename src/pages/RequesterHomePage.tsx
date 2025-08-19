import React from 'react';
import './RequesterHomePage.scss';
import DashboardHeader from '../components/DashboardHeader';
import RequestsSection from '../components/RequestsSection';
import AlertsSection from '../components/AlertsSection';
import SummaryCards from '../components/SummaryCards';
import SideNavBar from '../components/storybook/NavBar/SideNavBar';
import logo from '../assets/mate-logo-green.png';
import { useNavigate } from 'react-router-dom';

const RequesterHomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className='requester-home-page'>
      <div className='dashboard-container'>
        <SideNavBar
          logo={<img src={logo} alt="logo" className="nav-bar__logo" />}
          title="מטה החמ״לים הארצי"
          buttons={[
            { btnText: "עמוד הבית", onClick: () => navigate("/HomePage") },
            { btnText: "בקשות", onClick: () => navigate("/RequestsPage") },
            { btnText: "הפרופיל שלי", onClick: () => navigate("/ProfilePage") },
          ]}
        />
        <div className='main-content'>
          <DashboardHeader />

          <div className='dashboard-grid'>
            <div className='left-column'>
              <RequestsSection />
            </div>

            <div className='right-column'>
              <AlertsSection />
            </div>
          </div>

          <SummaryCards />
        </div>
      </div>
    </div>
  );
};

export default RequesterHomePage;
