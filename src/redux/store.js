import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/postsReducer";
import userReducer from "./reducers/userReducer";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});
