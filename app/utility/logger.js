const { createLogger, transports, format } = require("winston");
require("dotenv").config();

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "./log/info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "./log/error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console({
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
