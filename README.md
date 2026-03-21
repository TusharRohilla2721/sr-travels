# SR Travels — React Web App

A premium travel website for SR Travels built with React + Vite + GSAP + Supabase.

---

## 🚀 Quick Start (Local Dev)

### 1. Prerequisites
- Node.js 18+ installed → https://nodejs.org
- A Supabase account → https://supabase.com

### 2. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/sr-travels.git
cd sr-travels
npm install
```

### 3. Environment Variables
```bash
cp .env.example .env
```
Open `.env` and fill in:
- `VITE_SUPABASE_URL` — from Supabase → Settings → API
- `VITE_SUPABASE_ANON_KEY` — from Supabase → Settings → API
- `VITE_WHATSAPP_NUMBER` — your WhatsApp Business number (digits only)

### 4. Supabase Database Setup
Run this SQL in Supabase → SQL Editor:

```sql
-- Travel routes (for Destinations page)
create table travel_routes (
  id          bigint primary key generated always as identity,
  from_city   text not null,
  to_city     text not null,
  kilometers  int,
  price_7seater      int,
  price_12seater     int,
  price_16_urbania   int,
  price_20seater     int,
  price_26seater     int,
  price_42seater     int,
  created_at  timestamptz default now()
);

-- Testimonials / feedback
create table testimonials (
  id           bigint primary key generated always as identity,
  name         text,
  city         text,
  state        text,
  from_city    text,
  to_city      text,
  journey_date date,
  feedback     text,
  approved     boolean not null default false,
  rejected     boolean not null default false,
  approved_at  timestamptz,
  created_at   timestamptz default now()
);

-- Contact enquiries
create table contact_inquiries (
  id         bigint primary key generated always as identity,
  name       text,
  phone      text,
  message    text,
  created_at timestamptz default now()
);

-- Index for fast approved-only queries
create index idx_testimonials_approved on testimonials(approved);

-- Enable Row Level Security (public read for approved testimonials)
alter table testimonials enable row level security;
alter table travel_routes enable row level security;
alter table contact_inquiries enable row level security;

-- Allow anyone to read approved testimonials
create policy "Public read approved testimonials"
  on testimonials for select
  using (approved = true);

-- Allow anyone to read travel routes
create policy "Public read travel routes"
  on travel_routes for select
  using (true);

-- Allow anyone to insert feedback
create policy "Public insert testimonials"
  on testimonials for insert
  with check (true);

-- Allow anyone to insert contact enquiries
create policy "Public insert contacts"
  on contact_inquiries for insert
  with check (true);
```

### 5. Run Dev Server
```bash
npm run dev
```
Open http://localhost:5173

---

## 📦 Build for Production (GoDaddy / Antigravity)

```bash
npm run build
```
This creates a `dist/` folder. Upload the **contents of `dist/`** to your GoDaddy hosting root (public_html).

### Important: Add this `.htaccess` to your hosting root for React Router to work:
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🗂 Project Structure
```
src/
├── lib/
│   └── supabase.js          # Supabase client
├── styles/
│   └── global.css           # CSS variables, reset, shared styles
├── hooks/
│   └── useTheme.js          # Theme cycling logic
├── components/
│   ├── Cursor.jsx
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Marquee.jsx
│   ├── AboutCompany.jsx
│   ├── AboutDeck.jsx        # Sunder & Tushar flashcard decks
│   ├── Galleria.jsx
│   ├── WhyChooseUs.jsx
│   ├── Stats.jsx
│   ├── Testimonials.jsx
│   ├── FeedbackModal.jsx
│   ├── ExploreCTA.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx             # Landing page
│   └── Destinations.jsx     # Route estimator page
├── App.jsx
└── main.jsx
```

---

## 🌐 GitHub Setup (First Time)
```bash
git init
git add .
git commit -m "Initial commit — SR Travels"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sr-travels.git
git push -u origin main
```

---

## ✅ Supabase: Approving Reviews
1. Open Supabase → Table Editor → `testimonials`
2. Find a review with `approved = false`
3. Click the cell → toggle to `true`
4. The review appears live on the site instantly

---

## ⚠️ Replace Before Going Live
| File | Variable | What to put |
|------|----------|-------------|
| `.env` | `VITE_WHATSAPP_NUMBER` | Your real WhatsApp number |
| All `*.jsx` image srcs | Unsplash URLs | Your actual photos |
| `Footer.jsx` | Phone/email | Real contact details |
