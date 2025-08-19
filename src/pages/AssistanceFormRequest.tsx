import React from 'react';
import FormHeader from '../components/storybook/NavBar/FormHeader';
import AssistanceFormContainer from '../components/requestsFormSteps/AssistanceFormContainer';
import AssistanceFormFooter from '../components/requestsFormSteps/AssistanceFormFooter';
import './AssistanceFormRequest.scss';
import logo from '../assets/mate-logo-green.png';

const AssistanceForm: React.FC = () => {
  return (
    <div className='assistance-request-page'>
      <FormHeader title='טופס בקשת סיוע' logo={logo} />
      <main className='assistance-request-page__main'>
        <AssistanceFormContainer />
      </main>
      <AssistanceFormFooter />
    </div>
  );
};

export default AssistanceForm;
