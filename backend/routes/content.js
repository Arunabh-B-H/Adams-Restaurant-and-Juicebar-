const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const auth = require('../middleware/auth');

const defaults = {
  hero: { type: 'object', value: { heading: "Adams Restaurant & JuiceBar", subheading: "Fine Dining & Fresh Juices Since 2018", tagline: "Where Every Meal Tells a Story" } },
  about: { type: 'object', value: { title: "Our Story", body: "Founded in 2018, Adam's Restaurant & JuiceBar was born from a passion for authentic flavors and wholesome living. What started as a humble dream became a beloved culinary destination, serving the finest meals crafted from locally sourced ingredients alongside our signature fresh-pressed juices. Every dish we serve carries the warmth of home and the artistry of fine dining.", vision: "To nourish bodies, uplift spirits, and create memories around the table." } },
  founder: { type: 'object', value: { name: "Adam Okonkwo", title: "Founder & Executive Chef", bio: "Chef Adam Okonkwo brings over 15 years of culinary expertise from kitchens across West Africa and Europe. His philosophy is simple: great food starts with great ingredients and genuine love for the craft. In 2018, he opened Adam's Restaurant & JuiceBar to share that philosophy with his community.", quote: "Food is not just nourishment — it is an experience, a memory, a conversation.", imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600" } },
  contact: { type: 'object', value: { address: "12 Victoria Island Boulevard, Lagos, Nigeria", phone: "+234 801 234 5678", email: "hello@adamsrestaurant.com", hours: "Mon–Fri: 8am–10pm | Sat–Sun: 9am–11pm", mapEmbed: "" } },
  menuHighlights: { type: 'array', value: [ { name: "Signature Jollof Rice", description: "Slow-cooked in our secret tomato blend", price: "₦4,500", category: "Mains" }, { name: "Fresh Passion Juice", description: "Cold-pressed with ginger & mint", price: "₦1,800", category: "Juices" }, { name: "Pepper Soup", description: "Aromatic spiced broth with tender meat", price: "₦3,200", category: "Starters" }, { name: "Grilled Tilapia", description: "Charcoal-grilled with spiced butter & herbs", price: "₦6,000", category: "Mains" } ] }
};

// GET all content (public)
router.get('/', async (req, res) => {
  try {
    let items = await Content.find();
    if (items.length === 0) {
      const toInsert = Object.entries(defaults).map(([key, val]) => ({ key, ...val }));
      items = await Content.insertMany(toInsert);
    }
    const result = {};
    items.forEach(item => result[item.key] = item.value);
    res.json(result);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// PUT update content key (admin)
router.put('/:key', auth, async (req, res) => {
  try {
    const { value, type } = req.body;
    const item = await Content.findOneAndUpdate(
      { key: req.params.key },
      { value, type: type || 'text' },
      { new: true, upsert: true }
    );
    res.json(item);
  } catch { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
