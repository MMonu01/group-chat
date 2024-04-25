import express from "express";
import { createServer } from "http";
import "dotenv/config";
// import { ImplimentSocketIo } from "./services/socket.js";
import { Connection } from "./config/db.js";

const PORT = process.env.port || 9050;

const app = express();
const httpServer = createServer(app);
// ImplimentSocketIo(httpServer);

Connection.then(() => {
  console.log("connection to db successfull");
  httpServer.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
}).catch((err) => {
  console.log("failed to connect to db", err);
});
