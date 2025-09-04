import React from 'react';
import './PageHeader.scss';
import Button, { ButtonProps } from '../Button/Button';

interface PageHeaderProps {
  title: string;
  logo?: string;
  buttons?: ButtonProps[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, logo, buttons }) => {
  return (
    <header className="assistance-form-header">
      <div className="assistance-form-header__content">
        <div className="assistance-form-header__logo">
          {logo && <img src={logo} alt="logo" className="nav-bar__logo" />}
        </div>
        <h1 className="assistance-form-header__title">{title}</h1>
         <div className="assistance-form-header__buttons">
            {buttons?.map((button, index) => (
              <div key={index} className="assistance-form-header__buttons__item">
                <Button
                  type={button.type}
                  btnText={button.btnText}
                  onClick={button.onClick}
                  icon={button.icon}
                />
              </div>
            ))}
          </div>
        
      </div>
    </header>
  );
};

export default PageHeader;
