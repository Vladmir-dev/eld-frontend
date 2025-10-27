// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "../features/trips/tripSlice";
import logsReducer from "../features/logs/logsSlice.js";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    trips: tripReducer,
    logs: logsReducer,
    auth: authReducer,
  },
});

export default store;
