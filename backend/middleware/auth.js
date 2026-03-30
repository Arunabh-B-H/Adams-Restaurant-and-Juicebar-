const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const JWT_SECRET = process.env.JWT_SECRET || 'adams_restaurant_secret_2018';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin || !admin.activeTokens.includes(token)) {
      return res.status(401).json({ message: 'Token expired or session invalidated by newer login' });
    }
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
