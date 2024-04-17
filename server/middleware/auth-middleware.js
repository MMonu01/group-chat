const AuthMiddleware = (req, res, next) => {
  if (req.isAuthenticated() && req.path === "/login") {
    res.redirect("/chat");
  } else if (!req.isAuthenticated() && req.path !== "/login") {
    res.redirect("/login");
  } else {
    next();
  }
};

export default AuthMiddleware;
