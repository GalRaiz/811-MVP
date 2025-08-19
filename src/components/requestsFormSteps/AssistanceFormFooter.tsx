import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAll } from '../../store/assistanceFormSlice';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import { addRequest } from '../../store/requestsSlice';
import { IRequest } from '../../store/types';
import './AssistanceFormFooter.scss';
import Button from '../storybook/Button/Button';

const AssistanceFormFooter: React.FC = () => {
  const { formState, goToPreviousStep, goToNextStep, isFormValid } = useAssistanceForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePrevious = () => {
    goToPreviousStep();
  };

  const handleGoHome = () => {
    dispatch(resetAll());
    navigate('/');
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
        requestStatus: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        assignedTo: [],
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
        {formState.currentStep > 1 ? (
          <Button
            type="primary"
            icon={<span className="assistance-form-footer__button-arrow">→</span>}
            btnText="השלב הקודם"
            onClick={handlePrevious}
          />
        ) : (
          <Button type="secondary" btnText="חזור לדף הבית" onClick={handleGoHome} />
        )}

        <div className="assistance-form-footer__progress">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
            <div
              key={step}
              className={`assistance-form-footer__progress-bar ${getProgressBarClass(step)}`}
            />
          ))}
        </div>

        <Button
          type="primary"
          size="medium"
          onClick={handleNext}
          isDisabled={!isFormValid()}
          btnText={
            formState.currentStep === 7
              ? 'שמירה ושליחה'
              : 'השלב הבא '
          }
          icon={
            <span className="assistance-form-footer__button-arrow">
              {formState.currentStep === 7 ? '✓' : '←'}
            </span>
          }
          iconPosition="right"
        />
      </div>
    </footer>
  );
};

export default AssistanceFormFooter;
