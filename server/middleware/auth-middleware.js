const AuthMiddleware = (req, res, next) => {
  if (req.isAuthenticated() && req.path === "/login") {
    res.redirect("/chat");
  } else if (!req.isAuthenticated() && req.path !== "/login") {
    res.redirect("/");
  } else {
    next();
  }
};

export default AuthMiddleware;
