import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import translationsReducer from "./translations";

const store = configureStore({
  reducer: {
    user: userReducer,
    translations: translationsReducer,
  },
});

export default store;
