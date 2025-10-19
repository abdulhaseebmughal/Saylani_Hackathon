import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pitchcraft_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('pitchcraft_token');
      localStorage.removeItem('pitchcraft_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// Pitch APIs
export const pitchAPI = {
  generatePitch: (data) => api.post('/pitches/generate', data),
  getAllPitches: () => api.get('/pitches'),
  getPitchById: (id) => api.get(`/pitches/${id}`),
  updatePitch: (id, data) => api.put(`/pitches/${id}`, data),
  deletePitch: (id) => api.delete(`/pitches/${id}`),
  improvePitch: (id, data) => api.post(`/pitches/${id}/improve`, data),
  exportPitch: (id) => api.post(`/pitches/${id}/export`),
};

export default api;
