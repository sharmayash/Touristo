let mongoose = require("mongoose");

// Schema Setup
let Transport = new mongoose.Schema({
  transportName: String
});

module.exports = mongoose.model("transports", Transport);
