import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  room_id: { type: String, required: true },
  message: { type: String, required: true },
  user_email: { type: String, required: true },
});

export const messageModel = mongoose.model("message", messageSchema);
