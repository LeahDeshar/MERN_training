import { createSlice } from "@reduxjs/toolkit";
import { getAllPostByUser, postCreation } from "./blogAction";

const posts = localStorage.getItem("posts")
  ? JSON.parse(localStorage.getItem("posts"))
  : null;

const post = localStorage.getItem("post")
  ? JSON.parse(localStorage.getItem("post"))
  : null;
const blogSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    posts,
    post,

    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCreation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postCreation.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log(payload);
      state.post = payload;
      console.log("post slice", payload);
      state.error = null;
    });
    builder.addCase(postCreation.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getAllPostByUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllPostByUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      console.log(payload);
      state.posts = payload;
      console.log("posts[] slice", payload);
      state.error = null;
    });
    builder.addCase(getAllPostByUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
export default blogSlice;
