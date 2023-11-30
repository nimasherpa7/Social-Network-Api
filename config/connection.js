const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/usersDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (err) => {
  consoler.error("MongoDB connection error", err);
});

db.once("open", () => {
  console.log("MongoDB connected");
});

module.exports = db;