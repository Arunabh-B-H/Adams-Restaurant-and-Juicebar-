const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'adams_restaurant_secret_2018';

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
