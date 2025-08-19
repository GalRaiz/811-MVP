import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import AssistanceForm from './AssistanceForm';
import LocationStep from './LocationStep';
import AssistanceTypeStep from './AssistanceTypeStep';
import StepSubTypeSelection from '../../pages/AssistanceForm/StepSubTypeSelection';
import FinalDetailsStep from './FinalDetailsStep';
import AssistanceFormFinalStep from './AssistanceFormFinalStep';
import FormSummaryStep from './FormSummaryStep';
import RequestSentFinalStep from './RequestSentFinalStep';

const AssistanceFormContainer: React.FC = () => {
  const { formState } = useAssistanceForm();

  const renderCurrentStep = () => {
    switch (formState.currentStep) {
      case 1:
        return <AssistanceForm />;
      case 2:
        return <LocationStep />;
      case 3:
        return <AssistanceTypeStep />;
      case 4:
        return <StepSubTypeSelection />;
      case 5:
        return <FinalDetailsStep />;
      case 6:
        return <AssistanceFormFinalStep />;
      case 7:
        return <FormSummaryStep />;
      case 8:
        return <RequestSentFinalStep />;
      default:
        return <AssistanceForm />;
    }
  };

  return <div className='assistance-form-container'>{renderCurrentStep()}</div>;
};

export default AssistanceFormContainer;
