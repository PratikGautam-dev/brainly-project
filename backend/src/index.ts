import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
    origin: ['https://brainly-project.vercel.app', 'http://localhost:5173'],
    credentials: true
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
