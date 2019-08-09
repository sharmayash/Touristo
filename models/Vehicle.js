let mongoose = require("mongoose");

// Schema Setup
let Vehicle = new mongoose.Schema({
  vehicleType: String,
  name: String,
  number: String
});

module.exports = mongoose.model("vehicles", Vehicle);
