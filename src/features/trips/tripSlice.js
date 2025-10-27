// src/features/trips/tripSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* ────────────────────────────────
   Async thunks
──────────────────────────────── */

// Fetch all trips
export const fetchTrips = createAsyncThunk("trips/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("trips/");
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Fetch a single trip by ID
export const fetchTripById = createAsyncThunk("trips/fetchOne", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`trips/${id}/`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// Create a new trip
export const createTrip = createAsyncThunk("trips/create", async (payload, { rejectWithValue }) => {
  try {
    console.log("PAYLOD", payload)
    const res = await api.post("trips/", payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

//Update Trip
export const updateTrip = createAsyncThunk("trips/update", async ({ id, payload }, { rejectWithValue }) => {
  try {
    console.log("PAYLOD", payload)
    const res = await api.patch(`trips/${id}/`, payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

/* ────────────────────────────────
   Slice
──────────────────────────────── */
const tripSlice = createSlice({
  name: "trips",
  initialState: {
    items: [],
    selectedTrip: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearTrips: (state) => {
      state.items = [];
      state.selectedTrip = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchTrips.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch one
      .addCase(fetchTripById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTripById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedTrip = action.payload;
      })
      .addCase(fetchTripById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Create
      .addCase(createTrip.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      //update
      .addCase(updateTrip.pending, (state) => {
        state.status = "updating";
      })

      .addCase(updateTrip.fulfilled, (state, action) => {
        state.status = "succeeded";
        // const idx = state.trips.findIndex((t) => t.id === action.payload.id);
        // if (idx !== -1) state.trips[idx] = action.payload;
      })

      .addCase(updateTrip.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export const { clearTrips } = tripSlice.actions;
export default tripSlice.reducer;
