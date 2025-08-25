/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  updateField,
  updateCity,
  updateDistrict,
  setCurrentStep,
  setLoading,
  setError,
  setAssistanceType,
  setSelectedSubTypes,
  toggleSelectedSubType,
  setTransportationNeeded,
  setVolunteersNeeded,
  addUploadedFile,
  removeUploadedFile,
  resetForm,
  resetAll,
} from '../store/assistanceFormSlice';

export const useAssistanceForm = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.assistanceForm);

  const updateFormField = (
    field:
      | 'requesterName'
      | 'requesterPhone'
      | 'requestName'
      | 'street'
      | 'requestDescription',
    value: string
  ) => {
    dispatch(updateField({ field, value }));
  };

  const updateDistrictField = (district: { id: string; name: string; label: string }) => {
    dispatch(updateDistrict(district));
  };

  const updateCityField = (city: { id: string; name: string; label: string }) => {
    dispatch(updateCity(city));
  };

  const navigateToStep = (step: number) => {
    if (step >= 1 && step <= 8) {
      dispatch(setCurrentStep(step));
    }
  };

  const goToNextStep = () => {
    if (formState.currentStep < 8) {
      dispatch(setCurrentStep(formState.currentStep + 1));
    }
  };

  const goToPreviousStep = () => {
    if (formState.currentStep > 1) {
      dispatch(setCurrentStep(formState.currentStep - 1));
    }
  };

  const setFormLoading = (loading: boolean) => {
    dispatch(setLoading(loading));
  };

  const setFormError = (error: string | null) => {
    dispatch(setError(error));
  };

  const setAssistanceTypes = (types: string[]) => {
    dispatch(setAssistanceType(types) as any);
  };

  const setSelectedSubTypesLocal = (subTypeIds: string[]) => {
    dispatch(setSelectedSubTypes(subTypeIds) as any);
  };

  const toggleSelectedSubTypeLocal = (subTypeId: string) => {
    dispatch(toggleSelectedSubType(subTypeId) as any);
  };

  const resetFormData = () => {
    dispatch(resetForm());
  };

  const resetAllData = () => {
    dispatch(resetAll());
  };

  const isFormValid = () => {
    switch (formState.currentStep) {
      case 1:
        return (
          (formState.requesterName?.trim() || '') !== '' &&
          (formState.requesterPhone?.trim() || '') !== '' &&
          (formState.requestName.trim() || '') !== ''
        );
      case 2:
        return (
          (formState.district?.name?.trim() || '') !== '' &&
          (formState.city?.name?.trim() || '') !== ''
        );
      case 3:
        return (formState.requestType?.label?.trim() || '') !== '';
      case 4:
        return (formState.requestSubType?.length || 0) > 0;
      case 5:
        return (
          formState.needTransportation !== undefined &&
          formState.needVolunteers !== undefined
        );
      case 6:
        return (formState.requestName.trim() || '') !== '';
      case 7:
        return true; // Summary step - always valid for submission
      case 8:
        return true; // Final step - always valid
      default:
        return true;
    }
  };

  const setTransportation = (needed: boolean) => {
    dispatch(setTransportationNeeded(needed) as any);
  };

  const setVolunteers = (needed: boolean) => {
    dispatch(setVolunteersNeeded(needed) as any);
  };

  const addFile = (file: File) => {
    dispatch(addUploadedFile(file) as any);
  };

  const removeFile = (index: number) => {
    dispatch(removeUploadedFile(index) as any);
  };

  return {
    formState,
    updateFormField,
    updateDistrictField,
    updateCityField,
    navigateToStep,
    goToNextStep,
    goToPreviousStep,
    setFormLoading,
    setFormError,
    setAssistanceTypes,
    setSelectedSubTypes: setSelectedSubTypesLocal,
    toggleSelectedSubType: toggleSelectedSubTypeLocal,
    setTransportation,
    setVolunteers,
    addFile,
    removeFile,
    resetFormData,
    resetAllData,
    isFormValid,
  };
};
