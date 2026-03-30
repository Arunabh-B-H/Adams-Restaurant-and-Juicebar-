const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// GET all approved reviews (public)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// GET all reviews (admin)
router.get('/all', auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// POST new review (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, rating, comment } = req.body;
    const review = await Review.create({ name, email, rating, comment });
    res.status(201).json(review);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// PUT edit review (public or admin)
router.put('/:id', async (req, res) => {
  try {
    const { name, email, rating, comment } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { name, email, rating, comment }, { new: true });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// DELETE review (public or admin)
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// POST admin reply
router.post('/:id/reply', auth, async (req, res) => {
  try {
    const { reply } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { adminReply: reply, repliedAt: new Date() },
      { new: true }
    );
    res.json(review);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

// PUT toggle approval
router.put('/:id/approve', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    review.approved = !review.approved;
    await review.save();
    res.json(review);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
