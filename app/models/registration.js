const mongoose = require("mongoose");

const registration = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    match: [/^[A-Z]{1}[a-z]{2,}$/, "please enter valid Name"],
  },
  lastName: {
    type: String,
    require: true,
    match: [/^[A-Z]{1}[a-z]{2,}$/, "please enter valid Name"],
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match: [
      /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/,
      "please enter valid email",
    ],
  },
});

const bcrypt = require("bcrypt");

registration.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(this.password, salt);
    this.password = hashPass;
    next();
  } catch (error) {
    next(error);
  }
});

const registrationSchema = mongoose.model("registrationSchema", registration);

module.exports = { registrationSchema };
