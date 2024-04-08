import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";

import { Connection } from "./config/db.js";
import { MessageModel } from "./model/message-mode.js";

const PORT = process.env.port || 9050;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: process.env.ORIGIN },
});

let user_list = {};

const SendSocketCount = async ({ socket, room, event, name }) => {
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

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    SendSocketCount({ socket, room: null, event: "disconnect" });
  });

  socket.on("join", async ({ name, room }) => {
    socket.join(room);
    SendSocketCount({ socket, room, event: "join", name });

    const messages = await MessageModel.find({ room });
    io.to(room).emit("messages", messages);
  });

  socket.on("leaveRoom", async (room) => {
    socket.leave(room);
    SendSocketCount({ socket, room, event: "leave" });
  });

  socket.on("newMessages", async ({ message: new_message, room }) => {
    const newMessage = new MessageModel({ message: new_message, room });
    await newMessage.save();

    const message = await MessageModel.find({ room });
    io.to(room).emit("messages", message);
  });
});

Connection.then(() => {
  console.log("connection to db successfull");
  httpServer.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
}).catch((err) => {
  console.log("failed to connect to db", err);
});
