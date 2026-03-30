const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'responded'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', EnquirySchema);
