import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null, // Use an empty array for better handling
  reducers: {
    addConnections: (state, action) => {
        console.log("reducer called with payload",action.payload)
        return action.payload},
    removeConnections: () => null,
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
