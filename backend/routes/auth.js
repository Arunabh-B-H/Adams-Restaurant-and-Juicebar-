const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'adams_restaurant_secret_2018';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: admin._id, email: admin.email, name: admin.name }, JWT_SECRET, { expiresIn: '7d' });
    
    admin.activeTokens.push(token);
    if (admin.activeTokens.length > 2) {
      admin.activeTokens = admin.activeTokens.slice(-2);
    }
    await admin.save();
    
    res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/logout
router.post('/logout', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (admin) {
      const token = req.headers.authorization?.split(' ')[1];
      admin.activeTokens = admin.activeTokens.filter(t => t !== token);
      await admin.save();
    }
    res.json({ message: 'Logged out successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
