const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "_")}`),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// GET all gallery items (public)
router.get("/", async (req, res) => {
  try {
    const items = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new gallery item (admin)
// router.post('/', auth, upload.single('image'), async (req, res) => {
//   try {
//     const { title, description, category, order } = req.body;
//     let imageUrl = req.body.imageUrl;
//     if (req.file) imageUrl = `/uploads/${req.file.filename}`;
//     const item = await Gallery.create({ title, description, imageUrl, category, order: order || 0 });
//     res.status(201).json(item);
//   } catch (err) { res.status(400).json({ message: err.message }); }
// });

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, order } = req.body;

    // 1. Determine the path.
    // If a file was uploaded from the device, use that.
    // Otherwise, check if a URL string was provided.
    let imageUrl = "";

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    }

    // 2. Manual check before hitting Mongoose to give a clear error
    if (!imageUrl) {
      return res
        .status(400)
        .json({ message: "Please upload an image or provide a URL" });
    }

    const item = await Gallery.create({
      title,
      description,
      imageUrl, // This satisfies the 'required: true' in your schema
      category,
      order: order || 0,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// PUT update gallery item (admin)
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, order } = req.body;
    const update = { title, description, category, order };
    if (req.file) update.imageUrl = `/uploads/${req.file.filename}`;
    else if (req.body.imageUrl) update.imageUrl = req.body.imageUrl;
    const item = await Gallery.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE gallery item (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
