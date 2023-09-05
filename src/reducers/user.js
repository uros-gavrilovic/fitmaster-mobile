import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  token: undefined,
  appInfo: {
    appName: "fitmaster",
    appVersion: "1.0",
    appLocale: "en",
  },

  loading: false,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.token = action.payload.token;

      state.error = undefined;
      state.loading = false;
    },
    logout(state) {
      state.user = undefined;
      state.token = undefined;

      state.error = undefined;
      state.loading = false;
    },
    updateUser(state, action) {
      state.user = action.payload;

      state.error = undefined;
      state.loading = false;
    },
    setAppInfo(state, action) {
      state.appInfo = action.payload;
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

export const userActions = userSlice.actions;
export default userSlice.reducer;
