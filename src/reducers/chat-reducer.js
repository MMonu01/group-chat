import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  room_list: [],
  current_room: {}, // room_id,room_name
  online_users: 0,
  message_list: [],
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

    CHAT_SET_NEW_ROOM: (state, { payload }) => {
      state.room_list = [...state.room_list, payload];

      return state;
    },

    CHAT_SET_MESSAGE_LIST: (state, { payload }) => {
      state.message_list = payload;
      return state;
    },

    SET_CURRENT_ROOM: (state, { payload }) => {
      state.current_room = payload;

      return state;
    },

    SET_ONLINE_USERS_COUNT: (state, { payload }) => {
      state.online_users = payload;

      return state;
    },

    CHAT_SET_NEW_MESSAGE: (state, { payload }) => {
      state.message_list = [...state.message_list, payload];

      return state;
    },
  },
});

export const { CHAT_SET_ROOMS_DATA, RESET_CHAT_DATA, SET_CURRENT_ROOM, SET_ONLINE_USERS_COUNT, CHAT_SET_CONNECTION_DATA, CHAT_SET_MESSAGE_LIST, CHAT_SET_NEW_MESSAGE, CHAT_SET_NEW_ROOM } = ChatSlice.actions;

export default ChatSlice.reducer;
