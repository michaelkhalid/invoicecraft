# InvoiceCraft

> **Create Professional Invoices in Seconds**

InvoiceCraft is a modern, lightweight, blazing-fast, and search-optimized online Invoice Generator. Engineered for freelancers, consultants, small business owners, and creative agencies, it enables users to generate fully compliant, pixel-perfect A4 invoice documents in under 60 seconds with **zero sign-up barriers, zero watermark branding, and 100% data ownership.**

---

## 🚀 Key Architectural Pillars

1. **Strict Client-Side Privacy (Offline-First)**
   - No database connections or cloud endpoints store your financial transactions, rates, or client metrics.
   - All input templates and logo assets are serialized (Base64) and stored locally in the browser’s `localStorage`.
   
2. **Infinite Portability (Zero-Backend Share Engine)**
   - Drafts can be transferred dynamically across devices! Clicking **"Share Link"** compiles the entire active invoice model into an encrypted Base64 string in the URL.
   - Opening this URL on another device Decodes and populates the editor immediately.

3. **Pixel-Perfect A4 Vector PDFs**
   - No heavy, blurry canvas hacks or costly third-party PDF server rendering.
   - Leverages browser native printing styled with rigorous `@media print` CSS rules to format vectors, hide control buttons, and clean page borders instantly.

4. **SEO & AdSense Optimization**
   - Automatically injects dynamic Google search parameters, dynamic document header metadata (`Title`, `Description`), and comprehensive `Schema.org` structures (`SoftwareApplication`, `FAQPage`, `BlogPosting`).
   - 100% compliant with Google AdSense policies, leaving non-obstructive placement zones ready for ad tag injection.

---

## 🛠️ Tech Stack & Structure

- **Framework**: React 19 + TypeScript (Standard bundling)
- **Styling**: Tailwind CSS v4 (Custom google typography)
- **Animations**: Motion (`motion/react`)
- **Icons**: Lucide React
- **Dev Tooling**: Vite + TSX

---

## 📦 Zero-Cost Deployment Guide

InvoiceCraft is engineered to require **ZERO paid hosting**. It can be deployed 100% FREE on GitHub Pages or Vercel.

### Deploying to Vercel (Recommended)

Vercel offers an ultra-fast global CDN for static SPA sites, with automatic SSL, custom domains, and zero-config deployment.

1. Create a free personal account on [Vercel](https://vercel.com).
2. Connect your **GitHub**, **GitLab**, or **Bitbucket** repository containing this project.
3. Import the repository in Vercel.
4. Leave all settings at default:
   - **Framework Preset**: `Vite` (Vercel automatically detects the Vite config)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your site will be live on a custom `vercel.app` domain with instant continuous deployment on every git push!

---

## 🧑‍💻 Technical SEO Compliance

- **robots.txt**: Standard robot directive file located in `/public/robots.txt` which excludes crawling base64 draft URLs (preventing duplicate index penalties).
- **sitemap.xml**: Sitemap directory index in `/public/sitemap.xml` mapping static pages, FAQ hubs, and blog publications.
- **Dynamic Headers**: `App.tsx` dynamically modifies titles, descriptors, and structured JSON-LD schemas as users transition between views.
