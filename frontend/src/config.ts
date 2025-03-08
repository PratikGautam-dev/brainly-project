export const BACKEND_URL = process.env.NODE_ENV === 'production'
    ? 'https://brainly-project-backend.vercel.app'  // Update this to your Vercel URL
    : 'http://localhost:4000';

// Add this console log to verify the config is loading
console.log("Backend URL:", BACKEND_URL);