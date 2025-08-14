require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/order'));
app.use('/api', require('./routes/email'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// DB Connect - Using MongoDB Atlas from environment variables
async function startServer() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://venkataramana88:venkataramana88@cluster1.iyblcx6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
    const port = process.env.PORT || 5002;
    
    console.log('Attempting to connect to MongoDB Atlas...');
    console.log('Using URI:', mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials in logs
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB Atlas successfully');
    console.log('Database URL:', mongoose.connection.host);
    
    // Start server only after successful database connection
    app.listen(port, () => console.log(`🚀 Backend running on http://localhost:${port}`));
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    console.log('Please check your MongoDB Atlas connection string in .env file');
    process.exit(1);
  }
}

startServer(); 