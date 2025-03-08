export const BACKEND_URL = process.env.NODE_ENV === 'production'
    ? 'https://brainly-backend-alpha.vercel.app'
    : 'http://localhost:4000';

export const API_ROUTES = {
    signup: '/api/v1/signup',
    signin: '/api/v1/signin',
    content: '/api/v1/content'
};

// Add headers config for API calls
export const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include' as const
};

// Add this console log to verify the config is loading
console.log("Backend URL:", BACKEND_URL);