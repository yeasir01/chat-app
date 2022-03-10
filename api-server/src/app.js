"use strict";

import "dotenv/config";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import config from "./config/environment.js";
import authRoutes from "./routes/auth.js";
import errorHandler from "./middleware/error-handler.js";
import { db } from "./config/database.js";
import passport  from "./config/passport.js";
import session from "express-session";

const app = express();
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

app.use("/auth", authRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    console.log("Connecting to db...");
    await db.sync({force: true});
    await db.authenticate();
    app.listen(config.port, () => console.log("API server ready to accept requests on port", config.port));
  } catch (err) {
    console.log(err);
  }
};

startServer();