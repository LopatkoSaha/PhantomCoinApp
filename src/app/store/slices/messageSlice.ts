import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type TMessage = {
//   msgText: string,
//     showMessage: boolean,
//     msgType: "info" | "warning" | "error" | "success",
// }

const messageSlice = createSlice({
  name: "message",
  initialState: {
    msgText: "",
    showMessage: false,
    msgType: "info",
  },
  reducers: {
    showMessage: (state, {payload}: PayloadAction<{
      msgText: string,
      msgType?: "info" | "warning" | "error" | "success",
    }>) => {
      return {
        ...state,
        msgText: payload.msgText,
        msgType: payload.msgType ?? "info",
        showMessage: true,
      }
    },
    setShowMessage: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        showMessage: action.payload,
      };
    }
  },
});

export const { showMessage, setShowMessage } = messageSlice.actions;
export default messageSlice.reducer;
