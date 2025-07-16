import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach Bearer token

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    console.log('➡️ Request:', req.method?.toUpperCase(), req.url, req.data); // ✅ debug log
    return req;
});



export default API;
