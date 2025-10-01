# 🚀 Quick Start: Database Setup

## Overview
Your newsletter and contact form submissions will now be stored in a **MySQL database** in your cPanel hosting.

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Create Database in cPanel
1. Login to cPanel
2. Go to **MySQL Databases**
3. Create database: `denmar_email`
4. Create user: `denmar_user` with a strong password
5. Add user to database with ALL PRIVILEGES

### Step 2: Configure Environment Variables
Update your `.env` file:
```bash
DATABASE_URL="mysql://yourusername_denmar_user:your_password@localhost:3306/yourusername_denmar_email"
```

### Step 3: Run Migration
```bash
npx prisma generate
npx prisma db push
```

### Step 4: Deploy
Deploy your application and test the forms!

---

## 📚 Detailed Guide

- **Full Setup Guide:** `MYSQL_CPANEL_SETUP.md`
- **Implementation Details:** `DATABASE_IMPLEMENTATION_SUMMARY.md`
- **Environment Template:** `ENV_TEMPLATE.txt`

---

## ✅ What You Get

✅ **Automatic storage** of all newsletter signups
✅ **Duplicate prevention** - no repeated emails
✅ **Contact form tracking** - all inquiries saved
✅ **Unsubscribe functionality** - one-click unsubscribe
✅ **Data export** - CSV/SQL export via phpMyAdmin
✅ **Analytics ready** - query data for insights

---

## 🧪 Test After Setup

1. **Newsletter:** Subscribe with an email → Check database
2. **Duplicate:** Subscribe again with same email → Should show error
3. **Contact Form:** Submit inquiry → Check database
4. **Unsubscribe:** Click link in welcome email → Status changes

---

## 📊 View Your Data

**Via cPanel:**
1. Go to **MySQL Databases** → **phpMyAdmin**
2. Select your database
3. Browse tables: `newsletter_subscribers` and `contact_submissions`

**Via SQL:**
```sql
-- View all subscribers
SELECT * FROM newsletter_subscribers ORDER BY subscribedAt DESC;

-- View contact submissions
SELECT * FROM contact_submissions ORDER BY submittedAt DESC;

-- Count active subscribers
SELECT COUNT(*) FROM newsletter_subscribers WHERE status = 'active';
```

---

## 🔧 Common Issues

**Can't connect to database?**
- Check DATABASE_URL format
- Verify username/password
- Ensure user has privileges

**Tables don't exist?**
- Run `npx prisma db push`
- Check if migration succeeded

**Password has special characters?**
- URL encode them: `@` → `%40`, `#` → `%23`, `*` → `%2A`

---

## 🎯 Database Schema

**newsletter_subscribers:**
- email (unique)
- status (active/unsubscribed)
- subscribedAt, unsubscribedAt
- unsubscribeToken
- ipAddress, userAgent

**contact_submissions:**
- name, email, phone
- country, message
- submittedAt
- ipAddress, userAgent

---

## 📞 Need Help?

Read the full guide: `MYSQL_CPANEL_SETUP.md`

---

**That's it! Your database is ready to track all form submissions. 🎉**

