import { useState } from 'react';
import './Modal.scss';
import Tabs, { Tab } from './Tabs';
import Button from '../Button/Button';
import { Icons } from '../icons/EmojiIcons';

type ModalSize = 'small' | 'medium' | 'large' | 'fit-content' | 'alert';

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
  size = 'medium',
  showCloseButton = true,
}: ModalProps) => {
  const [activeTab] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div
        className={`modal__card modal__card--${size}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal__header">
          {title && <h2 className="modal__title">{title}</h2>}
          {showCloseButton && (
            <Button
              type="close"
              size="small"
              onClick={onClose}
              icon={
            Icons.close
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
