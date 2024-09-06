import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

interface UserState {
  isSignin: boolean;
}

const cookie = new Cookies();
const initialState = {
  isSignin: cookie.get("token") !== undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state) => {
      state.isSignin = true;
    },
    signout: (state) => {
      state.isSignin = false;
    },
  },
});

export const { signin, signout } = authSlice.actions;
export const auth = (state: UserState) => state.isSignin;
export default authSlice.reducer;
