import api from '@/lib/axios';

export async function loginAdmin(email, password) {
  await api.get('/sanctum/csrf-cookie');
  return api.post('/auth/login-admin', { email, password });
}
export async function loginEmployee(email, password) {
  await api.get('/sanctum/csrf-cookie');
  return api.post('/auth/login-employee', { email, password });
}

export async function getUser() {
  const response = await api.get('api/auth/me');
  return response.data;
}

export async function logout() {
  return api.post('auth/logout');
}

export async function registerAdmin(data) {
  await api.get('/sanctum/csrf-cookie');
  return api.post('/auth/register', data);                                    
}
