const mongoose = require("mongoose");
require("dotenv").config();
// const mongoURL = "mongodb://localhost:27017/hotels"; (Local)
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Force SSL
});

const db = mongoose.connection;

// Define event listeners for the database connection
db.on("connected", () => {
  console.log("MongoDB connected successfully");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export the database connection
module.exports = db;
