# EchoTrack Deployment Guide

## Overview
This guide will help you deploy EchoTrack to:
- **Frontend:** Vercel (Static files)
- **Backend:** Render (Node.js API)
- **Database:** MongoDB Atlas (Cloud database)

## Prerequisites

### 1. MongoDB Atlas Setup
1. Create a MongoDB Atlas account at https://cloud.mongodb.com
2. Create a new cluster (free tier is fine)
3. Create a database user with read/write permissions
4. Get your connection string (MONGO_URI)
5. Whitelist your IP addresses (0.0.0.0/0 for all IPs)

### 2. Environment Variables
You'll need these environment variables:

**For Render (Backend):**
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `NODE_ENV`: Set to "production"
- `PORT`: Render will set this automatically

## Deployment Steps

### Step 1: Deploy Backend to Render

1. **Connect your GitHub repository to Render:**
   - Go to https://render.com
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository

2. **Configure the service:**
   - **Name:** `echotrack-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Root Directory:** Leave empty (root of repo)

3. **Set Environment Variables:**
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string (e.g., `your-super-secret-jwt-key-here`)
   - `NODE_ENV`: `production`

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your service URL (e.g., `https://echotrack-backend.onrender.com`)

### Step 2: Deploy Frontend to Vercel

1. **Connect your GitHub repository to Vercel:**
   - Go to https://vercel.com
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure the project:**
   - **Framework Preset:** Other
   - **Root Directory:** Leave empty
   - **Build Command:** Leave empty (no build needed)
   - **Output Directory:** `public`
   - **Install Command:** Leave empty

3. **Set Environment Variables:**
   - No environment variables needed for frontend

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your domain (e.g., `https://echotrack.vercel.app`)

### Step 3: Update API URLs

The code has been updated to automatically detect the environment:
- **Local development:** Uses `http://localhost:5000/api`
- **Production:** Uses `https://echotrack-backend.onrender.com/api`

## Post-Deployment

### 1. Test Your Application
1. Visit your Vercel frontend URL
2. Test anonymous donations
3. Test job postings
4. Test user registration/login

### 2. Monitor Your Application
- **Render Dashboard:** Monitor backend performance and logs
- **Vercel Dashboard:** Monitor frontend performance
- **MongoDB Atlas:** Monitor database usage

### 3. Custom Domains (Optional)
- **Vercel:** Add custom domain in project settings
- **Render:** Add custom domain in service settings

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure CORS is properly configured in server.js
   - Check that your Vercel domain is in the allowed origins

2. **MongoDB Connection Issues:**
   - Verify your MONGO_URI is correct
   - Check that your IP is whitelisted in MongoDB Atlas
   - Ensure your database user has proper permissions

3. **API 404 Errors:**
   - Verify your Render service is running
   - Check that the API_BASE_URL is correct in your frontend code

4. **Environment Variables:**
   - Ensure all required environment variables are set in Render
   - Check that JWT_SECRET is set for authentication

## File Structure for Deployment

```
echotrack/
├── public/                 # Frontend files (Vercel)
│   ├── index.html
│   ├── dashboard.html
│   ├── donate.html
│   ├── login.html
│   └── *.js, *.css
├── server.js              # Backend entry point (Render)
├── routes/                # API routes
├── models/                # Database models
├── middleware/            # Auth middleware
├── package.json           # Dependencies
├── vercel.json           # Vercel configuration
├── render.yaml           # Render configuration
└── .env                  # Local environment variables
```

## Environment Variables Reference

### Required for Production:
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to "production"

### Optional:
- `PORT`: Server port (Render sets this automatically)

## Security Considerations

1. **Environment Variables:** Never commit sensitive data to Git
2. **CORS:** Properly configured for production domains
3. **JWT Secret:** Use a strong, random secret
4. **MongoDB:** Use strong passwords and proper user permissions
5. **HTTPS:** Both Vercel and Render provide HTTPS by default

## Performance Optimization

1. **Database:** Use MongoDB Atlas indexes for better performance
2. **Caching:** Consider adding Redis for session management
3. **CDN:** Vercel provides global CDN automatically
4. **Monitoring:** Set up alerts for errors and performance issues

## Support

If you encounter issues:
1. Check the logs in Render dashboard
2. Verify environment variables are set correctly
3. Test API endpoints directly using tools like Postman
4. Check MongoDB Atlas for connection issues 