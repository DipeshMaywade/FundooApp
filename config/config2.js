const mongoose = require('mongoose');
require('dotenv').config();

let kuchBhi = () => {
  function MongoDBAdapter(uri, options) {
    this.uri = uri;
    this.options = options;
  }

  let fundooConnection = new MongoDBAdapter(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  mongoose.connect(fundooConnection.uri, fundooConnection.options);
  mongoose.connection
    .once('open', () => {
      console.log('connected');
    })
    .on('error', (error) => {
      console.log(`Error is: ${error}`);
    });
};

module.exports = { kuchBhi };
