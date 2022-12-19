const mongoose = require("mongoose");
require("dotenv").config();

let connectDB = async (req, res, next) =>{
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  console.log("Connected to DB")
  next();
}

module.exports = {
  connectDB
}