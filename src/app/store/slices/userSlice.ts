import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    user: (state, action: PayloadAction<{}>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { user } = userSlice.actions;
export default userSlice.reducer;
