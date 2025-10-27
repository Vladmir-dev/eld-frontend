// src/features/logs/logSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* ────────────────────────────────
   Async thunks
──────────────────────────────── */

// Fetch logs for a trip
export const fetchLogs = createAsyncThunk(
  "logs/fetchByTrip",
  async (tripId, { rejectWithValue }) => {
    try {
      const res = await api.get(`logs/?trip=${tripId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch entries for a given daily log
export const fetchEntries = createAsyncThunk(
  "logs/fetchEntries",
  async (logId, { rejectWithValue }) => {
    try {
      const res = await api.get(`entries/?daily_log=${logId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createLog = createAsyncThunk(
  "logs/createLog",
  async (logData, { rejectWithValue }) => {
    try {
      const res = await api.post("logs/", logData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create log");
    }
  }
);

// Create a new log entry
export const createEntry = createAsyncThunk(
  "logs/createEntry",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("entries/", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ────────────────────────────────
   Slice
──────────────────────────────── */
const logSlice = createSlice({
  name: "logs",
  initialState: {
    logs: [],
    entries: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearLogs: (state) => {
      state.dailyLogs = [];
      state.entries = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch logs
      .addCase(fetchLogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

        // 🟩 Create Log
      .addCase(createLog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logs.unshift(action.payload); // Add new log to top
      })
      .addCase(createLog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      

      // Fetch entries
      .addCase(fetchEntries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entries = action.payload;
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Create entry
      .addCase(createEntry.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      });
  },
});

export const { clearLogs } = logSlice.actions;
export default logSlice.reducer;
