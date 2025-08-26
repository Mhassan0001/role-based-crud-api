let mongoose = require("mongoose");
require("dotenv").config();

let uri = process.env.MonogoUri;

let db = () => {
  return mongoose.connect(uri);
};

module.exports = db;
