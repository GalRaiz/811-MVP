import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import { assistanceTypes } from '../../data/assistanceTypesData';
import { Card } from '../storybook/Card';
import Button from '../storybook/Button/Button';

/**
 * AssistanceTypeStep - Step 3: Assistance Type Selection
 *
 * This component now uses the unified Card component
 * for consistent styling and better maintainability.
 */
const AssistanceTypeStep: React.FC = () => {
  const { formState, setAssistanceTypes, setSelectedSubTypes, goToNextStep } =
    useAssistanceForm();

  const handleTypeSelect = (typeId: string) => {
    // Clear subType selection when changing the main type
    setSelectedSubTypes([]);

    // Find the assistance type to get the Hebrew label
    const selectedType = assistanceTypes.find(type => type.id === typeId);
    if (selectedType) {
      // Set only this type as selected (single selection) with Hebrew label
      setAssistanceTypes([selectedType.label]);
    }

    // Automatically navigate to the next step after a short delay
    setTimeout(() => {
      goToNextStep();
    }, 300);
  };

  const handleClearAll = () => {
    // Clear both the main type and subType selections
    setAssistanceTypes([]);
    setSelectedSubTypes([]);
  };

  const selectedTypes = formState.requestType?.label ? [formState.requestType.label] : [];

  return (
    <div className="assistance-type-step">
      <div className="assistance-type-step__header">
        <Button id="clearAssistanceTypes"
          type="secondary"
          size="medium"
          btnText="אפס בחירה"
          onClick={handleClearAll}
          isDisabled={!formState.requestType}
        />
      </div>

      <div className="assistance-type-step__grid">
        {assistanceTypes.map(type => (
          <Card id={`assistanceType-${type.id}`}
            key={type.id}
            type="compact"
            title={type.label}
            avatar={type.icon}
            onClick={() => handleTypeSelect(type.id)}
            variant={selectedTypes.includes(type.label) ? "outlined" : "default"}
          />
        ))}
      </div>
    </div>
  );
};

export default AssistanceTypeStep;
