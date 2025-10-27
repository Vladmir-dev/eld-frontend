// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "../features/trips/tripSlice";
import logReducer from "../features/logs/logSlice.js";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    trips: tripReducer,
    logs: logReducer,
    auth: authReducer,
  },
});

export default store;
