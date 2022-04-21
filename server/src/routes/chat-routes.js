import express from "express";
import { getChats } from "../controller/chat-controller.js";
import checkAuth from "../middleware/authorization.js";

const chat = express.Router();

chat.route("/")
    // @route  GET /chats
    // @desc   GET - check credentials and return a session cookie if auth passes.
    // @access Public
    .get(/* checkAuth,  */getChats);

export default chat;