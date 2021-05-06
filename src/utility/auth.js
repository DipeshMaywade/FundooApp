const jwt = require('jsonwebtoken');
const loggers = require('./logger');
require('dotenv').config();

class Authentication {
  checkAuth = (context) => {
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
      return null;
    }
    loggers.error(`error`, `header must be provided`);
    return null;
  };
}
module.exports = new Authentication();
