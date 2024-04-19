import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  avatar: "",
  logged_in_success: false,
};

export const LoginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    SET_USER_INFO: (state, { payload }) => {
      state.username = payload.username;
      state.avatar = payload.avatar;
      state.logged_in_success = payload.logged_in_success;

      return state;
    },

    LOGOUT: (state) => {
      return initialState;
    },
  },
});

export const { SET_USER_INFO, LOGOUT } = LoginSlice.actions;

export default LoginSlice.reducer;
