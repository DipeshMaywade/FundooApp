const mongoose = require("mongoose");
const logger = require("../app/utility/logger");
require("dotenv").config();

module.exports = () => {
  mongoose
    .connect(process.env.DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => logger.log("info", "connection successful"))
    .catch((err) => logger.log("error", err));
};
