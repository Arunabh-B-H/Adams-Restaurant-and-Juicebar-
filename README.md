# 🍽️ Adam's Restaurant & JuiceBar — Full-Stack MERN Website

A classy, industry-standard restaurant website with a full admin panel, built with the MERN stack (MongoDB, Express, React, Node.js).

---

## ✨ Features

### Public Website
- **Hero Section** — Full-screen landing with background image, animated text, CTA buttons
- **About Section** — Story, stats, vision statement
- **Founder Section** — Photo, biography, quote, "Since 2018" badge
- **Gallery** — Masonry layout with category filters (Food, Drinks, Ambience, Events) + lightbox
- **Menu Highlights** — Elegant menu grid with pricing
- **Reviews** — Public Add / Edit / Delete reviews with star ratings; shows admin replies
- **Enquiry Form** — Full contact form with subject selection (Reservation, Event, Catering, etc.)
- **Footer** — Links, contact info, hours

### Admin Panel (`/admin`)
- **Login** — Secure JWT authentication
- **Dashboard Overview** — Stats (reviews, enquiries, gallery items)
- **Site Content Editor** — Edit Hero, About, Founder, Contact info — all without touching code
- **Gallery Manager** — Add / Edit / Delete photos with image URL or upload support
- **Enquiries** — View all submissions, mark as New/Read/Responded, delete
- **Reviews Manager** — Approve/hide reviews, reply to any review, delete

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router 6, Axios, Framer Motion, react-hot-toast, react-icons |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| File Upload | Multer |
| Fonts | Cormorant Garamond + Jost (Google Fonts) |
| Design | Custom CSS-in-JS, dark luxury aesthetic (gold & dark brown) |

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally OR MongoDB Atlas URI

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend** — copy `.env.example` to `.env`:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/adams_restaurant
JWT_SECRET=your_super_secret_key_here
```

**Frontend** — copy `.env.example` to `.env`:
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Run the App

**Terminal 1 — Start Backend:**
```bash
cd backend
npm run dev
```
Server starts on http://localhost:5000

**Terminal 2 — Start Frontend:**
```bash
cd frontend
npm start
```
App opens at http://localhost:3000

---

## 🔐 Default Admin Credentials

```
Email:    admin@adamsrestaurant.com
Password: Admin@2018
```

These are seeded automatically on first run. Change them in MongoDB after setup.

---

## 📁 Project Structure

```
adams-restaurant/
├── backend/
│   ├── models/
│   │   ├── Admin.js         # Admin user schema
│   │   ├── Review.js        # Guest reviews + admin replies
│   │   ├── Enquiry.js       # Contact form submissions
│   │   ├── Gallery.js       # Photo gallery items
│   │   └── Content.js       # Editable site content (key-value)
│   ├── routes/
│   │   ├── auth.js          # Login, /me
│   │   ├── reviews.js       # CRUD + admin reply + approve
│   │   ├── enquiries.js     # CRUD + status management
│   │   ├── gallery.js       # CRUD + image upload
│   │   └── content.js       # Editable content GET/PUT
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── uploads/             # Uploaded images (auto-created)
│   ├── server.js            # Express app entry point
│   └── .env.example
│
└── frontend/
    └── src/
        ├── pages/
        │   ├── Home.jsx         # Main public page
        │   ├── AdminLogin.jsx   # Admin sign-in
        │   └── AdminDashboard.jsx # Full admin panel
        ├── components/
        │   ├── Navbar.jsx       # Fixed responsive navbar
        │   ├── HeroSection.jsx  # Full-screen hero
        │   ├── AboutSection.jsx # Story + stats
        │   ├── FounderSection.jsx # Founder bio + photo
        │   ├── GallerySection.jsx # Masonry gallery + lightbox
        │   ├── MenuSection.jsx  # Menu highlights
        │   ├── ReviewsSection.jsx # Reviews with add/edit/delete
        │   ├── ContactSection.jsx # Enquiry form + contact info
        │   └── Footer.jsx       # Site footer
        ├── context/
        │   └── AuthContext.jsx  # Admin auth context
        ├── api.js               # Axios instance with auth headers
        └── App.jsx              # Routes + Toaster
```

---

## 🌐 API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/content` | Get all editable site content |
| GET | `/api/gallery` | Get all gallery items |
| GET | `/api/reviews` | Get approved reviews |
| POST | `/api/reviews` | Submit new review |
| PUT | `/api/reviews/:id` | Edit review |
| DELETE | `/api/reviews/:id` | Delete review |
| POST | `/api/enquiries` | Submit enquiry |
| POST | `/api/auth/login` | Admin login |

### Admin (JWT required)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reviews/all` | All reviews (incl. hidden) |
| POST | `/api/reviews/:id/reply` | Post admin reply |
| PUT | `/api/reviews/:id/approve` | Toggle review visibility |
| GET | `/api/enquiries` | All enquiries |
| PUT | `/api/enquiries/:id/status` | Update enquiry status |
| DELETE | `/api/enquiries/:id` | Delete enquiry |
| POST | `/api/gallery` | Add gallery item |
| PUT | `/api/gallery/:id` | Edit gallery item |
| DELETE | `/api/gallery/:id` | Delete gallery item |
| PUT | `/api/content/:key` | Update site content |

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--gold` | `#c9a84c` | Primary accent |
| `--gold-light` | `#e8c97a` | Hover states |
| `--cream` | `#fdf8f0` | Body text |
| `--dark` | `#0e0600` | Primary background |
| `--dark2` | `#1a0e04` | Alternate sections |
| Serif font | Cormorant Garamond | Headings, display |
| Sans font | Jost | Body, labels, UI |

---

## 🚀 Deployment

### Backend (e.g. Railway, Render, Heroku)
1. Set environment variables on the platform
2. Set `MONGO_URI` to your MongoDB Atlas connection string
3. Deploy the `/backend` folder

### Frontend (e.g. Vercel, Netlify)
1. Set `REACT_APP_API_URL` to your deployed backend URL
2. Run `npm run build` and deploy the `/frontend` folder

---

*Adam's Restaurant & JuiceBar — Est. 2018*
