import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const coinIconsSlice = createSlice({
  name: "coinIcons",
  initialState: {},
  reducers: {
    setCoinIcons: (state, action: PayloadAction<Record<string, string>>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { setCoinIcons } = coinIconsSlice.actions;
export default coinIconsSlice.reducer;
