const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const router = express.Router();
const { checkForAuthentication } = require("../middlewares/auth");

const { handleUserSignup, handleUserLogin } = require("../controllers/user");

//register route

router.post("/signup", handleUserSignup);

//login route
router.post("/login", handleUserLogin);
// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("uid"); // Clear the JWT token cookie
  res.status(200).json({ message: "Logout successful" });
});
router.get("/check", checkForAuthentication, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

module.exports = router;
