import React from 'react';
import PageHeader from '../components/storybook/NavBar/PageHeader';
import AssistanceFormContainer from '../components/requestsFormSteps/AssistanceFormContainer';
import AssistanceFormFooter from '../components/requestsFormSteps/AssistanceFormFooter';
import { useAssistanceForm } from '../hooks/useAssistanceForm';
import { isFinalStep } from '../components/requestsFormSteps/stepConfig';
import './AssistanceFormRequest.scss';
import logo from '../assets/mate-logo-white.png';

const AssistanceForm: React.FC = () => {
  const { formState } = useAssistanceForm();

  return (
    <div className="assistance-request-page">
      <PageHeader title="טופס בקשת סיוע" logo={logo} />
      <main className="assistance-request-page__main">
        <AssistanceFormContainer />
      </main>
      {/* Footer with navigation - only show if not final step */}
      {!isFinalStep(formState.currentStep) && <AssistanceFormFooter />}
    </div>
  );
};

export default AssistanceForm;
