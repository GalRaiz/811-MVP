import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRequestsState, IRequest } from './types';
import { assistanceRequests } from '../data/requestsData';

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
      state.requestsData = assistanceRequests;
    },
    setRequestsSuccess: (state, action: PayloadAction<IRequest[]>) => {
      state.requestsData = action.payload;
      state.loading = false;
    },
    setRequestsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addRequest: (state, action: PayloadAction<IRequest>) => {
      console.log('Adding new request to store:', action.payload);
      state.requestsData.push(action.payload);
      state.loading = false;
      console.log('Updated requests in store:', state.requestsData);
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
