import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  avatar: "",
  logged_in_success: false,
  email: "",
  user_id: "",
};

export const LoginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    SET_USER_INFO: (state, { payload }) => {
      state.username = payload.username;
      state.avatar = payload.avatar;
      state.logged_in_success = payload.logged_in_success;
      state.email = payload.email;
      state.user_id = payload._id;

      return state;
    },

    LOGOUT: (state) => {
      return initialState;
    },
  },
});

export const { SET_USER_INFO, LOGOUT } = LoginSlice.actions;

export default LoginSlice.reducer;
