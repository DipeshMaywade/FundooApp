var mongoose = require("mongoose");

var registration = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
        type: String,
        require: true,
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
    }
  }
);

module.exports = mongoose.model("registrationSchema", registration);
