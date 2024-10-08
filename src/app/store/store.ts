import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import messageReducer from "./slices/messageSlice";
import user from "./slices/userSlice";
import allUsers from "./slices/allUsersSlice";
import courses from "./slices/coursesSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    message: messageReducer,
    user: user,
    allUsers: allUsers,
    courses: courses,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
