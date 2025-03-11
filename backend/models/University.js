const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name: String,
  country: String,
  state_province: String,
  web_pages: [String],
});

const University = mongoose.model("University", universitySchema);
module.exports = University;
