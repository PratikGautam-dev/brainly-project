import express from 'express';
import cors from 'cors';
import { connectDB } from './db';

async function startServer() {
    const app = express();
    const PORT = process.env.PORT || 4000;

    // Updated CORS settings
    app.use(cors({
        origin: [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://brainly-project.vercel.app',
            'https://brainly-frontend.vercel.app'
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }));
    app.use(express.json());

    // Health check
    app.get('/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // MongoDB connection check
    let isConnected = false;
    
    while (!isConnected) {
        console.log('Attempting to connect to MongoDB...');
        isConnected = await connectDB();
        
        if (!isConnected) {
            console.log('Retrying in 5 seconds...');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    // Routes
    app.use('/api/v1', require('./routes/auth').default);
    app.use('/api/v1/content', require('./routes/content').default);

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer().catch(console.error);
