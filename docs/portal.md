# Denmar Portal (CMS) Documentation

## Overview
The **Denmar Portal** is a custom Content Management System (CMS) built to manage the content and settings of the Denmar Tours & Travel website. It provides a secure, user-friendly interface for administrators to update site data without touching the code.

**URL**: `/denmar-portal`
**Login URL**: `/denmar-portal/login`

---

## 1. Authentication & Security
### Login System
- **Secure Access**: Powered by `NextAuth.js` using a credentials provider (Email & Password).
- **Session Management**: 
  - Sessions use **JWT (JSON Web Tokens)** for stateless, fast authentication.
  - **Auto-Logout**: Sessions expire after **24 hours** of inactivity to ensure security.
  - **Rolling Sessions**: Active usage extends the session automatically.
- **Protection**:
  - Middleware protects all `/denmar-portal/*` routes.
  - Unauthenticated users are automatically redirected to the login page.
  - Admin pages are excluded from the public `sitemap.xml` to prevent Google indexing.

### Admin Users
- **Database Model**: `AdminUser` model manages admin accounts.
- **Roles**: Supports `admin` and `staff` roles (extensible for future permissions).
- **Password Hashing**: Passwords are securely hashed using `bcryptjs`.

---

## 2. Features Implementation

### Global Site Settings
**Route**: `/denmar-portal/settings`
- **Purpose**: Manage site-wide information that appears in the Header, Footer, and Contact pages.
- **Fields Managed**:
  - **General**: Site Name, Site Description (SEO).
  - **Contact**: Email, Phone Number, WhatsApp Number, Physical Address.
  - **Social Media**: Facebook, Twitter/X, Instagram, TikTok, YouTube.
  - **Branding**: Logo URL, Favicon URL.
  - **Integrations**: Google Analytics ID, Facebook Pixel ID.
- **Data Flow**: Settings are fetched securely via Prisma (`prisma.siteSettings.findUnique`) and passed as props to the `TopBanner`, `Navbar`, and `Footer` components across all public pages.
- **Updates**: 
  - LinkedIn field was removed and replaced with **YouTube** as per requirements.
  - Changes reflect instantly on the frontend after saving.

### Content Management Modules
The portal structure supports the following content modules (implemented or planned):
- **Packages**: Create and manage travel packages.
- **Destinations**: Manage countries and specific destinations.
- **Services**: Update service offerings (Flights, Hotels, etc.).
- **Deals**: Manage special offers and discounts.
- **Testimonials**: Approve and manage customer reviews.

---

## 3. Technical Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma
- **Styling**: Tailwind CSS & Shadcn UI components
- **Forms**: React Hook Form + Zod Validation

### API Routes
- **Settings API**: `/api/denmar-portal/settings` (GET/PUT)
  - Protected by session authentication.
  - Validates input using Zod schemas.
  - Logs changes to an `AuditLog` table for accountability.

### Database Schema (Key Models)
- `AdminUser`: Stores admin credentials.
- `SiteSettings`: Stores global configuration (Single Row pattern).
- `AuditLog`: Tracks who changed what and when.

---

## 4. Recent Updates & Changelog
- **Jan 2026**:
  - Implemented secure Login Page with `Suspense` boundary fix.
  - Built Global Settings form with Zod validation.
  - Replaced LinkedIn integration with YouTube across Database, API, and Frontend.
  - Integrated settings data into all public layouts (`app/layout.tsx` excluded, individual pages updated to fetch/pass data).
  - Configured `sitemap.xml` exclusion for admin routes.

---

## 5. Deployment & Maintenance
- **Build Command**: `prisma generate && next build`
- **Environment Variables**: Requires `DATABASE_URL` and `NEXTAUTH_SECRET`.
- **Database Sync**: `bun prisma db push` used for schema updates.
