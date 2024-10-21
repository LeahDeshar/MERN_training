import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/auth/authSlice";
import blogSlice from "./Features/blog/blogSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    post: blogSlice.reducer,
  },
});
export default store;
