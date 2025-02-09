import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  name: string;
  walletId: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    walletId: "",
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
