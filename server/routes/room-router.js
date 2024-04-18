import express from "express";

import { roomModel, joinRoomModel } from "../model/room-model.js";

export const roomRouter = express.Router();

roomRouter.post("/createroom", async (req, res) => {
  const { room_name } = req.body;
  const user_email = req.user.email;
  try {
    const new_room = new roomModel({ room_name, creator_email: user_email });
    await new_room.save();

    const join_obj = { room_id: new_room._id, user_email, room_name: new_room.room_name };
    const new_join = new joinRoomModel(join_obj);
    new_join.save();
    res.send({ ok: true });
  } catch (err) {
    console.error(err);
    res.send({ ok: false });
  }
});

roomRouter.post("/joinroom", async (req, res) => {
  const { room_id } = req.body;
  try {
    const room = await roomModel.findOne({ _id: room_id });

    if (!!room) {
      const join_obj = { room_id, user_email: req.user.email, room_name: room.room_name };
      const new_join = new joinRoomModel(join_obj);
      new_join.save();
    }
    res.send({ ok: true });
  } catch {
    res.send({ ok: false });
  }
});
