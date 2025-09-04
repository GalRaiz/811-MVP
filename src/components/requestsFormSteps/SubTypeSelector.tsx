import React from 'react';
import { IAssistanceSubType } from '../../data/assistanceTypesData';
import { Card } from '../storybook/Card';
import Button from '../storybook/Button/Button';

interface SubTypeSelectorProps {
  subTypes: IAssistanceSubType[];
  onSelect: (subTypeId: string) => void;
  selectedSubType: Array<{ id: string; label: string; name: string; icon?: string }>;
}

/**
 * SubTypeSelector - Component for selecting multiple assistance sub-types
 *
 * This component now uses the unified Card component
 * for consistent styling and better maintainability.
 */
const SubTypeSelector: React.FC<SubTypeSelectorProps> = ({
  subTypes,
  onSelect,
  selectedSubType,
}) => {
  const handleClearAll = () => {
    // Clear all selected sub-types by calling onSelect for each selected item
    selectedSubType.forEach(subType => {
      onSelect(subType.id);
    });
  };

  return (
    <div className="sub-type-selector">
      <div className="sub-type-selector__header">
        <div className="sub-type-selector__counter">
          <span className="sub-type-selector__counter-text">
            נבחרו {selectedSubType.length} תת-סוגים
          </span>
        </div>

        <Button
          type="secondary"
          size="small"
          btnText="נקה הכל"
          onClick={handleClearAll}
          isDisabled={selectedSubType.length === 0}
        />
      </div>

      <div className="sub-type-selector__grid">
        {subTypes.map(subType => (
          <Card
            key={subType.id}
            type="compact"
            title={subType.label}
            avatar={subType.icon}
            onClick={() => onSelect(subType.id)}
            variant={selectedSubType.some(st => st.id === subType.id) ? "outlined" : "default"}
          />
        ))}
      </div>
    </div>
  );
};

export default SubTypeSelector;
