const mongoose = require("mongoose");
const { passEncrypt } = require("../utility/helper");

const registration = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

passEncrypt(registration)

const userRegistration = mongoose.model("UserRegistration", registration);

module.exports = { userRegistration };
