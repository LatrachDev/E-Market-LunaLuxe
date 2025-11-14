import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
// const API_BASE_URL = 'http://16.16.253.155:8000/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        SIGNUP: "/auth/register",
    },
    PRODUCTS: {
        GET_ALL: "/products",
        GET_ONE: "/products/:id",
    },
    PROFILE: {
        MYPROFILE: "/auth/profile",
    }
};

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

export default API_ENDPOINTS;