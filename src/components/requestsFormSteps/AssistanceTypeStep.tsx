import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import { assistanceTypes } from '../../data/assistanceTypesData';
import CompactCard from '../storybook/Card/CompactCard';
import CompactCardGrid from '../storybook/Card/CompactCardGrid';
import Button from '../storybook/Button/Button';

/**
 * AssistanceTypeStep - Step 3: Assistance Type Selection
 *
 * This component now uses the new CompactCard components directly
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
        <Button
          type="secondary"
          size="medium"
          btnText="אפס בחירה"
          onClick={handleClearAll}
          isDisabled={!formState.requestType}
        />
      </div>

      <CompactCardGrid columns={4} gap="normal">
        {assistanceTypes.map(type => (
          <CompactCard
            key={type.id}
            id={type.id}
            label={type.label}
            icon={type.icon}
            isSelected={selectedTypes.includes(type.label)}
            onClick={() => handleTypeSelect(type.id)}
          />
        ))}
      </CompactCardGrid>
    </div>
  );
};

export default AssistanceTypeStep;
