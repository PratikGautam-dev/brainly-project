import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const signup = async (username: string, password: string) => {
    const response = await api.post('/auth/signup', { username, password });
    return response.data;
};

export const signin = async (username: string, password: string) => {
    const response = await api.post('/auth/signin', { username, password });
    return response.data;
};
