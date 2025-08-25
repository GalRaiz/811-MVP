import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import { assistanceTypes } from '../../data/assistanceTypesData';
import SubTypeSelector from '../../components/requestsFormSteps/SubTypeSelector';
import './StepSubTypeSelection.scss';
/**
 * StepSubTypeSelection - Step 4: Sub-Type Selection
 *
 * This component handles the selection of specific assistance sub-types.
 * It's wrapped by StepWrapper for consistent styling and layout.
 */
const StepSubTypeSelection: React.FC = () => {
  const { formState, toggleSelectedSubType } = useAssistanceForm();

  // Get the selected main type (single selection)
  const selectedMainType = formState.requestType;

  // Find the assistance type data for the selected main type
  const assistanceTypeData = assistanceTypes.find(
    type => type.id === selectedMainType?.name || selectedMainType
  );

  const handleSubTypeSelect = (subTypeId: string) => {
    toggleSelectedSubType(subTypeId);
  };

  if (!assistanceTypeData) {
    return (
      <div className="step-sub-type-selection__error">
        <p>לא נמצא סוג סיוע נבחר</p>
      </div>
    );
  }

  return (
    <>
      <div className="step-sub-type-selection__main-type">
        <div className="step-sub-type-selection__main-type-icon">
          {assistanceTypeData.icon}
        </div>
        <span className="step-sub-type-selection__main-type-label">
          {assistanceTypeData.label}
        </span>
      </div>

      <SubTypeSelector
        subTypes={assistanceTypeData.subTypes}
        onSelect={handleSubTypeSelect}
        selectedSubType={formState.requestSubType?.map(st => ({ id: st.id, label: st.label, name: st.name, icon: st.icon })) || []}
      />
    </>
  );
};

export default StepSubTypeSelection;
