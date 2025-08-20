import { assistanceTypes, IAssistanceType, IAssistanceSubType } from '../data/assistanceTypesData';

/**
 * Get assistance type by ID
 */
export const getAssistanceTypeById = (id: string): IAssistanceType | undefined => {
  return assistanceTypes.find(type => type.id === id);
};

/**
 * Get assistance sub-type by ID
 */
export const getAssistanceSubTypeById = (subTypeId: string): IAssistanceSubType | undefined => {
  for (const type of assistanceTypes) {
    const subType = type.subTypes.find(sub => sub.id === subTypeId);
    if (subType) return subType;
  }
  return undefined;
};

/**
 * Get assistance type label by ID
 */
export const getAssistanceTypeLabel = (id: string): string => {
  const type = getAssistanceTypeById(id);
  return type?.label || id;
};

/**
 * Get assistance sub-type label by ID
 */
export const getAssistanceSubTypeLabel = (subTypeId: string): string => {
  const subType = getAssistanceSubTypeById(subTypeId);
  return subType?.label || subTypeId;
};

/**
 * Get all assistance type options for filters
 */
export const getAssistanceTypeOptions = () => {
  return assistanceTypes.map(type => ({
    value: type.id,
    label: type.label,
    icon: type.icon,
  }));
};

/**
 * Get all assistance sub-type options for filters
 */
export const getAssistanceSubTypeOptions = () => {
  return assistanceTypes.map(type => type.subTypes.map(subType => ({
    value: subType.id,
    label: subType.label,
    icon: subType.icon,
  })));
};

/**
 * Get sub-type options for a specific assistance type
 */
export const getSubTypeOptions = (typeId: string) => {
  const type = getAssistanceTypeById(typeId);
  return type?.subTypes.map(subType => ({
    value: subType.id,
    label: subType.label,
    icon: subType.icon,
  })) || [];
};

/**
 * Get all sub-type options across all types
 */
export const getAllSubTypeOptions = () => {
  const allSubTypes: Array<{ value: string; label: string; icon?: string }> = [];
  
  assistanceTypes.forEach(type => {
    type.subTypes.forEach(subType => {
      allSubTypes.push({
        value: subType.id,
        label: subType.label,
        icon: subType.icon,
      });
    });
  });
  
  return allSubTypes;
};
