export const BACKEND_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-production-backend-url.com'  // Update this with your actual production URL
    : 'http://localhost:3000';  // Update this with your local backend port

// Add this console log to verify the config is loading
console.log("Backend URL:", BACKEND_URL);