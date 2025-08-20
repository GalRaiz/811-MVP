import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import { assistanceTypes } from '../../data/assistanceTypesData';
import Button from '../storybook/Button/Button';
import './AssistanceTypeStep.scss';

const AssistanceTypeStep: React.FC = () => {
  const { formState, setAssistanceTypes, setSelectedSubTypes, goToNextStep } = useAssistanceForm();

  const handleTypeToggle = (typeId: string) => {
    // Clear subType selection when changing the main type
    setSelectedSubTypes([]);
    
    // Set only this type as selected (single selection)
    setAssistanceTypes([typeId]);
    
    // Automatically navigate to the next step after a short delay
    setTimeout(() => {
      goToNextStep();
    }, 300);
  };

  const handleReset = () => {
    // Clear both the main type and subType selections
    setAssistanceTypes([]);
    setSelectedSubTypes([]);
  };

  const isSelected = (typeId: string) => {
    return formState.requestType === typeId;
  };

  return (
    <div className='assistance-type-step'>
      <div className='assistance-type-step__header'>
        <h2 className='assistance-type-step__title'>איזה סוג סיוע נדרש?</h2>
        {formState.requestType && (
          <Button
            type="reset"
            size="small"
            btnText="אפס בחירה"
            onClick={handleReset}
          />
        )}
      </div>

      <div className='assistance-type-step__grid'>
        {assistanceTypes.map(type => (
          <button
            key={type.id}
            className={`assistance-type-step__option ${
              isSelected(type.id)
                ? 'assistance-type-step__option--selected'
                : ''
            }`}
            onClick={() => handleTypeToggle(type.id)}
            type='button'
          >
            <div className='assistance-type-step__option-icon'>{type.icon}</div>
            <span className='assistance-type-step__option-label'>
              {type.label}
            </span>
          </button>
        ))}
      </div>

      <div className='assistance-type-step__instructions'>
        <p>בחירה של קטגוריה עוזרת לנו להפנות את הבקשה לגורמים הנכונים.</p>
      </div>
    </div>
  );
};

export default AssistanceTypeStep;
