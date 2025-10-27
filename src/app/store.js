// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "../features/trips/tripSlice.js";
import logReducer from "../features/logs/logsSlice.js";
import authReducer from "../features/auth/authSlice.js";

const store = configureStore({
  reducer: {
    trips: tripReducer,
    logs: logReducer,
    auth: authReducer,
  },
});

export default store;
