import React from 'react';
import { useDispatch } from 'react-redux';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import { addRequest } from '../../store/requestsSlice';
import { IRequest } from '../../store/types';
import './AssistanceFormFooter.scss';

const AssistanceFormFooter: React.FC = () => {
  const { formState, goToPreviousStep, goToNextStep, isFormValid } = useAssistanceForm();
  const dispatch = useDispatch();

  const handlePrevious = () => {
    goToPreviousStep();
  };

  const handleNext = () => {
    if (formState.currentStep === 7) {
      // Submit the form data
      const newRequest: IRequest = {
        requestName: formState.requestName,
        requestType: formState.requestType,
        requestSubType: formState.requestSubType,
        requestDescription: formState.requestDescription,
        requesterName: formState.requesterName,
        requesterPhone: formState.requesterPhone,
        district: formState.district,
        city: formState.city,
        street: formState.street,
        needTransportation: formState.needTransportation,
        needVolunteers: formState.needVolunteers,
        attachment: formState.attachment,
        requestStatus: "pending",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        assignedTo: []
      };

      // Add the request to the store
      dispatch(addRequest(newRequest));
      console.log('Form submitted successfully:', newRequest);
    }
    goToNextStep();
  };

  const getProgressBarClass = (step: number) => {
    if (step < formState.currentStep) {
      return 'assistance-form-footer__progress-bar--completed';
    } else if (step === formState.currentStep) {
      return 'assistance-form-footer__progress-bar--active';
    } else {
      return '';
    }
  };

  // Don't show footer on the final step (step 8)
  if (formState.currentStep === 8) {
    return null;
  }

  return (
    <footer className="assistance-form-footer">
      <div className="assistance-form-footer__content">
        {/* Don't show Previous button on first step */}
        {formState.currentStep > 1 && (
          <button 
            className="assistance-form-footer__button assistance-form-footer__button--previous"
            onClick={handlePrevious}
          >
            <span className="assistance-form-footer__button-arrow">←</span>
            השלב הקודם
          </button>
        )}
        
        <div className="assistance-form-footer__progress">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
            <div 
              key={step}
              className={`assistance-form-footer__progress-bar ${getProgressBarClass(step)}`}
            />
          ))}
        </div>
        
        <button 
          className={`assistance-form-footer__button assistance-form-footer__button--next ${
            !isFormValid() ? 'assistance-form-footer__button--disabled' : ''
          }`}
          onClick={handleNext}
          disabled={!isFormValid()}
        >
          {formState.currentStep === 7 ? 'שמירה ושליחה' : 'השלב הבא'}
          <span className="assistance-form-footer__button-arrow">
            {formState.currentStep === 7 ? '✓' : '→'}
          </span>
        </button>
      </div>
    </footer>
  );
};

export default AssistanceFormFooter;
