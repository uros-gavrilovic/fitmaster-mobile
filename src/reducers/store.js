import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import memberReducer from "./member";
import translationsReducer from "./translations";

const store = configureStore({
  reducer: {
    user: userReducer,
    member: memberReducer,
    translations: translationsReducer,
  },
});

export default store;
