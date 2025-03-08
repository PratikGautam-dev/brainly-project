import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import authRouter from './routes/auth';
import contentRouter from './routes/content';

const app = express();
const PORT = parseInt(process.env.PORT as string, 10) || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', authRouter);
app.use('/api/v1/content', contentRouter);

// Start server
connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Server failed to start:', err);
    process.exit(1);
});
