const mongoose = require("mongoose");

module.exports = () => { mongoose.connect("mongodb://localhost/Fundoo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));
}