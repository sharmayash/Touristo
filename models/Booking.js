let mongoose = require("mongoose");

// Schema Setup
let Booking = new mongoose.Schema({
  customerName: String,
  customerNo: Number,
  address: String,
  details: String,
  bookie: String,
  bookiePhNo: Number,
  driverName: String,
  vehicleName: String,
  rate: Number,
  meterReading1: Number,
  meterReading2: Number,
  totalReading: Number,
  departureDate: String,
  departureTime: String,
  arrivalDate: String,
  arrivalTime: String,
  days: Number,
  night: Number,
  totalAmount: Number,
  advance: Number,
  balance: Number
});

module.exports = mongoose.model("bookings", Booking);
