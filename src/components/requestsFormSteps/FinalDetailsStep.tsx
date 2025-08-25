import React, { useRef } from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import Button from '../storybook/Button/Button';

const FinalDetailsStep: React.FC = () => {
  const { formState, setTransportation, setVolunteers, addFile, removeFile } =
    useAssistanceForm();
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
      <div className="final-details-step__section">
        <h3 className="final-details-step__question">נדרש שינוע?</h3>
        <div className="final-details-step__options">
          <Button
            btnText="כן, נדרש שינוע"
            type={
              formState.needTransportation === true ? 'selected' : 'unselected'
            }
            size="medium"
            onClick={() => setTransportation(true)}
          />
          <Button
            btnText="לא, אין צורך"
            type={
              formState.needTransportation === false ? 'selected' : 'unselected'
            }
            size="medium"
            onClick={() => setTransportation(false)}
          />
        </div>
      </div>

      <div className="final-details-step__section">
        <h3 className="final-details-step__question">דרושים מתנדבים?</h3>
        <div className="final-details-step__options">
          <Button
            btnText="כן, דרושים מתנדבים"
            type={formState.needVolunteers === true ? 'selected' : 'unselected'}
            size="medium"
            onClick={() => setVolunteers(true)}
          />
          <Button
            btnText="לא, אין צורך"
            type={
              formState.needVolunteers === false ? 'selected' : 'unselected'
            }
            size="medium"
            onClick={() => setVolunteers(false)}
          />
        </div>
      </div>

      <div className="final-details-step__section">
        <h3 className="final-details-step__question">
          העלאת קבצים/תמונות רלוונטיות
        </h3>
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
            {formState.attachment
              .split(',')
              .map((fileName: string, index: number) => (
                <div key={index} className="final-details-step__file-item">
                  <span className="final-details-step__file-name">
                    {fileName}
                  </span>
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
