import express from "express";

import { userModel } from "../model/user-model.js";

export const userRouter = express.Router();

userRouter.get("/userDetails", async (req, res, next) => {
  try {
    // if (!req.isAuthenticated()) {
    res.send({ logged_in_success: false });
    // } else {
    //   const { email } = req.user;
    //   const user_details = await userModel.findOne({ email }, { username: 1, avatar: 1 });
    //   const { _id, avatar, username } = user_details;
    //   res.send({ logged_in_success: true, email, _id, avatar, username });
    // }
  } catch (err) {
    next(err);
  }
});

userRouter.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("logout successfull");
    res.redirect("/");
  });
});
