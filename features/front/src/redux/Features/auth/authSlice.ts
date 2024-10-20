import { createSlice } from "@reduxjs/toolkit";
import {
  createAvatar,
  followUser,
  getAllUsers,
  getCurrentUser,
  unfollowUser,
  userLogin,
  userRegister,
} from "./authAction";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user,
    users,
    token,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log(payload);
      state.user = payload.user;
      state.token = payload.token;
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // register
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
    });
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // get current user
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      console.log("test curr", payload);

      state.error = null;

      localStorage.setItem("user", JSON.stringify(payload));
    });
    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // get all user
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload;

      state.error = null;

      localStorage.setItem("users", JSON.stringify(payload));
    });
    builder.addCase(getAllUsers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(createAvatar.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createAvatar.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createAvatar.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // follow user
    builder.addCase(followUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(followUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(followUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // unfollow
    builder.addCase(unfollowUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(unfollowUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(unfollowUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
export default authSlice;
