const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  name: String,
  country: String,
  state_province: String,
  web_pages: [String],
});

const Favourite = mongoose.model("Favourite", favouriteSchema);
module.exports = Favourite;
