import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/slices";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
