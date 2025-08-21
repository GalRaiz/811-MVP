import { useState } from "react";
import "./Modal.scss";
import Tabs, { Tab } from "./Tabs";
import Button from "../Button/Button";

type ModalSize = "small" | "medium" | "large" | "fit-content" | "alert";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  tabs?: Tab[];
  size?: ModalSize;
  showCloseButton?: boolean;
}

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  tabs, 
  size = "medium",
  showCloseButton = true 
}: ModalProps) => {
  const [activeTab] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div
        className={`modal__card modal__card--${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          {title && <h2 className="modal__title">{title}</h2>}
          {showCloseButton && (
            <Button
              type="close"
              size="small"
              onClick={onClose}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              }
            />
          )}
        </div>

        {tabs && tabs.length > 0 ? (
          <Tabs tabs={tabs} defaultIndex={activeTab} />
        ) : (
          <div className="modal__content">{children}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
