const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userRegistration',
      require: true,
    },
    labelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'labels',
      default: null,
    },
    title: {
      type: String,
      require: true,
    },
    notes: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const notes = mongoose.model('notes', notesSchema);

module.exports = { notes };
