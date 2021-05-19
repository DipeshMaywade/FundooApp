/**
 * @module        models
 * @file          user.js
 * @description   mongoose schema for users
 * @requires      {@link http://mongoosejs.com/|mongoose}
 * @author        Dipesh Maywade <dipeshmaywade@gmail.com>
----------------------------------------------------------------------------------------------------*/

const mongoose = require('mongoose');

const registration = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      match: [/^[A-Z]{1}[a-z]{2,}$/, 'please enter valid Name'],
    },
    lastName: {
      type: String,
      require: true,
      match: [/^[A-Z]{1}[a-z]{2,}$/, 'please enter valid Name'],
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/, 'please enter valid email'],
    },
    imageUrl: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const userRegistration = mongoose.model('UserRegistration', registration);

module.exports = { userRegistration };
