"use strict";

import "dotenv/config";
import express from "express";
import http from "http";
import compression from "compression";
import helmet from "helmet";
import config from "./config/environment.js";
import userRoutes from "./routes/user-routes.js";
import chatRoutes from "./routes/chat-routes.js";
import messageRoutes from "./routes/message-route.js";
import errorHandler from "./middleware/error-handler.js";
import db from "./models/index.js";
import { Server } from "socket.io";
import passport  from "./config/passport.js";
import session from "express-session";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.set("trust proxy", "loopback"); //research this a bit more

const sessionMiddleware = session({
  secret: "123456789",
  saveUninitialized: false,
  resave: true 
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(compression());

app.use("/api/auth", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error("unauthorized"));
  }
});

io.on("connection", (socket) => {
  const user = socket.request.user;
  socket.emit("new-user",`a user connected with ID# ${socket.id} - ${user.handle}`);
  //console.log("welcome", user.handle);
});

app.use(errorHandler);

const startServer = async () => {
  try {
    console.log("Connecting to db...");
    await db.sequelize.authenticate();
    await db.sequelize.sync({alter: true}); //alter or force
    httpServer.listen(config.port, () => console.log("Server running on port", config.port));
  } catch (err) {
    console.trace(err);
  }
};

startServer();