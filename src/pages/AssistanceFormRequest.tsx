import React from 'react';
import AssistanceFormHeader from '../components/requestsFormSteps/AssistanceFormHeader';
import AssistanceFormContainer from '../components/requestsFormSteps/AssistanceFormContainer';
import AssistanceFormFooter from '../components/requestsFormSteps/AssistanceFormFooter';
import './AssistanceFormRequest.scss';

const AssistanceForm: React.FC = () => {
  return (
    <div className='assistance-request-page'>
      <AssistanceFormHeader />
      <main className='assistance-request-page__main'>
        <AssistanceFormContainer />
      </main>
      <AssistanceFormFooter />
    </div>
  );
};

export default AssistanceForm;
