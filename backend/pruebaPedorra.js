const mongoose = require("mongoose");
require('dotenv').config();

console.log("USER:", process.env.MONGUSER);
console.log("PASS:", process.env.MONGPASS);
console.log("DB:", process.env.MONGDB);

const mongoUrl = `mongodb+srv://${process.env.MONGUSER}:${process.env.MONGPASS}@cluster0.mongodb.net/${process.env.MONGDB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
