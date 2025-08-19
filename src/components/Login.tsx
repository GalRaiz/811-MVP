import { useState } from 'react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingEmails: string[];
}

const Modal = ({ isOpen, onClose, existingEmails }: ModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between login and sign-up
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match!');
        return;
      }

      if (existingEmails.includes(formData.email)) {
        setError('Email already exists! Please log in.');
        return;
      }

      console.log('User created successfully:', formData);
      onClose();
    } else {
      if (!existingEmails.includes(formData.email)) {
        setError('No user found with that email. Please sign up.');
        return;
      }

      console.log('User logged in successfully:', formData);
      onClose();
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className='modal-content'>
        <button className='close-btn' onClick={onClose}>
          &times;
        </button>
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {error && <p className='error-message'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isSignUp && (
            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password:</label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type='submit'>{isSignUp ? 'Sign Up' : 'Login'}</button>
        </form>

        <div className='toggle-link'>
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <span onClick={() => setIsSignUp(false)}>Login</span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <span onClick={() => setIsSignUp(true)}>Sign Up</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
