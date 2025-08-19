import { createSlice } from '@reduxjs/toolkit';
import { assistanceRequets } from '../data/requestsData.ts';

const itemsSlice = createSlice({
  name: 'Requests',
  initialState: assistanceRequets,
  reducers: {
    setItems: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;
