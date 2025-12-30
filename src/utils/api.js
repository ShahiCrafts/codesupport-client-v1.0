import axios from 'axios';
import { toast } from './toastService';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle auth errors and show toast notifications
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message || 'An error occurred';

        // Handle unauthorized (401) - token expired or invalid
        if (status === 401) {
            // Clear all auth data
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('admin_token');

            toast.error('Session expired. Please log in again.');

            // Redirect to login if not already on auth pages
            if (!window.location.pathname.startsWith('/auth') &&
                window.location.pathname !== '/admin') {
                window.location.href = '/auth/login';
            }
        }
        // Handle forbidden (403) - role mismatch or insufficient permissions
        else if (status === 403) {
            toast.error('Access denied. You do not have permission for this action.');

            const user = JSON.parse(localStorage.getItem('user'));

            // If we get a 403, redirect user to their appropriate dashboard
            if (user?.role) {
                let redirectPath = '/auth/login';
                switch (user.role) {
                    case 'admin':
                        redirectPath = '/admin/dashboard';
                        break;
                    case 'developer':
                        redirectPath = '/developer';
                        break;
                    case 'client':
                        redirectPath = '/dashboard/client';
                        break;
                }

                // Only redirect if not already on the correct path
                if (!window.location.pathname.startsWith(redirectPath.split('/').slice(0, 2).join('/'))) {
                    window.location.href = redirectPath;
                }
            }
        }
        // Handle not found (404)
        else if (status === 404) {
            toast.error(message || 'Resource not found');
        }
        // Handle validation errors (400)
        else if (status === 400) {
            toast.error(message || 'Invalid request');
        }
        // Handle server errors (500)
        else if (status >= 500) {
            toast.error('Server error. Please try again later.');
        }
        // Handle network errors
        else if (!error.response) {
            toast.error('Network error. Please check your connection.');
        }

        return Promise.reject(error);
    }
);

export default api;
