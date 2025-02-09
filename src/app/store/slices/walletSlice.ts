import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const waletSlice = createSlice({
  name: "walet",
  initialState: {},
  reducers: {
    setWallet: (state, action: PayloadAction<{}>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { setWallet } = waletSlice.actions;
export default waletSlice.reducer;