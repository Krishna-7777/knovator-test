import axios from 'axios';

let baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const api = axios.create({
    baseURL,
});

export default api;