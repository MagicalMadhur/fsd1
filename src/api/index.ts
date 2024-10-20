import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username: string, password: string) =>
  api.post('/auth/login', { username, password });

export const register = (username: string, password: string, userType: string) =>
  api.post('/auth/register', { username, password, userType });

export const getJobs = () => api.get('/jobs');

export const postJob = (title: string, description: string) =>
  api.post('/jobs', { title, description });

export const applyForJob = (jobId: string) => api.post(`/jobs/${jobId}/apply`);

export default api;