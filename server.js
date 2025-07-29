require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const userRoutes = require('./routes/users');
const jobRoutes = require('./routes/jobs');
const donationRoutes = require('./routes/donations');
const auth = require('./middleware/auth');

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://echotrack.vercel.app', 'https://echotrack-frontend.vercel.app']
    : ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection with retry logic
const connectDB = async (retryCount = 0, maxRetries = 5) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        if (retryCount < maxRetries) {
            console.log(`⏳ Retrying connection... (${retryCount + 1}/${maxRetries})`);
            setTimeout(() => connectDB(retryCount + 1, maxRetries), 5000);
        } else {
            console.error('❌ Maximum connection retries reached. Exiting...');
            process.exit(1);
        }
    }
};

// Initialize database connection
connectDB();

// Basic route
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

// API routes
app.use('/api/users', userRoutes); // keep for signup/login
// Protect GET /api/users to only allow authenticated users
app.get('/api/users/me', auth, async (req, res) => {
  try {
    const User = require('./models/User');
    const user = await User.findById(req.user.userId).select('name email role');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ 
      _id: user._id,
      name: user.name, 
      email: user.email, 
      role: user.role 
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});
app.use('/api/jobs', jobRoutes);
app.use('/api/donations', donationRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    if (err.code === 11000) {
        return res.status(409).json({ 
            error: 'Duplicate key error', 
            field: Object.keys(err.keyPattern)[0] 
        });
    }
    res.status(500).json({ error: err.message || 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is live on port ${PORT}!`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

