import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server as socketServer } from "socket.io";
import http from "http";
import morgan from "morgan";
const { PORT } = process.env;
const app = express();
const server = http.createServer(app);
const io = new socketServer(server, {
  cors: {
    origin: "*",
  },
});
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//TODO: LISTEN CONNECTIONS
io.on("connection", (socket) => {
  console.log(socket.id, "conectado");
  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("message", data);
  });
});

server.listen(PORT, () => {
  console.log("Listened at", PORT);
});
