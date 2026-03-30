const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  category: { type: String, enum: ['food', 'ambience', 'drinks', 'events'], default: 'food' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);
