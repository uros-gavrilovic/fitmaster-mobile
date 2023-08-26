import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plans: [],

  loading: false,
  error: undefined,
};

const memberSlice = createSlice({
  name: "member",
  initialState: initialState,

  reducers: {
    fetchPlans(state) {
      state.plans = undefined;

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

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;
