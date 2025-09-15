const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,   // Event ka naam compulsory
    trim: true
  },
  date: {
    type: Date,
    required: true    // Date bhi compulsory
  },
  createdAt: {
    type: Date,
    default: Date.now // Event banne ka time
  }
});

module.exports = mongoose.model("Calendar", CalendarSchema);
