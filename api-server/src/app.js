"use strict";

import "dotenv/config";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import config from "./config/env.js";
import authRoutes from "./api/v1/auth.js";
import { db } from "./config/database.js";

const app = express();

app.use(compression());
app.use(helmet());
app.use(express.json());

app.use("/v1/auth", authRoutes);

const startServer = async () => {
  try {
    await db.sync({force: true});
    await db.authenticate();
    app.listen(config.port, ()=> console.log("Connected and listening"));
  } catch (err) {
    console.log(err);
  }
};

startServer();