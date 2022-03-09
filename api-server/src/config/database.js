"use strict";

import { Sequelize, DataTypes } from "sequelize";
import config from "./environment.js";

const db = new Sequelize(config.sequelize);

export {Sequelize, db, DataTypes};