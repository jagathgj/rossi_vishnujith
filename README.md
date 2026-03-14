# Rossi Vishnujith | V46 — Official Website

> **Born to Ride. Built to Race.**

Official website of **Rossi Vishnujith (V46)** — professional motorcycle racer, stunter, and founder of **Rossi Moto Works**. Built with React 19, TypeScript, Tailwind CSS v4, and modern web technologies.

[![Live Site](https://img.shields.io/badge/Live-rossivishnujith.com-E8FF00?style=for-the-badge)](https://rossivishnujith.com)
[![Instagram](https://img.shields.io/badge/Instagram-@rossi__xrz-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/rossi_xrz)

---

## 🏍️ About

This is the official digital presence for Rossi Vishnujith, showcasing:

- **Professional Racing & Stunt Portfolio** — Gallery, events, and achievements
- **Rossi Moto Works** — Premium motorcycle workshop services
- **Booking System** — For stunt shows, race events, and brand collaborations
- **Dynamic Event Management** — JSON-based event listings
- **Contact & Workshop Information** — Location, services, and contact details

---

## ✨ Features

### 🎨 Modern Tech Stack
- **React 19** with TypeScript and Strict Mode
- **Tailwind CSS v4** for utility-first styling
- **Radix UI** components for accessible primitives
- **Material UI** integration for enhanced components
- **Framer Motion** for smooth animations
- **Vite 6** for lightning-fast development and optimized builds

### 🚀 Performance & SEO
- **Comprehensive SEO** with meta tags, Open Graph, and Twitter Cards
- **Structured Data** (Schema.org JSON-LD) for Person, LocalBusiness, Event, and WebSite
- **Responsive Design** optimized for all devices
- **Fast Loading** with code splitting and lazy loading
- **PWA-Ready** with theme colors and mobile app capabilities

### 📋 Dynamic Content
- **JSON-Based Events** — Easy event management via `public/data/events.json`
- **PHP Backend** — Form submissions handled by `public/api/book-rossi.php`
- **Environment-Aware Paths** — Seamless dev/production asset loading

---

## 📁 Project Structure

```
rossi-vishnujith/
├── public/
│   ├── api/
│   │   └── book-rossi.php          # PHP backend for booking forms
│   ├── data/
│   │   └── events.json             # Dynamic event listings
│   ├── assets/                     # Images, videos, and media
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── App.tsx                 # Main application component
│   │   └── components/
│   │       ├── Navbar.tsx          # Navigation with smooth scroll
│   │       ├── HeroSection.tsx     # Hero banner with CTA
│   │       ├── AboutSection.tsx    # Biography and achievements
│   │       ├── GallerySection.tsx  # Photo gallery with masonry layout
│   │       ├── EventsSection.tsx   # Dynamic event listings
│   │       ├── MerchSection.tsx    # Rossi Moto Works services
│   │       ├── ContactSection.tsx  # Booking form with PHP backend
│   │       ├── Footer.tsx          # Footer with social links
│   │       ├── BookingContext.tsx  # Booking state management
│   │       ├── BookingModal.tsx    # Booking modal component
│   │       ├── figma/              # Figma-related utilities
│   │       │   └── ImageWithFallback.tsx
│   │       └── ui/                 # Reusable Radix UI components
│   │           ├── accordion.tsx
│   │           ├── button.tsx
│   │           ├── card.tsx
│   │           ├── dialog.tsx
│   │           └── ... (50+ components)
│   ├── styles/
│   │   ├── index.css               # Main stylesheet entry
│   │   ├── tailwind.css            # Tailwind directives
│   │   ├── theme.css               # CSS custom properties
│   │   └── fonts.css               # DM Sans font imports
│   ├── main.tsx                    # React DOM entry point
│   └── vite-env.d.ts               # Vite type declarations
├── guidelines/
│   └── Guidelines.md               # Development guidelines
├── workflows/
│   └── deploy.yml                  # GitHub Actions deployment
├── index.html                      # HTML entry with comprehensive SEO
├── vite.config.ts                  # Vite configuration
├── postcss.config.mjs              # PostCSS for Tailwind
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/jagathgj/rossi_vishnujith.git
cd rossi_vishnujith

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR at `localhost:5173` |
| `npm run build` | Type-check with `tsc` and build for production |
| `npm run preview` | Preview production build at `localhost:4173` |
| `npm run deploy` | Build and deploy to GitHub Pages |

---

## 🌐 Deployment

### GitHub Pages

1. **Update `package.json`:**
   ```json
   "homepage": "https://yourusername.github.io/rossi_vishnujith"
   ```

2. **Update `vite.config.ts`:**
   ```ts
   export default defineConfig({
     base: '/rossi_vishnujith/',
     // ...
   });
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages:**
   - Go to **Settings → Pages**
   - Set source to `gh-pages` branch

### Custom Domain

1. Add `CNAME` file to `public/` with your domain
2. Update canonical URLs in `index.html`
3. Configure DNS records with your provider

---

## 📝 Content Management

### Managing Events

Edit [`public/data/events.json`](public/data/events.json):

```json
{
  "events": [
    {
      "date": "MAR 28",
      "year": "2026",
      "name": "Stunt Mania 2026",
      "location": "Kochi, Kerala",
      "time": "6:00 PM IST"
    }
  ]
}
```

### Booking Form Backend

⚠️ **Important:** GitHub Pages doesn't support PHP. You must host the backend separately.

The booking form uses PHP at [`public/api/book-rossi.php`](public/api/book-rossi.php).

**Setup Steps:**

1. **Upload PHP File:**
   - Upload `public/api/book-rossi.php` to your PHP-enabled server
   - Example: `https://hello.com/api/book-rossi.php`

2. **Configure Email (in PHP file, line 20):**
   ```php
   $to_email = "your-email@example.com";  // Change this
   ```

3. **Set Environment Variable:**
   - Create `.env` file in project root:
   ```bash
   VITE_BACKEND_URL=https://hello.com/api/book-rossi.php
   ```

4. **Verify Server Requirements:**
   - PHP 7.0 or higher
   - `mail()` function enabled OR SMTP configured
   - CORS headers properly set (already in PHP file)

**Form Fields:**
- Name, Email, Phone (required)
- Service Type: Stunt Show, Race Event, Brand Collaboration
- Preferred Date
- Message

---

## 🎨 Styling & Theming

### Color Scheme
- **Background:** `#0A0A0A` (Dark)
- **Primary:** `#E8FF00` (Neon Yellow)
- **Text:** `#FFFFFF` (White)

### Typography
- **Font Family:** DM Sans (Google Fonts)
- **Weights:** 400, 500, 600, 700

### Customization

Modify theme variables in [`src/styles/theme.css`](src/styles/theme.css):

```css
:root {
  --background: #0A0A0A;
  --foreground: #FFFFFF;
  --primary: #E8FF00;
  /* ... */
}
```

---

## 🔧 Key Dependencies

### Core
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | React DOM renderer |
| `typescript` | ^5.7.2 | Type safety |
| `vite` | 6.3.5 | Build tool |

### UI & Styling
| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | 4.1.12 | Utility-first CSS |
| `@radix-ui/*` | Latest | Accessible UI primitives |
| `@mui/material` | 7.3.5 | Material Design components |
| `lucide-react` | 0.487.0 | Icon library |
| `motion` | 12.23.24 | Animation library |

### Forms & Data
| Package | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | 7.55.0 | Form management |
| `date-fns` | 3.6.0 | Date utilities |
| `sonner` | 2.0.3 | Toast notifications |

---

## 📞 Contact & Social

- **Website:** [rossivishnujith.com](https://rossivishnujith.com)
- **Email:** [rossi@rossirides.com](mailto:rossi@rossirides.com)
- **Phone:** [+91 82899 17046](tel:+918289917046)
- **Instagram:** [@rossi_xrz](https://instagram.com/rossi_xrz)
- **YouTube:** [@rossivishnujith](https://www.youtube.com/watch?v=zvXFvvBGH-Y)
- **Facebook:** [rossivishnujith](https://facebook.com/rossivishnujith)

### Rossi Moto Works
**Address:** Chekkalamukku, Sreekaryam, Near IndianOil Pump, Trivandrum, Kerala 695017

**Services:**
- Full Engine Overhaul
- Performance Upgrades
- Custom Bodywork & Paint
- Race Bike Preparation
- General Servicing
- Detailing & Restoration

**Hours:**
- Mon-Fri: 9:00 AM - 7:00 PM
- Saturday: 9:00 AM - 5:00 PM
- Sunday: Closed

---

## 📄 License

MIT © [Jagath Jayakumar](https://github.com/jagathgj)

---

## 🙏 Acknowledgments

Built with ❤️ using:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Material UI](https://mui.com/)

---

<div align="center">

**Born to Ride. Built to Race.**

Made with 🏍️ by Rossi Vishnujith

</div>
