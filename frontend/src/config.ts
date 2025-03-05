export const BACKEND_URL = process.env.NODE_ENV === 'production'
    ? 'https://brainly-backend-tspz.onrender.com'
    : 'http://localhost:4000';

export const API_ROUTES = {
    signup: '/api/v1/signup',
    signin: '/api/v1/signin'
};

console.log('Environment:', process.env.NODE_ENV);
console.log('Using backend URL:', BACKEND_URL);