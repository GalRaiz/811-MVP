import React, { useState } from 'react';
import './SideNavBar.scss';
import Button, { ButtonProps } from '../Button/Button';
import { Icons } from '../icons/EmojiIcons';

interface NavBarProps {
  logo?: React.ReactNode;
  title?: string;
  buttons?: ButtonProps[];
}

const NavBar: React.FC<NavBarProps> = ({ logo, title, buttons }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <nav className={`nav-bar ${isOpen ? 'open' : 'closed'}`}>
      <div className="nav-header">
        <button className="toggle-btn" onClick={toggleNav}>
          {isOpen ? Icons.close : Icons.add}
        </button>
      </div>
      {isOpen && (
        <div className="nav-content">
          <div className="nav-content__header">
            {logo && <div className="nav-content__header__logo">{logo}</div>}
            {title && <h1 className="nav-content__header__title">{title}</h1>}
          </div>
          <div className="nav-content__buttons">
            {buttons?.map((button, index) => (
              <div key={index} className="nav-content__buttons__item">
                <Button
                  type="transparent-on-dark"
                  btnText={button.btnText}
                  onClick={button.onClick}
                  icon={button.icon}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
