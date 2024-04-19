import express from "express";

import { messageModel } from "../model/message-model.js";

export const messageRouter = express.Router();

messageRouter.post("/getmessages", async (req, res, next) => {
  try {
    const user_email = req.user.email;
    const { room_id } = req.body;
    const messages = await messageModel.find({ user_email, room_id });
    res.send(messages);
  } catch (err) {
    next(err);
  }
});
