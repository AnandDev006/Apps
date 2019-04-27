const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const NoteSchema = new Schema({
  userID: {
    type: String,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

// Create model
const Note = mongoose.model('note', NoteSchema);

// Export the model
module.exports = Note;
