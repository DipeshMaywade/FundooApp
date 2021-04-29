const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const logger = require("./logger");

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
    });
  };

  schema = joi.object({
    firstName: joi
      .string()
      .min(3)
      .max(10)
      .pattern(new RegExp("^[A-Z]{1}[a-z]{2,}$")),
    lastName: joi.string().pattern(new RegExp("^[A-Z]{1}[a-z]{2,}$")),
    email: joi
      .string()
      .email()
      .required()
      .pattern(new RegExp("^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$")),
    password: joi.string(),
  });

  jwtGenerator = (payload) => {
    return jwt.sign({ payload }, "verySecretValue", { expiresIn: "1h" });
  };

  forgetPass = (token, mail) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "dipeshmaywade@gmail.com",
        pass: "Radharam@123",
      },
    });
    let mailOption = {
      from: "dipeshmaywade@gmail.com",
      to: mail,
      subject: "Forget Password",
      text: `token for reset password is: ${token}`,
    };
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        logger.log(`error`, err);
      } else {
        logger, log(`info`, `email sent to ${info.response}`);
      }
    });
  };
}
module.exports = new Helper();
