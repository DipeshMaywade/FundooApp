const mongoose = require('mongoose');
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
        console.log('connected');
      })
      .on('error', (error) => {
        console.log(`Error is: ${error}`);
      });
  };
}

module.exports = new Connection();

// refactor
