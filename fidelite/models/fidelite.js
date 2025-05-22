const mongoose = require('mongoose');

const FideliteSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Fidelite', FideliteSchema);
