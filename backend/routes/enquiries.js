const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const auth = require('../middleware/auth');

// POST new enquiry (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const enquiry = await Enquiry.create({ name, email, phone, subject, message });
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// GET all enquiries (admin)
router.get('/', auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// PUT update status (admin)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(enquiry);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// DELETE enquiry (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Enquiry deleted' });
  } catch { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
