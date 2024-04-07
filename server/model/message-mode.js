import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  room: { type: String, required: true },
  message: { type: String, required: true },
});

export const MessageModel = mongoose.model("message", MessageSchema);
