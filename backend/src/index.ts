import express from 'express';
import { config } from 'dotenv';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
import contentRouter from './routes/content';

// Load env from correct path
config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 4000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/brainly';

console.log('Attempting to connect to MongoDB with URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//<username>:<hidden>@'));

// Debug middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));

app.use(express.json());

// Connect to MongoDB with options
mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    w: 'majority',
    writeConcern: {
        wtimeout: 2500
    }
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log('Available routes:');
        console.log('- POST /api/v1/signup');
        console.log('- POST /api/v1/signin');
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Routes - note the path change
app.use('/api/v1', authRouter);  // Changed from /api/v1/auth
app.use('/api/v1/content', contentRouter);
