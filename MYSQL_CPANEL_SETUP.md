# MySQL Database Setup Guide for cPanel

This guide will walk you through setting up a MySQL database in cPanel for storing newsletter and contact form submissions.

## 📋 What We're Building

- **Newsletter subscribers** with duplicate prevention and unsubscribe functionality
- **Contact form submissions** for tracking user inquiries
- Automatic storage with every form submission
- Secure database credentials management

---

## 🗄️ Step 1: Create MySQL Database in cPanel

### 1.1 Login to cPanel
- Go to your hosting provider's cPanel (usually `yourdomain.com/cpanel`)
- Login with your cPanel credentials

### 1.2 Navigate to MySQL Databases
- Scroll down to the **"Databases"** section
- Click on **"MySQL Databases"**

### 1.3 Create a New Database
1. Under **"Create New Database"**
2. Enter database name: `denmar_email` (or any name you prefer)
3. Click **"Create Database"**
4. You'll see a success message
5. Note down the full database name (usually `yourusername_denmar_email`)

---

## 👤 Step 2: Create MySQL User

### 2.1 Create New User
1. Scroll down to **"MySQL Users"** section
2. Under **"Add New User"**
3. Enter username: `denmar_user` (or any name you prefer)
4. Click **"Password Generator"** to create a strong password
   - Copy the generated password somewhere safe!
5. Click **"Create User"**
6. Note down the full username (usually `yourusername_denmar_user`)

### 2.2 Add User to Database
1. Scroll down to **"Add User To Database"**
2. Select your user: `yourusername_denmar_user`
3. Select your database: `yourusername_denmar_email`
4. Click **"Add"**

### 2.3 Set User Privileges
1. You'll be redirected to **"Manage User Privileges"**
2. Check **"ALL PRIVILEGES"** checkbox
3. Click **"Make Changes"**

---

## 🔧 Step 3: Get Database Connection Details

You'll need these details for your `.env` file:

```
Database Host: localhost (or check "MySQL Host" in cPanel)
Database Name: yourusername_denmar_email
Database User: yourusername_denmar_user
Database Password: [the password you generated]
Database Port: 3306 (default MySQL port)
```

---

## ⚙️ Step 4: Configure Your Application

### 4.1 Update `.env` or `.env.local` File

In your project root, update your environment file:

```bash
# Database Connection (MySQL)
DATABASE_URL="mysql://yourusername_denmar_user:your_password@localhost:3306/yourusername_denmar_email"


# SMTP Settings (already configured)
SMTP_USER="info@denmartravel.co.ke"
SMTP_PASS="your_email_password"

# Base URL (for unsubscribe links)
NEXT_PUBLIC_BASE_URL="https://denmartravel.co.ke"

# Analytics (already configured)
NEXT_PUBLIC_GA_ID="G-X34BY22BDQ"
```

**⚠️ IMPORTANT:** Replace:
- `yourusername_denmar_user` with your actual database username
- `your_password` with your database password
- `yourusername_denmar_email` with your actual database name

### 4.2 Database URL Format Explanation

```
mysql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

**Example:**
```
mysql://denmartr_user:MyP@ssw0rd123@localhost:3306/denmartr_denmar_email
```

**Special Characters in Password:**
If your password contains special characters like `@`, `#`, `%`, etc., you need to URL encode them:
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `*` → `%2A`

**Example with special characters:**
```
Password: My@Pass#123
Encoded: My%40Pass%23123
```

---

## 🚀 Step 5: Run Database Migration

Once your `.env` is configured, run these commands:

### 5.1 Generate Prisma Client
```bash
npx prisma generate
```

### 5.2 Push Database Schema
```bash
npx prisma db push
```

This will create the following tables in your database:
- `newsletter_subscribers`
- `contact_submissions`

### 5.3 Verify Tables Created
1. Go back to cPanel
2. Click **"phpMyAdmin"** (under Databases section)
3. Select your database from the left sidebar
4. You should see two new tables:
   - `newsletter_subscribers`
   - `contact_submissions`

---

## 📊 Step 6: View Your Data

### Option 1: Using phpMyAdmin (Easiest)
1. Login to cPanel
2. Click **"phpMyAdmin"**
3. Select your database
4. Click on table name to view data
5. Use "Browse" tab to see all records
6. Use "Export" tab to download data as CSV/Excel

### Option 2: Using SQL Queries
In phpMyAdmin, go to SQL tab and run:

**View all newsletter subscribers:**
```sql
SELECT * FROM newsletter_subscribers ORDER BY subscribedAt DESC;
```

**View active subscribers only:**
```sql
SELECT email, subscribedAt FROM newsletter_subscribers WHERE status = 'active' ORDER BY subscribedAt DESC;
```

**View all contact submissions:**
```sql
SELECT * FROM contact_submissions ORDER BY submittedAt DESC;
```

**Count subscribers:**
```sql
SELECT COUNT(*) as total_subscribers FROM newsletter_subscribers WHERE status = 'active';
```

**Export email list for marketing:**
```sql
SELECT email FROM newsletter_subscribers WHERE status = 'active' ORDER BY subscribedAt DESC;
```

---

## 🔒 Step 7: Security Best Practices

### 7.1 Protect .env
- ✅ `.env` is in `.gitignore`
- ❌ Never commit database credentials to git
- ✅ Use different credentials for production and development

### 7.2 Database User Permissions
- ✅ Only grant necessary privileges
- ❌ Don't use root user for your application
- ✅ Use strong, unique passwords

### 7.3 Backup Your Database
1. In phpMyAdmin, select your database
2. Click **"Export"** tab
3. Choose **"Quick"** export method
4. Click **"Go"**
5. Save the `.sql` file as backup
6. Schedule regular backups (weekly recommended)

---

## 🧪 Step 8: Test Your Setup

### 8.1 Test Newsletter Signup
1. Go to your website
2. Scroll to footer
3. Enter an email and subscribe
4. Check if:
   - ✅ Success message appears
   - ✅ Welcome email received
   - ✅ Email appears in database (phpMyAdmin)

### 8.2 Test Contact Form
1. Go to contact page
2. Fill out and submit the form
3. Check if:
   - ✅ Success message appears
   - ✅ Auto-reply email received
   - ✅ Team notification received
   - ✅ Submission appears in database

### 8.3 Test Duplicate Prevention
1. Subscribe with same email twice
2. Should see: "This email is already subscribed"
3. Database should only have one record

### 8.4 Test Unsubscribe
1. Check welcome email for unsubscribe link
2. Click the link
3. Should see success page
4. In database, status should change to "unsubscribed"

---

## 🐛 Troubleshooting

### Issue: "Can't connect to MySQL server"
**Solution:**
- Verify `DATABASE_URL` is correct
- Check database host (usually `localhost`)
- Ensure database user has permissions
- Check if MySQL service is running in cPanel

### Issue: "Access denied for user"
**Solution:**
- Verify username and password are correct
- Check if user is added to database
- Ensure user has ALL PRIVILEGES
- Try URL encoding special characters in password

### Issue: "Unknown database"
**Solution:**
- Verify database name in `DATABASE_URL`
- Check database exists in cPanel MySQL Databases
- Ensure you're using the full database name (with prefix)

### Issue: "Table doesn't exist"
**Solution:**
- Run `npx prisma db push` to create tables
- Check phpMyAdmin to verify tables are created
- Ensure Prisma schema matches database

### Issue: "Duplicate entry" error
**Solution:**
- This is expected! It means duplicate prevention is working
- The frontend should catch this and show appropriate message

---

## 📈 Monitoring & Maintenance

### Daily
- Check for new submissions via phpMyAdmin
- Respond to contact form inquiries

### Weekly
- Backup database (Export from phpMyAdmin)
- Review subscriber growth
- Check for any errors in submissions

### Monthly
- Clean up old unsubscribed users (optional)
- Export contact list for records
- Review database size and optimize if needed

---

## ✅ Setup Checklist

- [ ] MySQL database created in cPanel
- [ ] Database user created with strong password
- [ ] User added to database with ALL PRIVILEGES
- [ ] `.env` file updated with DATABASE_URL
- [ ] `npx prisma generate` executed successfully
- [ ] `npx prisma db push` executed successfully
- [ ] Tables visible in phpMyAdmin
- [ ] Newsletter signup tested (appears in database)
- [ ] Contact form tested (appears in database)
- [ ] Duplicate prevention tested
- [ ] Unsubscribe functionality tested
- [ ] Database backup created

---

**🎉 Congratulations!** Your MySQL database is fully configured and integrated with your application!

