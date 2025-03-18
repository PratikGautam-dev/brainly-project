import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth';
import contentRouter from './routes/content';
import { Request, Response, NextFunction } from 'express';

const app = express();

// Updated allowed origins
const allowedOrigins = [
    'https://brainly-frontend-seven.vercel.app',
    'https://brainly-project.vercel.app',
    'http://localhost:5173'
];

// CORS configuration
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Pre-flight requests
app.options('*', cors());

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
});

app.use(express.json());

// Test route
app.get('/test', (_, res) => {
    res.json({ status: 'ok' });
});

// Health check route
app.get('/health', (_, res) => {
    res.status(200).json({ status: 'Backend is running' });
});

// Auth routes
app.use('/api/v1', authRouter);

// Content routes
app.use('/api/v1/content', contentRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Error handling middleware
interface Error {
    message?: string;
    status?: number;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

export default app;
