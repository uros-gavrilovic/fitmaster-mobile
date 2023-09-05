import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memberships: [],

  loading: false,
  error: undefined,
};

const membershipsSlice = createSlice({
  name: "memberships",
  initialState: initialState,

  reducers: {
    fetchMemberships(state, action) {
      state.memberships = action.payload;

      state.error = undefined;
      state.loading = false;
    },

    actionStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    actionError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const membershipsActions = membershipsSlice.actions;
export default membershipsSlice.reducer;
