import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    startCourses: {},
    currentCourses: {}
  },
  reducers: {
    setCurrentCourses: (
      state,
      action: PayloadAction<Record<string, number>>
    ) => {
      return {
        ...state,
        currentCourses: action.payload,
      };
    },
    setStartCourses: (
      state,
      action: PayloadAction<Record<string, number>>
    ) => {
      return {
        ...state,
        startCourses: action.payload,
      };
    },
  },
});

export const { setCurrentCourses, setStartCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
