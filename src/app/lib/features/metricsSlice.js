import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalUsers: null,
  activeUsers: null,
  totalStreams: null,
  revenue: null,
  topArtist: "",
};

export const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {
    updateMetric: (state, action) => {
      const { type, value } = action.payload;
      if (type in state) {
        state[type] = value;
      }
    },
  },
});

export const { updateMetric } = metricsSlice.actions;
export default metricsSlice.reducer;
