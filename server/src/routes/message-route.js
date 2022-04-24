import express from "express";
import { getMessages } from "../controller/message-controller.js";
import checkAuth from "../middleware/authorization.js";

const message = express.Router();

message.route("/")
    // @route  GET - /api/messages
    // @desc   GET - get all messages belonging to a given chat id.
    // @access Private
    .get(checkAuth, getMessages);

export default message;