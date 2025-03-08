import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// Updated CORS configuration
app.use(cors({
    origin: [
        'https://brainly-project.vercel.app',
        'https://brainly-frontend.vercel.app',
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Add headers middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
}));

app.use(express.json());

// Simple test route
app.get('/api/test', (_, res) => {
    res.json({ status: 'ok' });
});

// Connect to MongoDB
const MONGODB_URI = "mongodb+srv://gautampratik483:X2g8OlZls62TlEk5@cluster0.a1h3q.mongodb.net/brainly";

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Import routes after DB connection
        const authRouter = require('./routes/auth').default;
        app.use('/api/v1', authRouter);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

export default app;
