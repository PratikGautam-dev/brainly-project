import express from 'express';
import cors from 'cors';
import { connectDB } from './db';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Basic test route
app.get('/test', (_, res) => {
    res.json({ status: 'ok' });
});

// Import routes after MongoDB connection
async function initializeServer() {
    try {
        await connectDB();
        
        // Import routes after successful connection
        const authRouter = require('./routes/auth').default;
        const contentRouter = require('./routes/content').default;
        
        app.use('/api/v1', authRouter);
        app.use('/api/v1/content', contentRouter);
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

initializeServer();
