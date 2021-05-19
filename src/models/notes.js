/**
 * @module        models
 * @file          notes.js
 * @description   mongoose schema for notes
 * @requires      {@link http://mongoosejs.com/|mongoose}
 * @author        Dipesh Maywade <dipeshmaywade@gmail.com>
----------------------------------------------------------------------------------------------------*/

const mongoose = require('mongoose');
//strict for mongoDB
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
        unique: true,
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
    trash: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const notes = mongoose.model('notes', notesSchema);

module.exports = { notes };
