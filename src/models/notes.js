/**
 * @module        models
 * @file          notes.js
 * @description   mongoose schema for notes
 * @requires      {@link http://mongoosejs.com/|mongoose}
 * @author        Dipesh Maywade <dipeshmaywade@gmail.com>
----------------------------------------------------------------------------------------------------*/

const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userRegistration',
      require: true,
    },
    labelId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'labels',
      },
    ],
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const notes = mongoose.model('notes', notesSchema);

module.exports = { notes };
