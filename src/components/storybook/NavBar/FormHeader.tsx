import React from 'react';
import './FormHeader.scss';

interface FormHeaderProps {
  title: string;
  logo: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, logo }) => {
  return (
    <header className='assistance-form-header'>
      <div className='assistance-form-header__content'>
        <div className='assistance-form-header__logo'>
          <img src={logo} alt='logo' className='nav-bar__logo' />
          <span className='assistance-form-header__logo-text' />
        </div>
        <h1 className='assistance-form-header__title'>{title}</h1>
      </div>
    </header>
  );
};

export default FormHeader;
