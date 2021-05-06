const mongoose = require('mongoose');
const labelSchema = new mongoose.Schema(
  {
    notesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'notes',
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
