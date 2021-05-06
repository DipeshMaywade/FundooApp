const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'userRegistration',
      require: true,
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
