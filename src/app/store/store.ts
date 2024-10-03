import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import messageReducer from "./slices/messageSlice";
import user from "./slices/userSlice";
import allUsers from "./slices/allUsersSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    message: messageReducer,
    user: user,
    allUsers: allUsers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
