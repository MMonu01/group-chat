import express from "express";
import mongoose from "mongoose";

import { roomModel, joinRoomModel } from "../model/room-model.js";

export const roomRouter = express.Router();

roomRouter.post("/getrooms", async (req, res, next) => {
  const user_email = req.user.email;
  const { search } = req.body;

  const query_obj = { user_email };

  if (!!search) {
    query_obj.room_name = { $regex: search };
  }

  try {
    const room = await joinRoomModel.find(query_obj, { room_id: 1, room_name: 1, _id: 0 });
    res.send(room);
  } catch (err) {
    next(err);
  }
});

roomRouter.post("/createroom", async (req, res, next) => {
  const { room_name } = req.body;
  const user_email = req.user.email;
  try {
    const new_room = new roomModel({ room_name, creator_email: user_email });
    await new_room.save();

    const join_obj = { room_id: new_room._id, user_email, room_name: new_room.room_name };
    const new_join = new joinRoomModel(join_obj);
    new_join.save();

    res.send({ room_id: new_room.id, room_name: room_name });
  } catch (err) {
    next(err);
  }
});

roomRouter.post("/joinroom", async (req, res, next) => {
  const { room_id } = req.body;
  try {
    const room = await roomModel.findOne({ _id: new mongoose.Types.ObjectId(room_id) });
    if (!!room) {
      const is_user_joined = await joinRoomModel.findOne({ user_email: req.user.email, room_id });

      if (!is_user_joined) {
        const join_obj = { room_id, user_email: req.user.email, room_name: room.room_name };
        const new_join = new joinRoomModel(join_obj);
        new_join.save();
        res.send({ ok: true, room_id, room_name: room.room_name });
      } else {
        res.send({ ok: false, message: "Already joined" });
      }
    } else {
      res.send({ ok: false, message: "Invalid group id" });
    }
  } catch (err) {
    next(err);
  }
});
