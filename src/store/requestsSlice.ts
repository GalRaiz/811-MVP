import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRequestsState, IRequest } from './types';

export const initialState: IRequestsState = {
  requestsData: [],
  loading: false,
  error: null,
};

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequestsStart: state => {
      state.loading = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setRequestsSuccess: (state, action: PayloadAction<any[]>) => {
      state.requestsData = action.payload;
      state.loading = false;
    },
    setRequestsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addRequest: (state, action: PayloadAction<IRequest>) => {
      const newRequest = {
        ...action.payload,
        id: Date.now(), // Generate unique ID
        createdAt: Date.now(),
        updatedAt: Date.now(),
        requestStatus: 'pending' as const,
      };
      state.requestsData.push(newRequest);
    },
  },
});

export const {
  setRequestsStart,
  setRequestsSuccess,
  setRequestsFailure,
  addRequest,
} = requestsSlice.actions;
export default requestsSlice.reducer;
