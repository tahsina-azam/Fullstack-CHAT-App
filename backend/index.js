import express, { json } from "express";
import connectDB from "./db.js";
import { config } from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors"
import { Server } from "socket.io";
import http from "http"
import chatRoutes from "./routes/chatRoutes.js";


config();
connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(cors())

app.use(json()); // to accept json data

app.get("/", (req, res) => {
  res.send("API Running!");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);


const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);


const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    console.log(newMessageRecieved)
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      console.log(user._id, newMessageRecieved.sender._id)
      // socket.to("32").emit("receive_message", newMessageRecieved);
      // socket.broadcast.emit("receive_message",newMessageRecieved)
      // socket.emit("receive_message", newMessageRecieved)
    });
  });

  socket.on("send_message", (data) => {
    socket.to('5').emit("receive_message", data);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });
// });

