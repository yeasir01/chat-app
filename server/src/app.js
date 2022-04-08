"use strict";

import "dotenv/config";
import express from "express";
import http from "http";
import compression from "compression";
import helmet from "helmet";
import config from "./config/environment.js";
import authRoutes from "./routes/auth.js";
import errorHandler from "./middleware/error-handler.js";
import { sequelize } from "./models/index.js";
import { Server } from "socket.io";
import passport  from "./config/passport.js";
import session from "express-session";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.set("trust proxy", "loopback"); //research this a bit more

const SESSION_OPT = {
  secret: "123456789",
  saveUninitialized: false,
  resave: true 
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session(SESSION_OPT));
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(compression());

app.use("/api/auth", authRoutes);

io.on("connection", (socket) => {
  socket.broadcast.emit("new-user",`a user connected with ID# ${socket.id}`);
});

app.use(errorHandler);

const startServer = async () => {
  try {
    console.log("Connecting to db...");
    await sequelize.sync({force: true});
    await sequelize.authenticate();
    httpServer.listen(config.port, () => console.log("Server running on port", config.port));
  } catch (err) {
    console.trace(err);
  }
};

startServer();