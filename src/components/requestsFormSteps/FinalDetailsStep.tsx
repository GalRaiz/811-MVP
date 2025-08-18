import React, { useRef } from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import './FinalDetailsStep.scss';

const FinalDetailsStep: React.FC = () => {
  const { formState, setTransportation, setVolunteers, addFile, removeFile } = useAssistanceForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        addFile(file);
      });
    }
  };

  const handleFileRemove = (index: number) => {
    removeFile(index);
  };



  return (
    <div className="final-details-step">
      <h2 className="final-details-step__title">
        כמה פרטים אחרונים...
      </h2>

      <div className="final-details-step__section">
        <h3 className="final-details-step__question">נדרש שינוע?</h3>
        <div className="final-details-step__options">
          <button
            className={`final-details-step__option ${
              formState.needTransportation === true ? 'final-details-step__option--selected' : ''
            }`}
            onClick={() => setTransportation(true)}
            type="button"
          >
            כן, נדרש שינוע
          </button>
          <button
            className={`final-details-step__option ${
              formState.needTransportation === false ? 'final-details-step__option--selected' : ''
            }`}
            onClick={() => setTransportation(false)}
            type="button"
          >
            לא, אין צורך
          </button>
        </div>
      </div>

      <div className="final-details-step__section">
        <h3 className="final-details-step__question">דרושים מתנדבים?</h3>
        <div className="final-details-step__options">
          <button
            className={`final-details-step__option ${
              formState.needVolunteers === true ? 'final-details-step__option--selected' : ''
            }`}
            onClick={() => setVolunteers(true)}
            type="button"
          >
            כן, דרושים מתנדבים
          </button>
          <button
            className={`final-details-step__option ${
              formState.needVolunteers === false ? 'final-details-step__option--selected' : ''
            }`}
            onClick={() => setVolunteers(false)}
            type="button"
          >
            לא, אין צורך
          </button>
        </div>
      </div>

      <div className="final-details-step__section">
        <h3 className="final-details-step__question">העלאת קבצים/תמונות רלוונטיות</h3>
        <div className="final-details-step__upload-area">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="final-details-step__file-input"
          />
          <div 
            className="final-details-step__upload-box"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="final-details-step__upload-icon">↑</div>
            <div className="final-details-step__upload-text">
              העלאת קבצים/תמונות רלוונטיות
            </div>
          </div>
        </div>

        {formState.attachment && formState.attachment.split(',').length > 0 && (
          <div className="final-details-step__files-list">
            {formState.attachment.split(',').map((fileName: string, index: number) => (
              <div key={index} className="final-details-step__file-item">
                <span className="final-details-step__file-name">{fileName}</span>
                <button
                  className="final-details-step__file-remove"
                  onClick={() => handleFileRemove(index)}
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalDetailsStep;
