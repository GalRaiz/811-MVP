import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/storybook/FormField/FormField';
import Button from '../../components/storybook/Button/Button';
import Card from '../../components/storybook/Card/Card';
import { loginStart, loginSuccess, loginFailure, clearError } from '../../store/authSlice';
import authService from '../../services/authService';
import { RootState } from '../../store/store';
import './Login.scss';
import logo from '../../assets/mate-logo-green.png';
import Footer from '../../components/storybook/NavBar/Footer';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error) {
      setIsError(true);
    }
  }, [error]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validateForm = (): boolean => {
    const errors = {
      email: '',
      password: '',
    };

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      errors.password = 'Password must be at least 4 characters long';
    }

    setValidationErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      dispatch(loginStart());
      const user = await authService.login(formData);
      dispatch(loginSuccess(user));
      navigate('/home');
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
    }
  };

  const handleButtonClick = () => {
    if (validateForm()) {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  const handleDemoLogin = (role: 'Admin' | 'Requester' | 'Organization') => {
    const demoCredentials = {
      Admin: { email: 'alice@system.com', password: 'admin123' },
      Requester: { email: 'rachel@req.com', password: 'req123' },
      Organization: { email: 'olivia@org.com', password: 'org123' },
    };
    setFormData(demoCredentials[role]);
  };

  return (
    <div className="login">
      <Card
        id="loginCard"
        type="default"
        size="large"
        variant="elevated"
        title="ברוכים הבאים למערכת 811"
        className="login__card"
      >
        <div className="login__card-content">
          <div className="login__logo">
            <img src={logo} alt="811-Mate" />
          </div>
          
          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__form-fields">
              <FormField
                id="email"
                type="text"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value as string)}
                placeholder="הזן את הדוא״ל שלך"
                required
                validationRules={[{ type: 'email' }]}
              />

              <FormField
                id="password"
                type="password"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value as string)}
                placeholder="הזן את הסיסמה שלך"
                required
              />
            </div>
            {isError && (
              <div className="login__error login__error--global">{error}</div>
            )}

            <div className="login__actions">
              <Button
                id="login"
                type="primary"
                size="medium"
                btnText={isLoading ? 'מתחבר...' : 'התחברות'}
                onClick={handleButtonClick}
                isDisabled={isLoading}
                fullWidth
              />
            </div>
          </form>
        </div>
        <Footer 
          text="Demo Accounts"
          buttons={[{
            id: 'requester',
            type: 'secondary',
            size: 'medium',
            btnText: 'requester',
            onClick: () => handleDemoLogin('Requester'),
          },  
          { 
            id: 'admin',
            type: 'secondary',
            size: 'medium',
            btnText: 'admin',
            onClick: () => handleDemoLogin('Admin'),
          },
          {
            id: 'organization',
            type: 'secondary',
            size: 'medium',
            btnText: 'organization',
            onClick: () => handleDemoLogin('Organization'),
          },]}
        />
      </Card>
    </div>
  );
};

export default Login;
