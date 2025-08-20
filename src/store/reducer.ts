import { createSlice } from '@reduxjs/toolkit';
import { assistanceRequests } from '../data/requestsData.ts';

const itemsSlice = createSlice({
  name: 'Requests',
  initialState: assistanceRequests,
  reducers: {
    setItems: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;
