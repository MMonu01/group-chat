import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  socket_id: null,
  socket_count: 0,
};

export const SocketSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    SOCKET_SET_CONNECTION_DATA: (state, { payload }) => {
      state.socket = payload.socket;
      state.socket_id = payload.socket_id;

      return state;
    },

    RESET_SOCKET: (state) => {
      return initialState;
    },

    SOCKET_SET_LIVE_USER: (state, { payload }) => {
      state.socket_count = payload;

      return state;
    },
  },
});

export const { SOCKET_SET_CONNECTION_DATA, RESET_SOCKET, SOCKET_SET_LIVE_USER } = SocketSlice.actions;

export default SocketSlice.reducer;
