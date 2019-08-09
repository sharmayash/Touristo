let mongoose = require("mongoose");

// Schema Setup
let Company = new mongoose.Schema({
  name: String,
  founderName: String,
  email: String,
  contactNo: Number,
  gstin: String,
  logo: String
});

module.exports = mongoose.model("companies", Company);
