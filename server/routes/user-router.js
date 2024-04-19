import express from "express";

export const userRouter = express.Router();

userRouter.get("/userDetails", async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      res.sen({ logged_in_success: false });
    } else {
      const { username, avatar, email } = req.user;
      res.send({ logged_in_success: true, username, avatar, email });
    }
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
    res.redirect("/login");
  });
});
