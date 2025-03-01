const User = require("../models/user");
const bcrypt = require("bcryptjs");
const CryptoJs = require("crypto-js");
const { setUser } = require("../service/auth");
require("dotenv").config();

const cryptoSecret = process.env.CRYPTOJS_SECRET;
async function handleUserSignup(req, res) {
  const { email, password: encryptedPassword } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: " already registered!" });
  }
  const bytes = CryptoJs.AES.decrypt(encryptedPassword, cryptoSecret);
  const Password = bytes.toString(CryptoJs.enc.Utf8);
  const hashedPassword = await bcrypt.hash(Password, 10);
  await User.create({
    email,
    password: hashedPassword,
  });
  res.status(201).json({ message: "user registered" });
}

async function handleUserLogin(req, res) {
  const { email, password: encryptedPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const bytes = CryptoJs.AES.decrypt(encryptedPassword, cryptoSecret);
  const Password = bytes.toString(CryptoJs.enc.Utf8);
  const check = await bcrypt.compare(Password, user.password);
  if (!check) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = setUser(user);
  console.log("Cookie set at:", new Date().toISOString());
  res.cookie("uid", token, {
    httpOnly: true,
    secure: true, // Secure flag for HTTPS
    sameSite: "None",
  });

  return res.status(200).json({ message: "login successful" });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
