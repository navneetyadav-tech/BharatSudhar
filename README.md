# BharatSudhar — Ab Har Nagrik Zimmedaar 🇮🇳

An open civic-tech initiative empowering citizens across India to document, track, and collaborate with municipal authorities for cleaner, safer, and better-maintained communities.

![BharatSudhar Preview](public/favicon.svg)

---

## 🌟 Key Features

- **Civic Problem Reporting**: Quick photo evidence capture with automatic geolocation and category tagging.
- **Real-Time Issue Tracking**: Multi-stage resolution pipeline (Complaint Registered → Field Inspection → Action Taken → Resolved).
- **Responsive Dual-View Experience**: Seamlessly adapts between a native smartphone mobile app viewport and a full desktop wide layout.
- **Gamified Citizen Karma**: Active citizens earn civic karma points for verified complaints, volunteer work, and community upkeep.
- **Municipal Transparency**: Ward-level metrics, complaint turnaround analytics, and civic performance tracking.
- **Accessibility & Contrast**: Built to WCAG standards with high contrast lemon yellow (`#FACC15`) CTA accents and a clean modern civic palette.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: Client-side single page app routing

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm or yarn or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/navneetyadav-tech/BharatSudhar.git
   cd BharatSudhar
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```
   The compiled bundle will be generated in the `dist/` directory.

6. **Preview Production Build Locally**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Guide

### Option 1: Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import `navneetyadav-tech/BharatSudhar`.
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

> **Note on Client-side Routing**: A `vercel.json` is included to handle single-page application (SPA) routing rewrites.

### Option 2: Netlify
1. Connect your repository on [netlify.com](https://www.netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Option 3: GitHub Pages
Use the `gh-pages` package or GitHub Actions to publish the `dist/` folder to GitHub Pages.

---

## 📁 Project Structure

```
BharatSudhar/
├── public/                 # Static assets (favicons, icons)
├── src/
│   ├── components/
│   │   ├── auth/          # Citizen login & authentication modals
│   │   ├── common/        # Buttons, cards, badges, inputs
│   │   ├── dashboard/     # Citizen dashboard & grievance widgets
│   │   ├── feedback/      # Error boundaries, spinners, empty states
│   │   ├── forms/         # Accessible form controls
│   │   ├── layout/        # Navbar, footer, container
│   │   └── mobile/        # Native mobile viewport, bottom nav & wizard
│   ├── config/            # Environment configurations
│   ├── context/           # Auth and Complaint state providers
│   ├── data/              # Mock municipal datasets & Maharashtra wards
│   ├── design-system/     # Design tokens & color palettes
│   ├── pages/             # Home, Dashboard, Issues, About, Login
│   ├── routes/            # Application route definitions
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Helper utilities (cn, clsx)
│   ├── App.tsx            # Main root component
│   ├── index.css          # Core design tokens & typography
│   └── main.tsx           # Application entry point
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind design system configuration
├── tsconfig.app.json      # TypeScript compiler configuration
└── vite.config.ts         # Vite build configuration
```

---

## 🤝 Contributing

We welcome contributions from citizens and developers!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingCivicFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingCivicFeature'`)
4. Push to the Branch (`git push origin feature/AmazingCivicFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
