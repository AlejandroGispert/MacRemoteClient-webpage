# Local Development Setup

## Database Connection Issue

The error you're seeing (`ECONNREFUSED ::1:5432`) means the backend is trying to connect to a local PostgreSQL database that isn't running.

## Solution: Use Railway's Database for Local Development

### Step 1: Get Your Railway DATABASE_URL

1. Go to Railway: https://railway.app
2. Open your project
3. Click on your **Postgres** service
4. Go to the **Variables** tab
5. Find `DATABASE_URL` - it looks like:
   ```
   postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
   ```
6. **Copy this entire URL**

### Step 2: Create Local .env File

In the `BACKEND` folder, create a file named `.env` (not .env.example):

```bash
cd BACKEND
touch .env
```

### Step 3: Add Environment Variables to .env

Open the `.env` file and add:

```env
# Database Connection (from Railway)
DATABASE_URL=postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway

# Gmail SMTP Settings (for local testing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=macremotecontroller@gmail.com
SMTP_PASS=your-16-character-app-password-here
FROM_EMAIL=macremotecontroller@gmail.com

# Frontend URL (for local development)
FRONTEND_URL=http://localhost:4321

# Allowed CORS Origins
ALLOWED_ORIGINS=http://localhost:4321,https://macremotecontrollerwebpage.netlify.app

# Server Port
PORT=3333
```

**Important:**
- Replace `DATABASE_URL` with your actual Railway database URL
- Replace `SMTP_PASS` with your Gmail App Password (16 characters, no spaces)
- The `.env` file is already in `.gitignore`, so it won't be committed

### Step 4: Restart Your Backend

After creating the `.env` file, restart your backend:

```bash
npm run dev
```

The backend should now connect to Railway's database and work properly!

## Alternative: Install PostgreSQL Locally

If you prefer to run PostgreSQL locally instead:

1. Install PostgreSQL: `brew install postgresql@14` (Mac)
2. Start PostgreSQL: `brew services start postgresql@14`
3. Create a database: `createdb macremotecontroller`
4. Update `.env` with: `DATABASE_URL=postgresql://localhost:5432/macremotecontroller`

But using Railway's database is easier for development!
