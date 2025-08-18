/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AssistanceFormState {
  // Form-specific fields (not in IRequest)
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  
  // IRequest fields - aligned with interface
  id?: number | string;
  requestName?: string;
  requestStatus?: "pending" | "in-progress" | "completed";
  createdAt?: number;
  updatedAt?: number;
  district?: string;
  city?: string;
  street?: string;
  requesterName: string; // Required field
  requesterPhone: string;
  needTransportation?: boolean;
  needVolunteers?: boolean;
  attachment?: string;
  requestType: string; // Required field
  requestSubType?: string[];
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
  requestStatus: "pending",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  requesterName: '', // Required field
  requesterPhone: '',
  needTransportation: false,
  needVolunteers: false,
  requestType: '', // Required field
  requestSubType: [],
  requestDescription: '',
  district: '',
  city: '',
  street: '',
  attachment: '',
  requestImage: '',
  assignedTo: []
};

const assistanceFormSlice = createSlice({
  name: 'assistanceForm',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: 'requestName' | 'requestDescription' | 'district' | 'city' | 'street' | 'requesterName' | 'requesterPhone'; value: string }>) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
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
      const index = state.requestType ? [state.requestType].indexOf(type) : -1;
      if (index > -1) {
        state.requestType = '';
      } else {
        state.requestType = type;
      }
    },
    setAssistanceType: (state, action: PayloadAction<string[]>) => {
      state.requestType = action.payload[0] || '';
    },
    setSelectedSubTypes: (state, action: PayloadAction<string[]>) => {
      state.requestSubType = action.payload;
    },
    toggleSelectedSubType: (state, action: PayloadAction<string>) => {
      const subType = action.payload;
      if (!state.requestSubType) {
        state.requestSubType = [];
      }
      const index = state.requestSubType.indexOf(subType);
      if (index > -1) {
        state.requestSubType.splice(index, 1);
      } else {
        state.requestSubType.push(subType);
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
      state.attachment = state.attachment ? `${state.attachment},${fileData}` : fileData;
    },
    removeUploadedFile: (state, action: PayloadAction<number>) => {
      // Handle file removal logic
      const files = state.attachment?.split(',') || [];
      files.splice(action.payload, 1);
      state.attachment = files.join(',');
    },
    resetForm: (state) => {
      console.log('resetForm called - resetting form data only');
      // Reset form data but keep current step
      state.requestName = '';
      state.requestDescription = '';
      state.district = '';
      state.city = '';
      state.street = '';
      state.requesterName = '';
      state.requesterPhone = '';
      state.needTransportation = false;
      state.needVolunteers = false;
      state.requestType = '';
      state.requestSubType = [];
      state.attachment = '';
      state.assignedTo = [];
      state.requestStatus = "pending";
      state.createdAt = Date.now();
      state.updatedAt = Date.now();
      console.log('resetForm completed - current step:', state.currentStep);
    },
    resetAll: (state) => {
      console.log('resetAll called - resetting everything including step');
      // Reset everything including current step
      Object.assign(state, initialState);
      console.log('resetAll completed - current step:', state.currentStep);
    }
  }
});

export const { 
  updateField, 
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
  resetAll 
} = assistanceFormSlice.actions;

export default assistanceFormSlice.reducer;

