import fs from "fs";
import express from "express";
import { createServer } from "http";
import session from "express-session";
import "dotenv/config";

import { Connection } from "./server/config/db.js";

import passport from "./server/services/passport.js";
import { ImplimentSocketIo } from "./server/services/socket.js";

import { ViewsRouter } from "./server/views.js";
import { userRouter } from "./server/routes/user-router.js";

const PORT = process.env.PORT || 9050;
const isProduction = process.env.NODE_ENV === "production";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(passport.initialize());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.session());

ImplimentSocketIo(httpServer);

app.use("/user", userRouter);

let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static("./dist"));
}

app.get("*", ViewsRouter, async (req, res, next) => {
  try {
    const url = req.originalUrl;

    let template_html;
    if (!isProduction) {
      template_html = await fs.readFileSync("./index.html", "utf-8");
      template_html = await vite.transformIndexHtml(url, template_html);
    } else {
      template_html = await fs.readFileSync("./dist/index.html", "utf-8");
    }

    template_html = template_html.replace("__TITLE__", req.meta_title);
    res.status(200).send(template_html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

Connection.then(() => {
  console.log("connection to db successfull");
  httpServer.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
}).catch((err) => {
  console.log("failed to connect to db", err);
});
