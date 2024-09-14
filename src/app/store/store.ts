import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import showMessage from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    message: showMessage,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
