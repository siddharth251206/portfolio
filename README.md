<div align="center">

# ✦ Siddharth Sheth — Portfolio

A modern, animated developer portfolio built with **React + Vite**, featuring glassmorphism design, a custom liquid-glass cursor, smooth Framer Motion animations, and a built-in local CMS for live content editing.

**[🔗 Live Site](https://siddharth-sheth.vercel.app/)** · **[📄 Resume](https://siddharth-sheth.vercel.app/Siddharth_Sheth_resume.pdf)**

</div>

---

## ⚡ Highlights

- 🎨 **Premium Glassmorphism UI** — Transparent cards, backdrop blur, layered gradients, and torn-paper section dividers
- 🖱️ **Liquid Glass Cursor** — Custom SVG displacement-mapped cursor with spring-damper physics, hover states, and click ripples
- ✨ **Framer Motion Animations** — Staggered word drops, scroll-triggered reveals, spring-loaded card hovers, and floating particles
- 🌓 **Light / Dark Mode** — Full theme system with curated palettes for both modes
- 📱 **Fully Responsive** — Mobile-first layout with adaptive hero, grid breakpoints, and touch-friendly navigation
- 🛠️ **Built-in Admin CMS** — Local-only dashboard to manage all content (hero, about, skills, projects) with drag-and-drop project reordering
- 📊 **Privacy-Conscious View Counter** — Anonymous session-based analytics via CounterAPI
- 📝 **Markdown Project Pages** — Rich case-study detail pages with image galleries (Swiper), tech badges, and sticky sidebars

---

## 🖼️ Sections

| Section | Description |
|---------|-------------|
| **Hero** | Animated intro with staggered text drop, sweep animation, glowing profile image, and CTA buttons |
| **About** | Glassmorphic bio card with floating tags, detailed paragraphs, and a chronological achievements timeline |
| **Skills** | 4-column glassmorphic grid with Lucide icons, hover effects, and categorized skill lists |
| **Projects** | Spotlight hero cards with neon conic-gradient borders + responsive grid for regular projects |
| **Contact** | EmailJS-powered contact form with floating labels, social links (GitHub, LinkedIn, Instagram) |

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | React 19, Vite 7, React Router 7 |
| **Styling** | Tailwind CSS 4, custom CSS utilities, glassmorphism design tokens |
| **Animation** | Framer Motion, custom CSS keyframes |
| **UI Components** | Lucide React icons, Swiper.js (gallery), React Markdown, Radix UI Toast |
| **Contact** | EmailJS |
| **Admin** | DnD Kit (drag-and-drop), custom Vite plugin for JSON persistence |
| **Deployment** | Vercel (SPA rewrites configured) |
| **Assets** | Cloudinary (image hosting), custom fonts (SpecialElite, Amsterdam Handwriting) |

---

## 📂 Project Structure

```
portfolio/
├── public/
│   ├── sid.png                   # Hero profile image
│   ├── torn.png                  # Section divider overlay
│   └── favicon.svg
├── src/
│   ├── animations/
│   │   └── reveal.js             # Scroll-triggered animation variants
│   ├── assets/
│   │   └── portfolioData.json    # All portfolio content (CMS data source)
│   ├── components/
│   │   ├── Hero.jsx              # Animated hero with image shift
│   │   ├── About.jsx             # Bio, tags, achievements timeline
│   │   ├── Skills.jsx            # Glassmorphic skill grid
│   │   ├── ProjectsSection.jsx   # Spotlight + regular project cards
│   │   ├── ProjectCard.jsx       # Reusable project card
│   │   ├── Footer.jsx            # Contact form + social links
│   │   ├── Navbar.jsx            # Navigation bar with theme toggle
│   │   ├── CustomCursor.jsx      # Liquid glass cursor system
│   │   ├── FloatingParticle.jsx  # Ambient particle effects
│   │   ├── SectionParticles.jsx  # Per-section particle wrapper
│   │   ├── TornOverlay.jsx       # Paper tear section divider
│   │   └── admin/
│   │       └── SortableProjectItem.jsx
│   ├── context/
│   │   └── PortfolioContext.jsx   # Global state + CMS save logic
│   ├── pages/
│   │   ├── Home.jsx              # Main page composition
│   │   ├── Admin.jsx             # Local CMS dashboard
│   │   ├── ProjectDetail.jsx     # Full case-study page with gallery
│   │   └── NotFound.jsx          # 404 page
│   ├── cursor.css                # Custom cursor styles
│   ├── index.css                 # Design system, themes, animations
│   ├── main.jsx                  # App entry point
│   └── App.jsx                   # Router + cursor wrapper
├── vite.config.js                # Vite + Tailwind + save-portfolio plugin
├── vercel.json                   # SPA rewrite rules
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repo
git clone https://github.com/siddharth251206/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Admin Panel

Navigate to `/admin` and log in to edit portfolio content. Changes are saved directly to `portfolioData.json` via a custom Vite dev server plugin — no external database needed.

> **Note:** Content editing via the admin panel only works in development mode (`npm run dev`). The production build serves static data.

### Build for Production

```bash
npm run build
npm run preview    # Preview the production build locally
```

---

## 🌐 Deployment

The portfolio is deployed on **Vercel** with SPA routing configured via `vercel.json`. Simply connect the repo to Vercel and it auto-deploys on push.

---

## 📬 Contact

- **GitHub** — [@siddharth251206](https://github.com/siddharth251206)
- **LinkedIn** — [Siddharth Sheth](https://www.linkedin.com/in/siddharth-sheth-007873319)
- **Instagram** — [@sidhu_251206](https://instagram.com/sidhu_251206)

---

<div align="center">

**Built with ♡ by Siddharth Sheth**

</div>
