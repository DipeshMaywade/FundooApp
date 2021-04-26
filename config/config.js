const mongoose = require("mongoose");
require("dotenv").config();


module.exports = () => { mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));
}