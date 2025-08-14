# 🚀 Campus Canteen App Deployment Guide

This guide will help you deploy the Campus Canteen app with the frontend on Vercel and backend on Render.

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Render account (free)
- MongoDB Atlas account (free)

## 🎯 Deployment Steps

### **1. Backend Deployment (Render)**

#### Step 1: Prepare Backend
1. Make sure your backend code is in the `backend/` folder
2. Ensure `package.json` has the correct dependencies
3. Verify `server.js` is the main entry point

#### Step 2: Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `campus-canteen-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Branch**: `main`

#### Step 3: Set Environment Variables
In Render dashboard, add these environment variables:
```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=10000
```

#### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Copy the generated URL (e.g., `https://campus-canteen-backend.onrender.com`)

### **2. Frontend Deployment (Vercel)**

#### Step 1: Prepare Frontend
1. Make sure your frontend code is in the `frontend/` folder
2. Verify `package.json` has correct dependencies
3. Check that `vercel.json` is present

#### Step 2: Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

#### Step 3: Set Environment Variables
In Vercel dashboard, add these environment variables:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
REACT_APP_ENVIRONMENT=production
```

#### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your app will be available at the Vercel URL

## 🔧 Configuration Files

### Frontend (Vercel)
- `frontend/vercel.json` - Vercel configuration
- `frontend/package.json` - Dependencies and scripts

### Backend (Render)
- `backend/package.json` - Dependencies and start script
- `backend/render.yaml` - Render configuration (optional)

## 🌐 Environment Variables

### Backend (Render)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=10000
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
REACT_APP_ENVIRONMENT=production
```

## 🔍 Testing Deployment

### Backend Health Check
```bash
curl https://your-backend-url.onrender.com/api/orders
```

### Frontend Test
1. Visit your Vercel URL
2. Test login functionality
3. Test menu browsing
4. Test order placement

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Update CORS configuration in `backend/server.js`
   - Add your Vercel domain to allowed origins

2. **Environment Variables**
   - Double-check all environment variables are set
   - Restart services after changing variables

3. **Build Failures**
   - Check `package.json` dependencies
   - Verify Node.js version compatibility

4. **Database Connection**
   - Ensure MongoDB Atlas is accessible
   - Check network access settings

## 📞 Support

If you encounter issues:
1. Check Render/Vercel logs
2. Verify environment variables
3. Test locally first
4. Check MongoDB Atlas connection

## 🎉 Success!

Once deployed, your Campus Canteen app will be available at:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-backend-name.onrender.com`

Happy deploying! 🚀 