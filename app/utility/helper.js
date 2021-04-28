const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");

class Helper {

  passEncrypt = (registration) => {
    registration.pre("save", async function (next) {
      try {
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(this.password, salt);
        this.password = hashPass;
        next();
      } catch (error) {
        next(error);
      }
    })
  };

  schema = joi.object({
    firstName: joi
      .string()
      .min(3)
      .max(10)
      .pattern(new RegExp("^[A-Z]{1}[a-z]{2,}$")),
    lastName: joi.string().pattern(new RegExp("^[A-Z]{1}[a-z]{2,}$")),
    email: joi.string().email().required().pattern(new RegExp("^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$")),
    password: joi.string().required()
  });

  jwtGenerator = (user) => {
    return jwt.sign({ name: user.email }, 'verySecretValue', { expiresIn: '1h' })
  }

}
module.exports = new Helper();
