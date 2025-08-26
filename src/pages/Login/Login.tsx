import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/storybook/FormField/FormField';
import Button from '../../components/storybook/Button/Button';
import Modal from '../../components/storybook/Modal/Modal';
import { loginStart, loginSuccess, loginFailure, clearError } from '../../store/authSlice';
import authService from '../../services/authService';
import { RootState } from '../../store/store';
import './Login.scss';
import logo from '../../assets/mate-logo-green.png';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

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
    } else if (formData.password.length < 3) {
      errors.password = 'Password must be at least 3 characters long';
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
      <Modal
        isOpen={true}
        onClose={() => {}} // No close functionality for login
        title="ברוכים הבאים למערכת 811"
        size="fit-content"
        showCloseButton={false}
      >
        <div className="login__modal-content">
          <div className="login__logo">
            <img src={logo} alt="811-Mate" />
          </div>
          
          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__form-fields">
              <FormField
                id="email"
                // label="Email"
                type="text"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value as string)}
                placeholder="הזן את הדוא״ל שלך"
                required
                className={validationErrors.email ? 'form-field--error' : ''}
              />
              {validationErrors.email && (
                <div className="login__error">{validationErrors.email}</div>
              )}

              <FormField
                id="password"
                // label="Password"
                type="password"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value as string)}
                placeholder="הזן את הסיסמה שלך"
                required
                className={validationErrors.password ? 'form-field--error' : ''}
              />
              {validationErrors.password && (
                <div className="login__error">{validationErrors.password}</div>
              )}
            </div>

            {error && (
              <div className="login__error login__error--global">{error}</div>
            )}

            <div className="login__actions">
              <Button
                type="primary"
                size="medium"
                btnText={isLoading ? 'מתחבר...' : 'התחברות'}
                onClick={handleButtonClick}
                isDisabled={isLoading}
                fullWidth
              />
            </div>

            <div className="login__demo">
              <h4 className="login__demo-title">Demo Accounts</h4>
              <div className="login__demo-buttons">
                <Button
                  type="secondary"
                  size="small"
                  btnText="Admin"
                  onClick={() => handleDemoLogin('Admin')}
                  isDisabled={isLoading}
                />
                <Button
                  type="secondary"
                  size="small"
                  btnText="Requester"
                  onClick={() => handleDemoLogin('Requester')}
                  isDisabled={isLoading}
                />
                <Button
                  type="secondary"
                  size="small"
                  btnText="Organization"
                  onClick={() => handleDemoLogin('Organization')}
                  isDisabled={isLoading}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
