import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { User } from './models/user';
import jwt from 'jsonwebtoken';

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

// Auth routes
app.post('/api/v1/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
});

app.post('/api/v1/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret');
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error signing in" });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

export default app;
