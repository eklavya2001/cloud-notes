require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5000;
const cors = require("cors");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");
const cookieParser = require("cookie-parser");
const { checkForAuthentication } = require("./middlewares/auth");
const mongourl = process.env.MONGO_URI;

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const { connectToMongo } = require("./connection");
connectToMongo(mongourl);

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/notes", checkForAuthentication, noteRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
