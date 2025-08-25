import React from 'react';
import { IAssistanceSubType } from '../../data/assistanceTypesData';
import CompactCard from '../storybook/Card/CompactCard';
import CompactCardGrid from '../storybook/Card/CompactCardGrid';
import Button from '../storybook/Button/Button';

interface SubTypeSelectorProps {
  subTypes: IAssistanceSubType[];
  onSelect: (subTypeId: string) => void;
  selectedSubType: Array<{ id: string; label: string; name: string; icon?: string }>;
}

/**
 * SubTypeSelector - Component for selecting multiple assistance sub-types
 *
 * This component now uses the new CompactCard components directly
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

      <CompactCardGrid columns={2} gap="normal">
        {subTypes.map(subType => (
          <CompactCard
            key={subType.id}
            id={subType.id}
            label={subType.label}
            icon={subType.icon}
            isSelected={selectedSubType.some(st => st.id === subType.id)}
            onClick={() => onSelect(subType.id)}
          />
        ))}
      </CompactCardGrid>
    </div>
  );
};

export default SubTypeSelector;
