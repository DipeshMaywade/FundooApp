const jwt = require('jsonwebtoken');
const loggers = require('./logger');
require('dotenv').config();

// const auth = async (req, res, next) => {
//   const token = req.headers.auth?.split(' ')[1] || '';
//   if (token) {
//     try {
//       const user = await jwt.verify(token, process.env.SECRET_KEY);
//       req.verifiedUser = user.payload;
//       console.log('success', user.payload);
//       next();
//     } catch (error) {
//       console.log('failed');
//       next();
//     }
//   } else {
//     console.log('formet wrong/orno token');
//   }
// };
// module.exports = { auth };

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
