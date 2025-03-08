import express from 'express';
import cors from 'cors';
import { connectDB } from './db';

const app = express();
const PORT = process.env.PORT || 4000;

// Add Vercel-specific CORS settings
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://brainly-project.vercel.app',
        'https://brainly-frontend.vercel.app'
    ],
    credentials: true
}));

app.use(express.json());

// Health check for Vercel
app.get('/api/health', (_, res) => {
    res.json({ status: 'ok', deployment: 'Vercel' });
});

// Start server
connectDB().then(() => {
    app.use('/api/v1', require('./routes/auth').default);
    
    if (process.env.VERCEL) {
        // Export for Vercel serverless deployment
        module.exports = app;
    } else {
        // Start server for local development
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
}).catch(error => {
    console.error('Failed to start:', error);
    process.exit(1);
});

// Export for Vercel
export default app;
