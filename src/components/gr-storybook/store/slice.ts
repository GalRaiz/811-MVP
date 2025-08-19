import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GrStorybookState, ToasterProps } from './types';
import { IRequest } from '../../../store/types';

const initialState: GrStorybookState = {
  modals: {
    openModals: [],
  },
  toasters: {
    toasters: [],
  },
  forms: {
    formData: {},
    errors: {},
  },
  ui: {
    theme: 'light',
    sidebarOpen: false,
  },
};

const grStorybookSlice = createSlice({
  name: 'grStorybook',
  initialState,
  reducers: {
    // Modal actions
    openModal: (state, action: PayloadAction<string>) => {
      if (!state.modals.openModals.includes(action.payload)) {
        state.modals.openModals.push(action.payload);
      }
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals.openModals = state.modals.openModals.filter(
        (        id: string) => id !== action.payload
      );
    },
    closeAllModals: state => {
      state.modals.openModals = [];
    },

    // Toaster actions
    addToaster: (state, action: PayloadAction<ToasterProps>) => {
      state.toasters.toasters.push(action.payload);
    },
    removeToaster: (state, action: PayloadAction<string>) => {
      state.toasters.toasters = state.toasters.toasters.filter(
        (        toaster: { id: string; }) => toaster.id !== action.payload
      );
    },
    clearToasters: state => {
      state.toasters.toasters = [];
    },

    // Form actions
    updateFormData: (
      state,
      action: PayloadAction<{ formId: string; data: Record<string, IRequest> }>
    ) => {
      const { formId, data } = action.payload;
      state.forms.formData[formId] = {
        ...state.forms.formData[formId],
        ...data,
      };
    },
    setFormError: (
      state,
      action: PayloadAction<{ formId: string; field: string; error: string }>
    ) => {
      const { formId, field, error } = action.payload;
      if (!state.forms.errors[formId]) {
        state.forms.errors[formId] = {};
      }
      state.forms.errors[formId][field] = error;
    },
    clearFormErrors: (state, action: PayloadAction<string>) => {
      delete state.forms.errors[action.payload];
    },
    resetForm: (state, action: PayloadAction<string>) => {
      delete state.forms.formData[action.payload];
      delete state.forms.errors[action.payload];
    },

    // UI actions
    toggleTheme: state => {
      state.ui.theme = state.ui.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.ui.theme = action.payload;
    },
    toggleSidebar: state => {
      state.ui.sidebarOpen = !state.ui.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.ui.sidebarOpen = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  closeAllModals,
  addToaster,
  removeToaster,
  clearToasters,
  updateFormData,
  setFormError,
  clearFormErrors,
  resetForm,
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
} = grStorybookSlice.actions;

export default grStorybookSlice.reducer;
