import React from "react";
import "./NavBar.scss";
import mateLogoGreen from "../../assets/mate-logo-green.png";

interface INavBar {
  userType: "requester" | "org" | "admin";
  onClose: () => void;
  isNavBarOpen: boolean;
  onNavigate?: (page: string) => void;
}

const NavBar: React.FC<INavBar> = ({
  userType,
  onClose,
  isNavBarOpen,
  onNavigate,
}) => {
  const navBarDetails = () => {
    switch (userType) {
      case "org":
        return <div></div>;

      case "admin":
        return <div></div>;

      default:
      case "requester":
        return (
          <>
            <div className="nav-buttons">
              <button onClick={() => onNavigate?.("HomePage")}>
                עמוד הבית
              </button>
              <button onClick={() => onNavigate?.("RequestsPage")}>
                בקשות
              </button>
              <button onClick={() => onNavigate?.("ProfilePage")}>
                הפרופיל שלי
              </button>
            </div>
          </>
        );
    }
  };

  if (!isNavBarOpen) return null;
  return (
    <>
      <div className={`nav-bar ${isNavBarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <div className="nav-header">
          <img src={mateLogoGreen} alt="logo" className="nav-logo" />
        </div>
        {navBarDetails()}
      </div>
    </>
  );
};

export default NavBar;
