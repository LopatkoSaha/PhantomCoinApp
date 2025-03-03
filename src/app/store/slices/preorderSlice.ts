import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TPreorder = {
  id: number,
  wallet_id: number,
  currency_sell: string,
  currency_buy: string,
  value_buy: string,
  is_all_in: number,
  trigger_course: string,
  is_active: number,
  status: string,
  triggered_at: null | string,
  created_at: string,
}

const initialState: TPreorder[] = [];

const preorderSlice = createSlice({
  name: "preorders",
  initialState: initialState,
  reducers: {
    setPreorderStore: (state, action: PayloadAction<[]>) => {
      return action.payload;
    },
  },
});

export const { setPreorderStore } = preorderSlice.actions;
export default preorderSlice.reducer;