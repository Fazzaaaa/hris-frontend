import api from '../lib/axios';

export async function loginAdmin(email, password) {
  await api.get('/sanctum/csrf-cookie');
  return api.post('/api/login-admin', { email, password });
}
export async function loginEmployee(email, password) {
  await api.get('/sanctum/csrf-cookie');
  return api.post('/api/login-employee', { email, password });
}

export async function getUser() {
  const response = await api.get('/api/me');
  return response.data;
}

export async function logout() {
  return api.post('/api/logout');
}

export async function registerAdmin(data) {
  await api.get('/sanctum/csrf-cookie');
  return api.post('/api/register', data);                                    
}
