import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
    origin: ['https://brainly-project.vercel.app', 'http://localhost:5173'],
    credentials: true
}));

app.use(express.json());

// Test route
app.get('/api/test', (_, res) => {
    res.json({ status: 'ok' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRouter = require('./routes/auth').default;
app.use('/api/v1', authRouter);

// Export for Vercel serverless deployment
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(4000, () => console.log('Local server running on port 4000'));
}
