/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { assistanceTypes } from '../data/assistanceTypesData';

import {
  ISimpleDistrict,
  ISimpleCity,
  ISimpleAssistanceType,
  ISimpleAssistanceSubType,
} from './types';

interface AssistanceFormState {
  // Form-specific fields (not in IRequest)
  currentStep: number;
  isLoading: boolean;
  error: string | null;

  // IRequest fields - aligned with interface
  id?: number | string;
  requestName: string;
  requestStatus?: 'pending' | 'in-progress' | 'completed';
  createdAt?: number;
  updatedAt?: number;
  district?: ISimpleDistrict;
  city?: ISimpleCity;
  street?: string;
  requesterName: string; // Required field
  requesterPhone: string;
  needTransportation?: boolean;
  needVolunteers?: boolean;
  attachment?: string;
  requestType: ISimpleAssistanceType; // Required field - stores the full type object
  requestSubType?: ISimpleAssistanceSubType[]; // Stores the full sub-type objects
  requestDescription?: string;
  requestImage?: string;
  assignedTo?: string[];
}

const initialState: AssistanceFormState = {
  // Form-specific fields
  currentStep: 1,
  isLoading: false,
  error: null,

  // IRequest fields with proper defaults
  requestName: '',
  requestStatus: 'pending',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  requesterName: '', // Required field
  requesterPhone: '',
  needTransportation: false,
  needVolunteers: false,
  requestType: { id: '', label: '', name: '', icon: '' }, // Required field
  requestSubType: [],
  requestDescription: '',
  district: { id: '', label: '', name: '' },
  city: { id: '', label: '', name: '' },
  street: '',
  attachment: '',
  requestImage: '',
  assignedTo: [],
};

const assistanceFormSlice = createSlice({
  name: 'assistanceForm',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        field:
          | 'requestName'
          | 'requestDescription'
          | 'street'
          | 'requesterName'
          | 'requesterPhone';
        value: string;
      }>
    ) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },
    updateCity: (
      state,
      action: PayloadAction<{ id: string; name: string; label: string }>
    ) => {
      state.city = action.payload;
    },
    updateDistrict: (
      state,
      action: PayloadAction<{ id: string; name: string; label: string }>
    ) => {
      state.district = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleAssistanceType: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      const index = state.requestType
        ? [state.requestType.label].indexOf(type)
        : -1;
      if (index > -1) {
        state.requestType = { id: '', label: '', name: '', icon: '' };
      } else {
        // Find the assistance type to get complete object
        const selectedType = assistanceTypes.find(t => t.label === type);
        if (selectedType) {
          state.requestType = {
            id: selectedType.id,
            label: selectedType.label,
            name: selectedType.name,
            icon: selectedType.icon,
          };
        } else {
          state.requestType = { id: '', label: type, name: '', icon: '' };
        }
      }
    },
    setAssistanceType: (state, action: PayloadAction<string[]>) => {
      const label = action.payload[0] || '';
      // Find the assistance type to get the complete object
      const selectedType = assistanceTypes.find(
        (type: any) => type.label === label
      );
      if (selectedType) {
        state.requestType = {
          id: selectedType.id,
          label: selectedType.label,
          name: selectedType.name,
          icon: selectedType.icon,
        };
      } else {
        state.requestType = { id: '', label, name: '', icon: '' };
      }
    },
    setSelectedSubTypes: (state, action: PayloadAction<string[]>) => {
      // Convert string array to object array with complete sub-type objects
      const subTypes = action.payload.map(subTypeId => {
        // Find the sub-type to get complete object
        for (const mainType of assistanceTypes) {
          const subType = mainType.subTypes?.find(st => st.id === subTypeId);
          if (subType) {
            return {
              id: subType.id,
              label: subType.label,
              name: subType.name,
              icon: subType.icon,
            };
          }
        }
        return {
          id: subTypeId,
          label: subTypeId,
          name: subTypeId,
          icon: '',
        };
      });
      state.requestSubType = subTypes;
    },
    toggleSelectedSubType: (state, action: PayloadAction<string>) => {
      const subTypeId = action.payload;
      if (!state.requestSubType) {
        state.requestSubType = [];
      }

      // Find the sub-type to get complete object
      let subTypeObj: ISimpleAssistanceSubType | null = null;
      for (const mainType of assistanceTypes) {
        const subType = mainType.subTypes?.find(st => st.id === subTypeId);
        if (subType) {
          subTypeObj = {
            id: subType.id,
            label: subType.label,
            name: subType.name,
            icon: subType.icon,
          };
          break;
        }
      }

      if (!subTypeObj) {
        subTypeObj = {
          id: subTypeId,
          label: subTypeId,
          name: subTypeId,
          icon: '',
        };
      }

      const index = state.requestSubType.findIndex(st => st.id === subTypeId);
      if (index > -1) {
        state.requestSubType.splice(index, 1);
      } else {
        state.requestSubType.push(subTypeObj);
      }
    },
    setTransportationNeeded: (state, action: PayloadAction<boolean>) => {
      state.needTransportation = action.payload;
    },
    setVolunteersNeeded: (state, action: PayloadAction<boolean>) => {
      state.needVolunteers = action.payload;
    },
    addUploadedFile: (state, action: PayloadAction<File>) => {
      // Convert File to string for storage (or handle as needed)
      const fileData = action.payload.name;
      state.attachment = state.attachment
        ? `${state.attachment},${fileData}`
        : fileData;
    },
    removeUploadedFile: (state, action: PayloadAction<number>) => {
      // Handle file removal logic
      const files = state.attachment?.split(',') || [];
      files.splice(action.payload, 1);
      state.attachment = files.join(',');
    },
    resetForm: state => {
      console.log('resetForm called - resetting form data only');
      // Reset form data but keep current step
      state.requestName = '';
      state.requestDescription = '';
      state.district = { id: '', label: '', name: '' };
      state.city = { id: '', label: '', name: '' };
      state.street = '';
      state.requesterName = '';
      state.requesterPhone = '';
      state.needTransportation = false;
      state.needVolunteers = false;
      state.requestType = { id: '', label: '', name: '', icon: '' };
      state.requestSubType = [];
      state.attachment = '';
      state.assignedTo = [];
      state.requestStatus = 'pending';
      state.createdAt = Date.now();
      state.updatedAt = Date.now();
      console.log('resetForm completed - current step:', state.currentStep);
    },
    resetAll: state => {
      console.log('resetAll called - resetting everything including step');
      // Reset everything including current step
      Object.assign(state, initialState);
      console.log('resetAll completed - current step:', state.currentStep);
    },
  },
});

export const {
  updateField,
  updateCity,
  updateDistrict,
  setCurrentStep,
  setLoading,
  setError,
  toggleAssistanceType,
  setAssistanceType,
  setSelectedSubTypes,
  toggleSelectedSubType,
  setTransportationNeeded,
  setVolunteersNeeded,
  addUploadedFile,
  removeUploadedFile,
  resetForm,
  resetAll,
} = assistanceFormSlice.actions;

export default assistanceFormSlice.reducer;
