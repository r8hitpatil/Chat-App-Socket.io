import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import roomRoutes from "./routes/room.routes.js";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://chat-app-rect.onrender.com'
  ]
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin : ['http://localhost:5173','https://chat-app-rect.onrender.com']
    }
});
dotenv.config();
const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);
  
  socket.on("join-room",(roomId) => {
    socket.join(roomId);
    socket.roomId = roomId;
    socket.to(roomId).emit("message", { 
      text: "Someone joined the room", 
      type: "notification", 
      timestamp: Date.now() 
    });
  })

  socket.on("message", (msg) => {
    console.log(`${socket.id} sent message: ${msg}`);
    // Broadcast to all other clients
    const roomId = socket.roomId;
    socket.to(roomId).emit("message", { text: msg, type: "received" , timestamp : Date.now()});
    // socket.broadcast.emit("message", { text: msg, type: "received" });
  });

  socket.on("disconnect", () => {  // No parameters for disconnect!
    if (socket.roomId) {
      socket.to(socket.roomId).emit("message", { 
        text: "Someone left the room", 
        type: "notification", 
        timestamp: Date.now() 
      });
      socket.leave(socket.roomId);
    }
    console.log(`Client ${socket.id} disconnected`);
  });
});

app.use('/chat',roomRoutes);

connectDB();
server.listen(port , () => {
    console.log(`Server with Socket.io running on port ${port}`);
})