import { io } from "socket.io-client";
import { ApiUrl } from "~/env";

import { GetMessageData } from "~/actions/chat-actions";

import { LOGOUT } from "~/reducers/login-reducer";
import { SOCKET_SET_CONNECTION_DATA, SOCKET_SET_LIVE_USER, RESET_SOCKET, SOCKET_GET_MESSAGES } from "~/reducers/socket-reducer";
import { SET_ONLINE_USERS_COUNT, CHAT_SET_NEW_MESSAGE } from "~/reducers/chat-reducer";

export const StartSocketConnection = () => (dispatch, getState) => {
  const socket = io(ApiUrl);

  socket.on("connect", () => {
    console.log("socket connected", socket.id);
    dispatch(SOCKET_SET_CONNECTION_DATA({ socket, socket_id: socket.id }));
    dispatch(SocketJoinRoom());
  });

  socket.on("connect_error", (error) => {
    if (socket.active) {
      // temporary failure, the socket will automatically try to reconnect
    } else {
      // the connection was denied by the server
      // in that case, `socket.connect()` must be manually called in order to reconnect
      socket.connect();
    }
  });

  socket.on("online", (online_users) => {
    dispatch(SET_ONLINE_USERS_COUNT(online_users));
  });

  socket.on("disconnect", (reason) => {
    if (socket.active) {
      // temporary failure, the socket will automatically try to reconnect
    } else {
      // the connection was forcefully closed by the server or the client itself
      // dispatch(RESET_SOCKET());
      // dispatch(LOGOUT());
    }
  });

  // socket.on("live", (socket_list) => {
  //   dispatch(SOCKET_SET_LIVE_USER(socket_list));
  // });

  socket.on("newMessage", (new_message) => {
    dispatch(CHAT_SET_NEW_MESSAGE(new_message));
  });
};

export const DisconnectSocket = () => (dispatch, getState) => {
  const { socket_store, login_store } = getState();
  const { socket } = socket_store;
  const { room } = login_store;

  socket.emit("leaveRoom", room);
  dispatch(RESET_SOCKET());
  dispatch(LOGOUT());
};

export const SocketJoinRoom = () => (dispatch, getState) => {
  const { chat_store, login_store, socket_store } = getState();
  const { current_room } = chat_store;
  const { username } = login_store;
  const { socket } = socket_store;
  console.log("socket", socket);

  if (Object.keys(current_room).length > 0) {
    socket.emit("join", { room_id: current_room.room_id, username });
    dispatch(GetMessageData(current_room.room_id));
  }
};

export const ChatSendNewMessages = (message) => (dispatch, getState) => {
  const { socket_store, chat_store, login_store } = getState();
  const { socket } = socket_store;
  const room_id = chat_store.current_room.room_id;
  const { user_id } = login_store;

  socket.emit("newMessage", { message, room_id, user_id });
};
