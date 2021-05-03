const jwt = require('jsonwebtoken');
const loggers = require('./logger');
require('dotenv').config();

module.exports = (context) => {
  const authHeader = context.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (error) {
        loggers.error(`error`, error);
      }
    }
    loggers.error(`error`, `wrong Header forment`);
  }
  loggers.error(`error`, `please enter valid header`);
};
// use es6 class
