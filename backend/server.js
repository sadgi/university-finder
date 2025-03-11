const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const universityRoutes = require("./routes/universityRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/universities", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to " + "universities");
});
mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

app.use(universityRoutes);
app.use(favouriteRoutes);

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});
