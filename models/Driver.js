let mongoose = require("mongoose");

// Schema Setup
let Driver = new mongoose.Schema({
  name: String,
  contactNo: Number,
  email: String,
  licenceNo: String,
  dob: String
});

module.exports = mongoose.model("drivers", Driver);
