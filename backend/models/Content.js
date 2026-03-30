const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  type: { type: String, enum: ['text', 'object', 'array'], default: 'text' }
}, { timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);
