import express from "express";
import "dotenv/config";

import passport from "./services/passport.js";

import AuthMiddleware from "./middleware/auth-middleware.js";

export const ViewsRouter = express.Router();

ViewsRouter.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

ViewsRouter.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), function (req, res) {
  req.login(req.user, function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/chat");
  });
});

ViewsRouter.use(AuthMiddleware);

ViewsRouter.get("/", (req, res, next) => {
  req.meta_title = "login screen";

  next();
});

ViewsRouter.get("/chat", (req, res, next) => {
  req.meta_title = "chat screen";

  next();
});

ViewsRouter.get("/message", (req, res, next) => {
  req.meta_title = "message screen";

  next();
});

ViewsRouter.use((req, res, next) => {
  if (!req.meta_title) {
    req.meta_title = "Not Found";
  }

  next();
});
