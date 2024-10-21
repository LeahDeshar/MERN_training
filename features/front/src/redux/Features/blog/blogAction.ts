import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";

export const postCreation = createAsyncThunk(
  "post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/post/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("post", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      // Handle and return the error appropriately
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  }
);

// get all post by user
export const getAllPostByUser = createAsyncThunk(
  "post/getAllPostByUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/post/get-post`);

      //   if response store in localstorage
      localStorage.setItem("posts", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  }
);

export const getAllPost = createAsyncThunk(
  "post/getAllPost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/post/get-post/all`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  }
);
