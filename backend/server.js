const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/enquiries", require("./routes/enquiries"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/content", require("./routes/content"));

// MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/adams_restaurant";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    // Seed admin
    const Admin = require("./models/Admin");
    const bcrypt = require("bcryptjs");
    const existing = await Admin.findOne({
      email: "admin@adamsrestaurant.com",
    });
    if (!existing) {
      const hash = await bcrypt.hash("Admin@2018", 10);
      await Admin.create({
        email: "admin@adamsrestaurant.com",
        password: hash,
        name: "Adam's Admin",
      });
      console.log(
        "✅ Default admin seeded: admin@adamsrestaurant.com / Admin@2018",
      );
    }
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
