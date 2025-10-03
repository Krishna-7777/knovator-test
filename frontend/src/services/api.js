import axios from 'axios';

let baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

// Created axios instance with base backendURL picked from .env
const api = axios.create({
    baseURL,
});

export default api;