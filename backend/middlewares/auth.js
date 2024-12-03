const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies.uid;
  if (!tokenCookie) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Authentication required" });
  }

  try {
    const user = getUser(tokenCookie); // Token decode and validation
    if (!user) {
      return res
        .status(401)
        .json({ isAuthenticated: false, message: "Invalid token" });
    }
    req.user = user;
    console.log("Authenticated user:", user);
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Invalid or expired token" });
  }
}

module.exports = {
  checkForAuthentication,
};
