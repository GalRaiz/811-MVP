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

  console.log('AssistanceFormContainer - Current step:', formState.currentStep);

  const renderCurrentStep = () => {
    console.log('🔄 RENDERING STEP:', formState.currentStep);
    switch (formState.currentStep) {
      case 1:
        console.log('📝 Rendering AssistanceForm (Step 1)');
        return <AssistanceForm />;
      case 2:
        console.log('📍 Rendering LocationStep (Step 2)');
        return <LocationStep />;
      case 3:
        console.log('🍽️ Rendering AssistanceTypeStep (Step 3)');
        return <AssistanceTypeStep />;
      case 4:
        console.log('📋 Rendering StepSubTypeSelection (Step 4)');
        return <StepSubTypeSelection />;
      case 5:
        console.log('📄 Rendering FinalDetailsStep (Step 5)');
        return <FinalDetailsStep />;
      case 6:
        console.log('✏️ Rendering AssistanceFormFinalStep (Step 6)');
        return <AssistanceFormFinalStep />;
      case 7:
        console.log('📊 Rendering FormSummaryStep (Step 7)');
        return <FormSummaryStep />;
      case 8:
        console.log('🎉🎉🎉 Rendering RequestSentFinalStep (Step 8) 🎉🎉🎉');
        return <RequestSentFinalStep />;
      default:
        console.log('❌ Default case - rendering AssistanceForm');
        return <AssistanceForm />;
    }
  };

  return (
    <div className="assistance-form-container">
      {renderCurrentStep()}
    </div>
  );
};

export default AssistanceFormContainer;
