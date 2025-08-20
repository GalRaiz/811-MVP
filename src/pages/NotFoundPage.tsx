import React from 'react';
import './NotFoundPage.scss';
import readingDog from '../assets/readingDog.png';
import Button from '../components/storybook/Button/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className='not-found-page'>
      <div className='not-found-bar top-bar' />

      <div className='not-found-container'>
        <div className='not-found-content'>
          <div className='not-found-text'>
            <h1>404</h1>
            <h2>העמוד לא נמצא</h2>
            <p>העמוד שחיפשת לא קיים או הועבר לכתובת אחרת.</p>
          </div>
          <div className='not-found-image'>
            <img src={readingDog} alt='Reading dog' />
          </div>
        </div>
        <div className='not-found-button'>
          <Button
            fullWidth
            type='primary'
            btnText='חזרה לדף הבית'
            onClick={() => (window.location.href = '/')}
          />
        </div>
      </div>

      <div className='not-found-bar bottom-bar' />
    </div>
  );
};

export default NotFoundPage;
