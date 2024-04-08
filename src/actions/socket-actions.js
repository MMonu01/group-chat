import { io } from "socket.io-client";
import { ApiUrl } from "~/env";

import { LOGOUT } from "~/reducers/join-reducer";
import { SOCKET_SET_CONNECTION_DATA, SOCKET_SET_LIVE_USER, RESET_SOCKET, SOCKET_GET_MESSAGES } from "~/reducers/socket-reducer";

export const StartSocketConnection = () => (dispatch, getState) => {
  const { join_store } = getState();
  const { name, room } = join_store;

  const socket = io(ApiUrl);

  socket.on("connect", () => {
    console.log("socket connected", socket.id);
    socket.emit("join", { name, room });
    dispatch(SOCKET_SET_CONNECTION_DATA({ socket, socket_id: socket.id }));
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

  socket.on("disconnect", (reason) => {
    if (socket.active) {
      // temporary failure, the socket will automatically try to reconnect
    } else {
      // the connection was forcefully closed by the server or the client itself
      dispatch(RESET_SOCKET());
      dispatch(LOGOUT());
    }
  });

  socket.on("live", (socket_list) => {
    dispatch(SOCKET_SET_LIVE_USER(socket_list));
  });

  socket.on("messages", (messages) => {
    console.log("message", messages);
    dispatch(SOCKET_GET_MESSAGES(messages));
  });
};

export const DisconnectSocket = () => (dispatch, getState) => {
  const { socket_store, join_store } = getState();
  const { socket } = socket_store;
  const { room } = join_store;

  socket.emit("leaveRoom", room);
  dispatch(RESET_SOCKET());
  dispatch(LOGOUT());
};

export const ChatSendNewMessages = (message) => (dispatch, getState) => {
  const { socket_store, join_store } = getState();
  const { socket } = socket_store;
  const { room } = join_store;

  socket.emit("newMessages", { message, room });
};
