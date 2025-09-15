const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,   // Title compulsory hai
    trim: true        // Extra spaces remove karega
  },
  details: {
    type: String,
    required: true,   // Details bhi compulsory hai
  },
  createdAt: {
    type: Date,
    default: Date.now // Auto save creation date
  }
});

module.exports = mongoose.model("Note", NotesSchema);
