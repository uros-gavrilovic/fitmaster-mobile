import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import memberReducer from "./member";
import exercisesReducer from "./exercises";
import translationsReducer from "./translations";

const store = configureStore({
  reducer: {
    user: userReducer,
    member: memberReducer,
    exercises: exercisesReducer,
    translations: translationsReducer,
  },
});

export default store;
