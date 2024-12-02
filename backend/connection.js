require("dotenv").config();
const mongoose = require("mongoose");

async function connectToMongo(URI) {
  return mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => console.log("error", err));
}

module.exports = {
  connectToMongo,
};
