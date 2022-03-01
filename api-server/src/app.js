"use strict";

import "dotenv/config";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import config from "./config/index.js";
import authRoute from  "./routes/v1/auth-route.js";

const APP = express();
const PORT = config.port || 5000;

APP.use(compression());
APP.use(helmet());

APP.use("/api/auth", authRoute);

APP.listen(PORT, () => console.log("API Server listening on ", PORT));