const mongoose = require("mongoose");

const StopWatchSchema = new mongoose.Schema({
  focusTime: {
    type: Number, // seconds me store hoga
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Stopwatch", StopWatchSchema);
