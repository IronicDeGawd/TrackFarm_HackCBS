import http from "http";
import express from "express";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from your React frontend

const port = new SerialPort({ path: "COM12", baudRate: 9600 });

// const port = new SerialPort({ path: "/dev/ttyUSB0", baudRate: 9600 });

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from your React frontend
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected to Socket.IO");

  parser.on("data", (data) => {
    const uid = data.trim();
    console.log("Scanned UID:", uid);
    socket.emit("scan-uid", uid); // Send the UID to the client
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
