import express from 'express';
import cors from 'cors';
import { connectDB } from './db';

async function startServer() {
    const app = express();
    const PORT = process.env.PORT || 4000;

    app.use(cors({
        origin: '*',  // Allow all origins temporarily for testing
        credentials: true
    }));
    app.use(express.json());

    // Health check endpoint
    app.get('/health', (_, res) => {
        res.json({ status: 'ok', time: new Date().toISOString() });
    });

    // Try connecting to MongoDB with retries
    let retries = 5;
    while (retries > 0) {
        const connected = await connectDB();
        if (connected) break;
        
        console.log(`Connection failed. Retries left: ${retries - 1}`);
        retries--;
        
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
        }
    }

    if (retries === 0) {
        console.error('Failed to connect to MongoDB after multiple attempts');
        process.exit(1);
    }

    // Routes
    app.use('/api/v1', require('./routes/auth').default);
    app.use('/api/v1/content', require('./routes/content').default);

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

startServer().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
