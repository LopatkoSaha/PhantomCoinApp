import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalType: "",
  },
  reducers: {
    showModal: (
      state,
      {
        payload,
      }: PayloadAction<{
        modalType?: "log" | "reg" | "";
      }>
    ) => {
      return {
        ...state,
        modalType: payload.modalType ?? "",
      };
    },
  },
});

export const { showModal } = modalSlice.actions;
export default modalSlice.reducer;
