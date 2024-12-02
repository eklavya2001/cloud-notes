const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies.uid;
  if (!tokenCookie) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: "Authentication required" });
  }
  const user = getUser(tokenCookie);
  req.user = user;
  console.log(user);

  next();
}

module.exports = {
  checkForAuthentication,
};
