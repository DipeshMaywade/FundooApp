const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userRegistration',
      require: true,
    },
    label: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const labels = mongoose.model('labels', labelSchema);

module.exports = { labels };
