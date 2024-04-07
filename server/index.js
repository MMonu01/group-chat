import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";

const PORT = process.env.port || 9050;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: process.env.ORIGIN },
});

let messages = [];

const SendSocketCount = async (socket,room) => {
  const socket_count = await io.in(room).fetchSockets();
  io.to(room).emit("live", socket_count.length);
};

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("join", ({ name, room }) => {
    socket.join(room);
    SendSocketCount(socket, room);
  });

  socket.on("leaveRoom", async (room) => {
    socket.leave(room);
    SendSocketCount(socket, room);
  });

  socket.on("messages", (messages) => {
    // socket.emit("messages", messages);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
