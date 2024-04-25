import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  room_name: { type: String, required: true },
  creator_email: { type: String, required: true },
});

const joinRoomSchema = new mongoose.Schema({
  room_id: { type: String, required: true },
  user_email: { type: String, required: true },
  room_name: { type: String, required: true },
});

export const roomModel = mongoose.model("room", roomSchema);
export const joinRoomModel = mongoose.model("join_room", joinRoomSchema);
