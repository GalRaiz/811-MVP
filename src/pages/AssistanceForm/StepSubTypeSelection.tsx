import React from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import { assistanceTypes } from '../../data/assistanceTypesData';
import SubTypeSelector from '../../components/requestsFormSteps/SubTypeSelector/SubTypeSelector';
import './StepSubTypeSelection.scss';

const StepSubTypeSelection: React.FC = () => {
  const { formState, toggleSelectedSubType } = useAssistanceForm();

  // Get the selected main type (single selection)
  const selectedMainType = formState.requestType;

  // Find the assistance type data for the selected main type
  const assistanceTypeData = assistanceTypes.find(
    type => type.id === selectedMainType
  );

  const handleSubTypeSelect = (subTypeId: string) => {
    toggleSelectedSubType(subTypeId);
  };

  if (!assistanceTypeData) {
    return (
      <div className="step-sub-type-selection">
        <div className="step-sub-type-selection__error">
          <p>לא נמצא סוג סיוע נבחר</p>
        </div>
      </div>
    );
  }

  return (
    <div className="step-sub-type-selection">
      <h2 className="step-sub-type-selection__title">
        איזה סוג סיוע בדיוק דרוש?
      </h2>

      <div className="step-sub-type-selection__main-type">
        <div className="step-sub-type-selection__main-type-icon">
          {assistanceTypeData.icon}
        </div>
        <span className="step-sub-type-selection__main-type-label">
          {assistanceTypeData.label}
        </span>
        <span className="step-sub-type-selection__main-type-subtitle">
          בחר את הסוגים הספציפיים הנדרשים
        </span>
      </div>

      <SubTypeSelector
        subTypes={assistanceTypeData.subTypes}
        onSelect={handleSubTypeSelect}
        selectedSubType={formState.requestSubType || []}
      />

      <div className="step-sub-type-selection__instructions">
        <p>
          בחר את הסוג הספציפי של הסיוע הנדרש כדי שנוכל להפנות את הבקשה לגורם
          המתאים ביותר.
        </p>
      </div>
    </div>
  );
};

export default StepSubTypeSelection;
