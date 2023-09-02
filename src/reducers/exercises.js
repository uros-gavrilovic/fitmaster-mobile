import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exercises: [],

  loading: false,
  error: undefined,
};

const exercisesSlice = createSlice({
  name: "exercises",
  initialState: initialState,

  reducers: {
    fetchExercises(state, action) {
      state.exercises = action.payload;

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

export const exercisesActions = exercisesSlice.actions;
export default exercisesSlice.reducer;
