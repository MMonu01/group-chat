import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  room: "",
};

export const JoinSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    SET_USER_INFO: (state, { payload }) => {
      state.name = payload.name;
      state.room = payload.room;
      return state;
    },

    LOGOUT: (state) => {
      return initialState;
    },
  },
});

export const { SET_USER_INFO, LOGOUT } = JoinSlice.actions;

export default JoinSlice.reducer;
