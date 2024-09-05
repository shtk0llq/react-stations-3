import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PageState {
  value: number;
}

const initialState: PageState = {
  value: 0,
};

export const paginationSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    next: (state) => {
      state.value += 1;
    },
    prev: (state) => {
      state.value -= 1;
    },
  },
});

export const { next, prev } = paginationSlice.actions;
export const pageCount = (state: RootState) => state.pagination.value;
export default paginationSlice.reducer;
