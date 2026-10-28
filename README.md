# You Aspirant — Career DNA & FuturePath

> **"Your Potential Has a Direction."**  
> Discover your strengths. Explore your possibilities. Build your future.

You Aspirant is a modern, responsive, production-minded educational and career guidance web application. It combines an exploratory **Career DNA assessment**, deterministic **recommendation engine**, structured **FuturePath roadmap builder**, interactive **Skill Gap Map**, **student dashboard**, **student lead-generation system**, and **company administration portal**.

---

## 🌟 Key Features

### 1. Career DNA Assessment & Recommendation Engine
- **15 Structured Questions** covering 8 distinct cognitive dimensions: Interests, Preferred Activities, Problem-Solving, Creative Preferences, Analytical Rigor, Collaboration, Learning Styles, and Career Goals.
- **Transparent Scoring Engine**: Deterministically calculates interest profiles across 6 dimensions:
  - Technology & Logical Thinking
  - Creativity & Visual Design
  - Data & Analytical Rigor
  - Communication & People
  - Business & Leadership
  - Engineering & Systems
- **Explainable Matches**: Delivers top 3 primary career recommendations and 2 alternative paths with natural language rationales explaining *why* the student matched.
- **Inferred Learning Style Preference**: Identifies whether the student prefers project-based, structured, visual, or collaborative learning.

### 2. FuturePath Roadmap Builder
- **8 Pre-Configured Career Roadmaps**:
  - Frontend Developer
  - Full-Stack Developer
  - UI/UX Designer
  - Data Analyst
  - Digital Marketer
  - Business Analyst
  - Software Tester
  - Cloud & DevOps Beginner Path
- **Milestone Progress Tracking**: Dynamic completion calculation, personal revision notes per milestone, and clear highlighting of the next recommended stage.

### 3. Interactive Skill Gap Map
- Compares a student's self-reported proficiency across 4 tiers: *Not Started*, *Beginner*, *Familiar*, and *Comfortable*.
- Highlights foundational strengths and identifies the next priority skills to develop.

### 4. Student Lead Generation & Guidance Requests
- Comprehensive contact and counselling form with input validation, duplicate submission protection, and privacy consent checks.
- Pre-fills assessment references and career interests directly from results.

### 5. Student Dashboard
- Welcome overview, Career DNA score summary, active FuturePath progress bar, next milestone spotlight, skill gap summary, saved careers list, and enquiry tracking.

### 6. Company Administration Portal (`/admin/dashboard`)
- Real-time operational metrics calculated from actual stored records.
- **Lead Management** (`/admin/leads`): Search by student name/email, filter by status (*New*, *Contacted*, *In Progress*, *Resolved*), update milestones, and log internal advisory notes.
- **Content Management** (`/admin/content`): Create, edit, publish, or unpublish career profiles.
- **Testimonial Management** (`/admin/testimonials`): Verify, publish, edit, or delete student testimonials.

---

## 🎨 Design System & Signature Atmosphere

- **Theme**: Premium Light-Themed Interface.
- **Color Palette**:
  - Milk White: `#FFFCF7` (Main page background)
  - Pure White: `#FFFFFF` (Cards & modals)
  - Deep Plum: `#542744` (Headings, primary controls, brand)
  - Secondary Plum: `#754565` & Pale Plum: `#F5EDF3`
  - Golden Orange: `#F4A340` (Accents, sparks, progress highlights)
  - Soft Amber: `#FFD49A` & Warm Glow: `#FFE7C7`
- **Typography**:
  - Headings: **Manrope**
  - Body: **Inter**
- **Signature Background Atmosphere**:
  - Translucent organic mist slowly drifting horizontally and diagonally.
  - Golden sparkle particles gently floating upward and sideways.
  - Subtle amber ambient glow behind hero elements.
  - Zero pointer-events interference and full WCAG reduced-motion preference support.

---

## 💾 Database & Storage Architecture

- **Supabase & PostgreSQL Ready**: Complete database schema and migration script with all 16 tables, foreign keys, indexes, and Row Level Security (RLS) policies located in `supabase/schema.sql`.
- **Persistent Local Demo Mode**: When running without Supabase credentials, the application operates in an explicitly separated local demo mode backed by `localStorage`, complete with pre-seeded data, responsive admin lead updates, and a discrete development-mode status pill.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build & Preview
```bash
npm run build
npm run preview
```

### 4. Run Automated Verification Tests
```bash
node scripts/verify-engine.js
```

### 5. Connect Supabase (Optional)
Copy `.env.example` to `.env` and configure your Supabase public credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```
Execute `supabase/schema.sql` in your Supabase SQL editor to initialize tables and RLS policies.
