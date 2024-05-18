const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  filename: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pdf', pdfSchema);
