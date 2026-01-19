# Railway Backend Setup Guide

## Step 1: Update Railway Backend Files

In your Railway Express.js project, update `index.ts` with this code:

```typescript

## Step 2: Install Required Dependencies

In your Railway project, install these packages:

```bash
npm install nodemailer @types/nodemailer
```

## Step 3: Set Up Railway Environment Variables

In your Railway project dashboard, go to **Variables** and add:

1. **SMTP_HOST** - Your SMTP server (e.g., `smtp.gmail.com`)
2. **SMTP_PORT** - Port (usually `587` for TLS)
3. **SMTP_USER** - Your email address
4. **SMTP_PASS** - Your email password or app-specific password
5. **FROM_EMAIL** - Email address to send from (e.g., `noreply@macremotecontroller.com`)
6. **FRONTEND_URL** - Your website URL (e.g., `https://macremotecontrollerwebpage.netlify.app`)
7. **ALLOWED_ORIGINS** - Comma-separated list of allowed origins (e.g., `https://macremotecontrollerwebpage.netlify.app,http://localhost:4321`)

### For Gmail:
- Enable 2-factor authentication
- Generate an App Password: Google Account → Security → App passwords
- Use the app password as `SMTP_PASS`

### For Other Email Providers:
- **SendGrid**: Use their SMTP settings
- **Mailgun**: Use their SMTP settings
- **AWS SES**: Use their SMTP settings

## Step 4: Deploy to Railway

1. Connect your Railway project to your GitHub repository
2. Railway will auto-deploy when you push changes
3. Railway automatically provides `DATABASE_URL` environment variable

## Step 5: Get Your Railway API URL

After deployment, Railway will provide you with a URL like:
- `https://your-project.up.railway.app`

Save this URL - you'll need it for the frontend!
