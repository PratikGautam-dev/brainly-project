// Use the production URL always since we're deploying
export const BACKEND_URL = 'https://brainly-backend-tspz.onrender.com';

// API endpoints
export const API_ROUTES = {
    signup: '/api/v1/signup',
    signin: '/api/v1/signin',
    content: '/api/v1/content'
};

console.log('Using backend URL:', BACKEND_URL);