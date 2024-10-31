import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const toggleGamesSlice = createSlice({
  name: "currentGame",
  initialState: "ColorSwap",
  reducers: {
    toggleGames: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { toggleGames } = toggleGamesSlice.actions;
export default toggleGamesSlice.reducer;
