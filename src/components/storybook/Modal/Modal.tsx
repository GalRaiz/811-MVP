import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-card' onClick={e => e.stopPropagation()}>
        <button className='modal-close-btn' onClick={onClose}>
          &times;
        </button>
        {title && <h2 className='modal-title'>{title}</h2>}
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
