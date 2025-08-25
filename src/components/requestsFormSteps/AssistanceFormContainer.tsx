import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import StepWrapper from './StepWrapper';
import { getStepConfig } from './stepConfig';
import './StepWrapper.scss';
import './AssistanceFormContainer.scss';

/**
 * AssistanceFormContainer - Main container for the multi-step assistance form
 *
 * This component uses the StepWrapper for consistent layout and styling,
 * and the step configuration for maintainable step management.
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Container only handles step rendering and navigation
 * - Open/Closed: Easy to add new steps via configuration
 * - Liskov Substitution: All steps use the same StepWrapper interface
 * - Interface Segregation: StepWrapper provides only what steps need
 * - Dependency Inversion: Depends on abstractions (StepConfig) not concrete implementations
 */
const AssistanceFormContainer: React.FC = () => {
  const { formState } = useAssistanceForm();

  // Get current step configuration
  const currentStepConfig = getStepConfig(formState.currentStep);

  // If no step config found, show error or fallback
  if (!currentStepConfig) {
    return (
      <div className="assistance-form-container">
        <StepWrapper title="שגיאה">
          <p>מצטערים, אירעה שגיאה בטעינת השלב הנוכחי.</p>
        </StepWrapper>
      </div>
    );
  }

  // Render the current step component
  const StepComponent = currentStepConfig.component;

  return (
    <div className="assistance-form-container">
      <StepWrapper
        title={currentStepConfig.title || 'שלב לא ידוע'}
        instructions={currentStepConfig.instructions}
        className={currentStepConfig.className}
        isLoading={formState.isLoading}
      >
        <StepComponent />
      </StepWrapper>
    </div>
  );
};

export default AssistanceFormContainer;
