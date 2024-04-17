import "dotenv/config";
import { Server } from "socket.io";

import { MessageModel } from "../model/message-mode.js";

let user_list = {};

export function ImplimentSocketIo(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: process.env.ORIGIN },
  });

  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      SendSocketList({ io, socket, room: null, event: "disconnect" });
    });

    socket.on("join", async ({ name, room }) => {
      socket.join(room);
      SendSocketList({ room, io, event: "join", name });

      const messages = await MessageModel.find({ room });
      socket.emit("messages", [...messages, { message: `Welcome ${name}`, room }]);
      socket.to(room).emit("messages", [...messages, { message: `${name} joined`, room }]);
    });

    socket.on("leaveRoom", async (room) => {
      socket.disconnect();
      SendSocketList({ room, io, event: "leave" });
    });

    socket.on("newMessages", async ({ message: new_message, room }) => {
      const newMessage = new MessageModel({ message: new_message, room });
      await newMessage.save();

      const message = await MessageModel.find({ room });
      io.to(room).emit("messages", message);
    });
  });
}

const SendSocketList = async ({ socket, io, room, event, name }) => {
  const socket_connected = await io.in(room).fetchSockets();

  if (event === "join") {
    let id = socket_connected[socket_connected.length - 1].id;
    user_list[id] = { name, room };
    console.log("user connected", user_list[id].name);
  } else {
    let all_socket = await io.fetchSockets();
    let temp_obj = {};
    for (let i = 0; i < all_socket.length; i++) {
      temp_obj[all_socket[i].id] = 1;
    }

    for (let key in user_list) {
      if (!Object.hasOwn(temp_obj, key)) {
        room = user_list[key].room;
        console.log("user disconnected", user_list[key].name);

        const messages = await MessageModel.find({ room });
        socket.to(room).emit("messages", [...messages, { message: `${user_list[key].name} left`, room }]);
        delete user_list[key];
        break;
      }
    }
  }

  let socket_list = [];

  for (let key in user_list) {
    if (user_list[key].room === room) {
      socket_list.push(user_list[key]);
    }
  }

  io.to(room).emit("live", socket_list);
};
