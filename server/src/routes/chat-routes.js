import express from "express";
import { getChats } from "../controller/chat-controller.js";
import checkAuth from "../middleware/authorization.js";

const chat = express.Router();

chat.route("/")
    // @route  GET - /api/chats
    // @desc   GET - get chats based on userId in request object.
    // @access Private
    .get(checkAuth, getChats);

export default chat;