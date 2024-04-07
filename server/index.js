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

const SendSocketCount = async (socket, room) => {
  const socket_count = await io.in(room).fetchSockets();
  io.to(room).emit("live", socket_count.length);
};

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("join", async ({ name, room }) => {
    socket.join(room);
    SendSocketCount(socket, room);

    const messages = await MessageModel.find({ room });
    io.to(room).emit("messages", messages);
  });

  socket.on("leaveRoom", async (room) => {
    socket.leave(room);
    SendSocketCount(socket, room);
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
