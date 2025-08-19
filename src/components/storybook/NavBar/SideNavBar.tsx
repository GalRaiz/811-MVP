import React, { useState } from "react";
import "./SideNavBar.scss";
import Button, { ButtonProps } from "../Button/Button";

interface NavBarProps {
  logo?: React.ReactNode;
  title?: string;
  buttons?: ButtonProps[];
}

const NavBar: React.FC<NavBarProps> = ({ logo, title, buttons }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <nav className={`nav-bar ${isOpen ? "open" : "closed"}`}>
      <div className="nav-header">
        <button className="toggle-btn" onClick={toggleNav}>
          {isOpen ? "Close" : "Open"}
        </button>
      </div>

      <div className="nav-top">
        {logo && <div className="nav-logo">{logo}</div>}
        {title && <h1 className="nav-title">{title}</h1>}
      </div>
      <div className="nav-buttons">
        {buttons?.map((button, index) => (
          <div key={index} className="nav-action">
            <Button
              type="transparent-on-dark"
              btnText={button.btnText}
              onClick={button.onClick}
              icon={button.icon}
            />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
