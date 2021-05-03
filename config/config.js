const mongoose = require('mongoose');
const logger = require('../src/utility/logger');
require('dotenv').config();

class Connection {
  fundooConnection = () => {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    mongoose.connection
      .once('open', () => {
        console.log('conneted');
      })
      .on('error', (error) => {
        console.log(`Error is: ${error}`);
      });
  };
}

module.exports = new Connection();
//ejs part
