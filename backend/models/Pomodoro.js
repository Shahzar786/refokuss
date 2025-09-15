const mongoose = require("mongoose");

const PomodoroSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,   // Kaunsa task padha (DSA, Web Dev, AI, etc.)
    trim: true,
  },
  minutesFocused: {
    type: Number,
    required: true,   // Kitne minutes focus hua
  },
  date: {
    type: Date,
    default: Date.now, // Session kab hua
  },
  
});

module.exports = mongoose.model("Pomodoro", PomodoroSchema);
