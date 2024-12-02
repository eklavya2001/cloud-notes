const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
    },
    jwtSecret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
