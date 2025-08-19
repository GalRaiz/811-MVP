import React from 'react';
import './AssistanceFormHeader.scss';
import mateLogoGreen from '../../assets/mate-logo-green.png';

const AssistanceFormHeader: React.FC = () => {
  return (
    <header className='assistance-form-header'>
      <div className='assistance-form-header__content'>
        <div className='assistance-form-header__logo'>
          <img src={mateLogoGreen} alt='מטה החמ״לים הארצי' />
          <span className='assistance-form-header__logo-text' />
        </div>
        <h1 className='assistance-form-header__title'>טופס בקשת סיוע</h1>
      </div>
    </header>
  );
};

export default AssistanceFormHeader;
