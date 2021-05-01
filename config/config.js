const mongoose = require('mongoose');
const logger = require('../src/utility/logger');
require('dotenv').config();

module.exports = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => logger.log('info', 'connection successful'))
    .catch((err) => ('error', err));
};
