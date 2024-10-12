import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const lexiconSlice = createSlice({
  name: "lexiconCuts",
  initialState: {},
  reducers: {
    setLexiconCuts: (state, action: PayloadAction<Record<string, string>>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { setLexiconCuts } = lexiconSlice.actions;
export default lexiconSlice.reducer;
