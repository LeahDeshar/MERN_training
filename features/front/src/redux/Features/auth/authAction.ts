import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      console.log(role, email, password);
      const { data } = await API.post("/user/login", { role, email, password });

      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.replace("/");
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      userName,

      email,
      password,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/user/register", {
        username: userName,

        email,
        password,
      });

      if (data.success) {
        window.location.replace("/login");
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/get-current-user");

      if (response.data && response.data.user) {
        // Store the current user in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data.user;
      } else {
        throw new Error("User data not found");
      }
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

export const createAvatar = createAsyncThunk(
  "auth/createAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      // Make a POST request to upload the avatar
      const response = await API.post("/user/create-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Return the response data, e.g., the updated user information
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

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/get-all-users");

      console.log("action", response.data.users);

      if (response.data && response.data.users) {
        // Store the current user in localStorage
        localStorage.setItem("users", JSON.stringify(response.data.users));
        return response.data.users;
      } else {
        throw new Error("User data not found");
      }
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

// for follow user
export const followUser = createAsyncThunk(
  "auth/followUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.post(`/user/follow/${userId}`);

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

// for unfollow
export const unfollowUser = createAsyncThunk(
  "auth/unfollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.post(`/user/unfollow/${userId}`);

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
