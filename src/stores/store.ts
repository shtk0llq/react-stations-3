import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./paginationSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
