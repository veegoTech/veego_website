# Alpha Fly LMS & Learning Workspace — Technology Stack Documentation

This document outlines the architecture, frameworks, libraries, cloud services, and tools powering the **Alpha Fly LMS** platform.

---

## 🌐 1. Frontend Core

| Technology | Version | Description / Purpose |
| :--- | :--- | :--- |
| **React** | `v19.2.7` | UI component library powering the Single Page Application (SPA) architecture |
| **TypeScript / JSX** | ES Modules | Component structuring, types, and logic |
| **Vite** | `v8.1.1` | Next-generation frontend build tool and hot module replacement (HMR) bundler |
| **React Router DOM** | `v7.18.1` | Client-side routing and view navigation |

---

## 🎨 2. Styling & UI Design System

| Technology | Purpose |
| :--- | :--- |
| **Tailwind CSS (`v4.3.3`)** | Utility-first styling framework integrated via `@tailwindcss/vite` |
| **Vanilla CSS & CSS Variables** | Custom glassmorphism, responsive grids, themes, and design tokens |
| **Lucide React (`v1.26.0`)** | Modern UI icon library |
| **Framer Motion (`v12.42.2`)** | Micro-animations, page transitions, and interactive UI states |

---

## ⚙️ 3. Backend & API Server

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | `v20.x` | JavaScript runtime environment |
| **Express.js** | `v4.21.2` | REST API server handling authentication, student registry, tasks, and certificates |
| **Supabase JS SDK** | `v2.109.0` | Cloud database client for PostgreSQL queries, data persistence & RLS security |
| **CORS & Dotenv** | — | Cross-origin resource sharing & environment variable security |

---

## 🗄️ 4. Database & Storage

| Technology | Purpose |
| :--- | :--- |
| **Supabase Cloud Database** | PostgreSQL cloud database for students, credentials, device locks, tasks, and inquiries |
| **Browser LocalStorage** | Offline caching for invoice ledgers, theme states, and sheet sync URLs |

---

## 📄 5. Document, PDF & Export Engines

| Technology | Purpose |
| :--- | :--- |
| **jsPDF (`v4.2.1`)** | Client-side 300 DPI high-resolution PDF generation for certificates and fee invoices |
| **html2canvas / html-to-image** | Visual canvas rendering and rasterization for print/download |
| **SheetJS (xlsx)** | Excel/CSV spreadsheet parsing and data manipulation |
| **qrcode.react** | Dynamic QR code generation for digital credential verification |

---

## ☁️ 6. External Integrations & Cloud

| Service | Purpose |
| :--- | :--- |
| **Google Apps Script & Google Sheets** | Live two-way sync for student data, certificates, and fee invoices |
| **Vercel** | Production hosting, automated CI/CD pipeline, and domain routing |
| **GitHub** | Source control and version management (`veeralakshmi-v/af_final`) |

---

## 🛠️ 7. Developer & Code Quality Tools

| Tool | Purpose |
| :--- | :--- |
| **Oxlint (`v1.71.0`)** | High-performance Rust-based JavaScript/TypeScript linter |
| **PrismJS (`v1.30.0`)** | Syntax highlighting for code sandbox environments |
| **Canvas Confetti** | Celebration animation triggers on task completion / graduation |

---

*Last Updated: 2026-10-01*
