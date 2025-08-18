import React, { useState } from 'react';
import './RequesterHomePage.scss';
import DashboardHeader from '../components/DashboardHeader';
import RequestsSection from '../components/RequestsSection';
import AlertsSection from '../components/AlertsSection';
import SummaryCards from '../components/SummaryCards';
import NavBar from '../components/storybook/NavBar';

const RequesterHomePage: React.FC = () => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(true);
  const handleCloseNavBar = () => {
    setIsNavBarOpen(false);
  };
  
  return (
    <div className="requester-home-page">
      <div className="dashboard-container">
      <NavBar userType={"requester"} onClose={ handleCloseNavBar } isNavBarOpen={isNavBarOpen}  />
        <div className="main-content">
          <DashboardHeader />
          
          <div className="dashboard-grid">
            <div className="left-column">
              <RequestsSection />
            </div>
            
            <div className="right-column">
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


