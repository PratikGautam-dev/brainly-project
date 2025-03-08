import express from 'express';
import cors from 'cors';
import { connectDB } from './db';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://brainly-project.vercel.app'
    ],
    credentials: true
}));

app.use(express.json());

// Test route
app.get('/test', (_, res) => {
    res.json({ message: 'Server is running' });
});

// Start server
async function startServer() {
    try {
        const connected = await connectDB();
        if (!connected) {
            throw new Error('Database connection failed');
        }

        // Routes
        const authRouter = require('./routes/auth').default;
        app.use('/api/v1', authRouter);

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server failed to start:', error);
        process.exit(1);
    }
}

startServer();
