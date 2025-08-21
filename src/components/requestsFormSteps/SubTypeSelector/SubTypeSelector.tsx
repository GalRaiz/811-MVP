import React from 'react';
import { IAssistanceSubType } from '../../../data/assistanceTypesData';
import Button from '../../storybook/Button/Button';
import './SubTypeSelector.scss';

interface SubTypeSelectorProps {
  subTypes: IAssistanceSubType[];
  onSelect: (subTypeId: string) => void;
  selectedSubType: string[];
}

const SubTypeSelector: React.FC<SubTypeSelectorProps> = ({
  subTypes,
  onSelect,
  selectedSubType,
}) => {
  const handleSubTypeSelect = (subTypeId: string) => {
    onSelect(subTypeId);
  };

  const handleClearAll = () => {
    // Clear all selected sub-types by calling onSelect for each selected item
    selectedSubType.forEach(subTypeId => {
      onSelect(subTypeId);
    });
  };

  return (
    <div className="sub-type-selector">
      <div className="sub-type-selector__header">
        <span className="sub-type-selector__counter">
          נבחרו {selectedSubType.length} סוגים
        </span>
        {selectedSubType.length > 0 && (
          <Button
            type="reset"
            size="small"
            btnText="נקה הכל"
            onClick={handleClearAll}
          />
        )}
        {selectedSubType.length === 0 && (
          <span className="sub-type-selector__warning">
            יש לבחור לפחות סוג אחד
          </span>
        )}
      </div>

      <div className="sub-type-selector__grid">
        {subTypes.map(subType => (
          <button
            key={subType.id}
            className={`sub-type-selector__option ${
              selectedSubType.includes(subType.id)
                ? 'sub-type-selector__option--selected'
                : ''
            }`}
            onClick={() => handleSubTypeSelect(subType.id)}
            type="button"
          >
            {subType.icon && (
              <div className="sub-type-selector__option-icon">
                {subType.icon}
              </div>
            )}
            <span className="sub-type-selector__option-label">
              {subType.label}
            </span>
            {selectedSubType.includes(subType.id) && (
              <div className="sub-type-selector__option-check">✓</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubTypeSelector;
