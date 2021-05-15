const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const logger = require('./logger');

require('dotenv').config();

class Helper {
  /**
   * @method passEncrypt
   * @param {orignalPassword} password
   * @description For encrypt password before save or reset into database
   */
  passEncrypt = async (password) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashPass = await bcrypt.hash(password, salt);
      return hashPass;
    } catch (error) {
      logger.log('error', error);
    }
  };

  /**
   * @method comparePassword
   * @param storedPassword
   * @param givenPassword
   * @description For compare encrypted storedPassword with user provided givenPassword
   */
  comparePassword = async (givenPassword, storedPassword) => {
    let result = bcrypt.compare(givenPassword, storedPassword);
    return result;
  };

  /**
   * @description For validate the data which is provided by user for login or register or reset
   */
  validationSchema = joi.object({
    firstName: joi.string().pattern(new RegExp('^[A-Z]{1}[a-z]{2,}$')),
    lastName: joi.string().pattern(new RegExp('^[A-Z]{1}[a-z]{2,}$')),
    email: joi.string().email().pattern(new RegExp('^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$')),
    password: joi
      .string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]{1}).{8,}$')),
    newPassword: joi
      .string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]{1}).{8,}$')),
    confirmPassword: joi
      .string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]{1}).{8,}$')),
  });

  /**
   * @method jwtGenerator
   * @param {object} payload
   * @description jwtGenerator method for genrate a json web token with secret the help of SECRET_KEY.
   */
  jwtGenerator = (payload) => {
    try {
      return jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: '1h' });
    } catch (error) {
      logger.error('error', error);
    }
  };
}

module.exports = new Helper();
