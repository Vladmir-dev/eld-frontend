// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
// import { useNavigate } from "react-router-dom";




// Thunk: login -> POST /token/ (expects { email, password })
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("token/", { email, password });
      // res.data expected: { access, refresh, user: {...} } per custom token view
      const { access, refresh, user } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      return user;
    } catch (err) {
      const message = err.response?.data?.detail || err.message;
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  return {};
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    loading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.loading=true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("login payload", action.payload)
        state.user = action.payload;
        state.loading=false;
        
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export default authSlice.reducer;
