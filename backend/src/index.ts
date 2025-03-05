import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { connectDB } from './db';
import authRouter from './routes/auth';
import contentRouter from './routes/content';

config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://brainly-project.vercel.app'
    ],
    credentials: true
}));

app.use(express.json());

// Test route
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/v1', authRouter);
app.use('/api/v1/content', contentRouter);

// Start server only after DB connection
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
};

startServer();
