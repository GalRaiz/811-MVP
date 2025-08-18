import { configureStore } from "@reduxjs/toolkit";
import assistanceFormReducer from "./assistanceFormSlice";
import requestsReducer from "./requestsSlice";

export const store = configureStore({
  reducer: {
    requests: requestsReducer,
    assistanceForm: assistanceFormReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
