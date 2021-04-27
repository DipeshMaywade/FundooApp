const bcrypt = require("bcrypt");
const joi = require("joi");

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
      .pattern(new RegExp("^[A-Z]{1}[a-z]{2,}$"))
      .required(),
    lastName: joi.string().required().pattern(new RegExp("^[A-Z]{1}[a-z]{2,}$")),
    email: joi.string().email().required(),
    password: joi.string().required()
  });

}

module.exports = new Helper();
