import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import messageReducer from "./slices/messageSlice";
import user from "./slices/userSlice";
import courses from "./slices/coursesSlice";
import coinIcons from "./slices/coinIconsSlice";
import toggleGames from "./slices/toggleGamesSlice";
import wallet from "./slices/walletSlice";
import preorders from "./slices/preorderSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    message: messageReducer,
    user: user,
    courses: courses,
    coinIcons: coinIcons,
    toggleGames: toggleGames,
    wallet: wallet,
    preorders: preorders,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
