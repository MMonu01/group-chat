import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  room_list: [],
};

export const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState: INITIAL_STATE,
  reducers: {
    RESET_CHAT_DATA: (state) => {
      return INITIAL_STATE;
    },

    CHAT_SET_ROOMS_DATA: (state, { payload }) => {
      state.room_list = payload;

      return state;
    },
  },
});

export const { CHAT_SET_ROOMS_DATA, RESET_CHAT_DATA } = ChatSlice.actions;

export default ChatSlice.reducer;
