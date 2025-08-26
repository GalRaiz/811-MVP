import { configureStore } from '@reduxjs/toolkit';
import assistanceFormReducer from './assistanceFormSlice';
import requestsReducer from './requestsSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    requests: requestsReducer,
    assistanceForm: assistanceFormReducer,
    auth: authReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
