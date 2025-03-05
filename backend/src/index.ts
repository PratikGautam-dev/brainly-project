import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import authRouter from './routes/auth';
import contentRouter from './routes/content';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', authRouter);
app.use('/api/v1/content', contentRouter);

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok' }));

// Error handler
app.use(errorHandler);

// Connect to MongoDB and start server
connectDB()
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });
