export const BACKEND_URL = process.env.NODE_ENV === 'production'
    ? 'https://brainly-backend-kova.vercel.app'  // Update this URL to your deployed backend URL
    : 'http://localhost:4000';

// Add this console log to verify the config is loading
console.log("Backend URL:", BACKEND_URL);