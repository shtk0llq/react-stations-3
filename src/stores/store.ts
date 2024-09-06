import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./paginationSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    pagination: paginationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
