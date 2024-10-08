import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {},
  reducers: {
    setCurrencyCourses: (
      state,
      action: PayloadAction<Record<string, number>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setCurrencyCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
