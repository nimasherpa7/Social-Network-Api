const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get("/", (req, res) => {
  res.send("New API!");
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/usersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));