import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE,
});

export const inventoryApi = {
    // Отримати список усіх позицій
    getAll: () => api.get('/inventory'),

    getById: (id) => api.get(`/inventory/${id}`),

    // Створення (Multipart/form-data)
    create: (formData) => api.post('/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),

    updateText: (id, data) => api.put(`/inventory/${id}`, data),

    updatePhoto: (id, formData) => api.put(`/inventory/${id}/photo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),

    delete: (id) => api.delete(`/inventory/${id}`),
};