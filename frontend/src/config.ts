const isDevelopment = process.env.NODE_ENV === 'development';

export const BACKEND_URL = isDevelopment 
    ? 'http://localhost:4000'
    : 'https://brainly-backend-tspz.onrender.com';

export const API_ROUTES = {
    signup: '/api/v1/signup',
    signin: '/api/v1/signin'
};

console.log('Environment:', process.env.NODE_ENV);
console.log('Using backend URL:', BACKEND_URL);