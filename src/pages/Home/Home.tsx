import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/storybook/Card/Card';
import Button from '../../components/storybook/Button/Button';
import { logout } from '../../store/authSlice';
import { RootState } from '../../store/store';
import './Home.scss';
import PageHeader from '../../components/storybook/NavBar/PageHeader';
import logo from '../../assets/mate-logo-white.png';
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
          title: 'ברוך הבא, אדמין',
          description: 'כאן אתה יכול לנהל את המערכת, לצפות בכל הבקשות ולנהל את הפעילות.',
          features: [
            'צפה בכל הבקשות במערכת',
            'נהל חשבונות משתמשים',
            'סטטיסטיקה ודוחות מערכת',
            'הגדרות מערכת'
          ]
        };
      case 'Requester':
        return {
          title: 'Welcome Requester',
              description: 'אתה יכול לשלוח ולצפות בבקשות שלך.',
          features: [
            'שלוח בקשות חדשות',
            'צפה בהיסטוריה של הבקשות שלך',
            'עקוב אחר סטטוס הבקשות',
            'לעדכן פרטים של הבקשה'
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
          title: 'ברוך הבא',
          description: 'יש ליצור קשר עם התמיכה להצבת תפקיד.',
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
      <PageHeader
        title={user.role}
        logo={logo}
        buttons={
          [
            {
              type: 'secondary',
              size: 'medium',
              btnText: 'Logout',
              onClick: handleLogout
            }
          ]
        }
      />
      <div className="home__content">
        <div className="home__main-card">
          <Card
            title={`ברוך הבא, ${user.name}`}
            description={roleContent.description}
          >
            <div className="home__features">
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
