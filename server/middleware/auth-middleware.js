const AuthMiddleware = (req, res, next) => {
  if (req.isAuthenticated() && req.path === "/") {
    res.redirect("/chat");
  } else if (!req.isAuthenticated() && req.path !== "/") {
    res.redirect("/");
  } else {
    next();
  }
};

export default AuthMiddleware;
