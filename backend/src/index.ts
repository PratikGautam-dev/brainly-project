import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import authRouter from './routes/auth';
import contentRouter from './routes/content';
import { errorHandler } from './middleware/errorHandler';

const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();
        
        const app = express();
        const PORT = parseInt(process.env.PORT as string, 10) || 4000;

        // Middleware
        app.use(cors({
            origin: [
                'http://localhost:5173',
                'http://localhost:3000',
                'https://brainly-project.vercel.app'
            ],
            credentials: true
        }));
        app.use(express.json());

        // Routes
        app.use('/api/v1', authRouter);
        app.use('/api/v1/content', contentRouter);

        // Error handler
        app.use(errorHandler);

        // Start server
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server failed to start:', error);
        process.exit(1);
    }
};

startServer();
