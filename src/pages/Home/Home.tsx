import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/storybook/Card/Card';
import Button from '../../components/storybook/Button/Button';
import { logout } from '../../store/authSlice';
import { RootState } from '../../store/store';
import './Home.scss';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getRoleContent = () => {
    switch (user?.role) {
      case 'Admin':
        return {
          title: 'Welcome Admin',
          description: 'You can manage the system, view all requests, and oversee operations.',
          features: [
            'View all system requests',
            'Manage user accounts',
            'System analytics and reports',
            'Configuration settings'
          ]
        };
      case 'Requester':
        return {
          title: 'Welcome Requester',
          description: 'You can submit and view your assistance requests.',
          features: [
            'Submit new assistance requests',
            'View your request history',
            'Track request status',
            'Update request details'
          ]
        };
      case 'Organization':
        return {
          title: 'Welcome Organization',
          description: 'You can manage volunteers and handle incoming requests.',
          features: [
            'Manage volunteer teams',
            'View and assign requests',
            'Track volunteer activities',
            'Generate organization reports'
          ]
        };
      default:
        return {
          title: 'Welcome',
          description: 'Please contact support for role assignment.',
          features: []
        };
    }
  };

  const roleContent = getRoleContent();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__user-info">
          <h1 className="home__title">{roleContent.title}</h1>
          <p className="home__user-name">Hello, {user.name}</p>
        </div>
        <Button
          type="secondary"
          size="medium"
          btnText="Logout"
          onClick={handleLogout}
        />
      </div>

      <div className="home__content">
        <div className="home__main-card">
          <Card
            title={roleContent.title}
            description={roleContent.description}
            buttons={[]}
          >
            <div className="home__features">
              <h3 className="home__features-title">Your Capabilities:</h3>
              <ul className="home__features-list">
                {roleContent.features.map((feature, index) => (
                  <li key={index} className="home__features-item">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        <div className="home__quick-actions">
          <h3 className="home__quick-actions-title">Quick Actions</h3>
          <div className="home__quick-actions-grid">
            {user.role === 'Admin' && (
              <>
                <Button
                  type="primary"
                  size="medium"
                  btnText="View All Requests"
                  onClick={() => navigate('/RequestsPage')}
                />
                <Button
                  type="secondary"
                  size="medium"
                  btnText="System Settings"
                  onClick={() => navigate('/adminHomePage')}
                />
              </>
            )}
            
            {user.role === 'Requester' && (
              <>
                <Button
                  type="primary"
                  size="medium"
                  btnText="Submit Request"
                  onClick={() => navigate('/AssistanceFormRequest')}
                />
                <Button
                  type="secondary"
                  size="medium"
                  btnText="My Requests"
                  onClick={() => navigate('/requesterHomePage')}
                />
              </>
            )}
            
            {user.role === 'Organization' && (
              <>
                <Button
                  type="primary"
                  size="medium"
                  btnText="Manage Volunteers"
                  onClick={() => navigate('/requesterHomePage')}
                />
                <Button
                  type="secondary"
                  size="medium"
                  btnText="View Requests"
                  onClick={() => navigate('/RequestsPage')}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
