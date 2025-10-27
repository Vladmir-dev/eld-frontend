import { configureStore } from "@reduxjs/toolkit";
// 1. Use alias for all imports
import tripReducer from "@/features/trips/tripSlice.js";
import logReducer from "@/features/logs/logSlice.js";
import authReducer from "@/features/auth/authSlice.js";

const store = configureStore({
  reducer: {
    trips: tripReducer,
    logs: logReducer,
    auth: authReducer,
  },
});

export default store;
