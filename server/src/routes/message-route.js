import express from "express";
import { getMessages, createMessage } from "../controller/message-controller.js";
import checkAuth from "../middleware/authorization.js";
import validate from "../middleware/validate.js";
import schema from "../validation/message-schema.js";

const message = express.Router();

message.route("/")
    // @route  GET - /api/messages
    // @desc   GET - get all messages belonging to a given chat id.
    // @access Private
    .get(checkAuth, getMessages)
    // @route  GET - /api/messages
    // @desc   GET - get all messages belonging to a given chat id.
    // @access Private
    .post(checkAuth, validate(schema.createMessage), createMessage)
;
export default message;