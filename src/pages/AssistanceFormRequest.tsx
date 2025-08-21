import React from 'react';
import PageHeader from '../components/storybook/NavBar/PageHeade';
import AssistanceFormContainer from '../components/requestsFormSteps/AssistanceFormContainer';
import AssistanceFormFooter from '../components/requestsFormSteps/AssistanceFormFooter';
import './AssistanceFormRequest.scss';
import logo from '../assets/mate-logo-white.png';

const AssistanceForm: React.FC = () => {
  return (
    <div className="assistance-request-page">
      <PageHeader title="טופס בקשת סיוע" logo={logo} />
      <main className="assistance-request-page__main">
        <AssistanceFormContainer />
      </main>
      <AssistanceFormFooter />
    </div>
  );
};

export default AssistanceForm;
