import express from "express";
import "dotenv/config";

import passport from "./services/passport.js";

export const serverRouter = express.Router();

serverRouter.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

serverRouter.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
  req.login(req.user, function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/chat");
  });
});

serverRouter.post("/user/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("logout successfull");
    res.redirect("/login");
  });
});

serverRouter.get("/login", (req, res, next) => {
  req.meta_title = "login screen";

  next();
});

serverRouter.get("/", (req, res, next) => {
  req.meta_title = "join screen";

  next();
});

serverRouter.get("/chat", (req, res, next) => {
  req.meta_title = "chat screen";

  next();
});

serverRouter.use((req, res, next) => {
  if (!req.meta_title) {
    req.meta_title = "Not Found";
  }

  next();
});
