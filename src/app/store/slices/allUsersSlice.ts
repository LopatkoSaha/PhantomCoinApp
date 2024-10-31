import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    allUsers: (state, action: PayloadAction<[]>) => {
      return [...action.payload];
    },
  },
});

export const { allUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
