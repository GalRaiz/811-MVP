import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAll } from '../../store/assistanceFormSlice';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import { addRequest } from '../../store/requestsSlice';
import { IRequest } from '../../store/types';
import { getTotalSteps, isFinalStep } from './stepConfig';
import './AssistanceFormFooter.scss';
import Button from '../storybook/Button/Button';

/**
 * AssistanceFormFooter - Navigation and progress indicator for the form
 *
 * This component provides navigation controls and progress indication
 * for the multi-step assistance form.
 */
const AssistanceFormFooter: React.FC = () => {
  const { formState, goToPreviousStep, goToNextStep, isFormValid } =
    useAssistanceForm();
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
        id: Date.now(), // Generate unique ID
        requesterDetails: {
          requesterName: formState.requesterName,
          phone: formState.requesterPhone,
          district: formState.district?.label ? {
            id: formState.district.id,
            label: formState.district.label,
            name: formState.district.name,
          } : undefined,
          city: formState.city,
          street: formState.street,
        },
        requestDetails: {
          requestName: formState.requestName,
          requestType: formState.requestType,
          requestSubType: formState.requestSubType?.map(subType => ({
            id: subType.id,
            label: subType.label,
            name: subType.name,
          })),
          requestDescription: formState.requestDescription,
          needTransportation: formState.needTransportation,
          needVolunteers: formState.needVolunteers,
          attachment: formState.attachment,
        },
        requestStatus: {
          requestStatus: 'pending',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          assignedTo: [],
        },
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

  // Don't show footer on the final step
  if (isFinalStep(formState.currentStep)) {
    return null;
  }

  const totalSteps = getTotalSteps();

  return (
    <footer className="assistance-form-footer">
      <div className="assistance-form-footer__content">
        {/* Don't show Previous button on first step */}
        {formState.currentStep > 1 ? (
          <Button
            id="previousStep"
            type="primary"
            icon={
              <span className="assistance-form-footer__button-arrow">→</span>
            }
            btnText="השלב הקודם"
            onClick={handlePrevious}
          />
        ) : (
          <Button
            id="goHome"
            type="secondary"
            btnText="חזור לדף הבית"
            onClick={handleGoHome}
          />
        )}

        <div className="assistance-form-footer__progress">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
            <div
              key={step}
              className={`assistance-form-footer__progress-bar ${getProgressBarClass(step)}`}
            />
          ))}
        </div>

        <Button
          id="nextStep"
          type="primary"
          size="medium"
          onClick={handleNext}
          isDisabled={!isFormValid()}
          btnText={formState.currentStep === 7 ? 'שמירה ושליחה' : 'השלב הבא '}
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
