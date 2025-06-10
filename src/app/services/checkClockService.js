import api from '@/lib/axios';

const BASE_URL = '/check-clocks';

export const getAllCheckClocks = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

export const getCheckClockById = async (id) => {
  const response = await api.get(`${BASE_URL}/show${id}`);
  return response.data;
};

export const createCheckClock = async (payload) => {
  const response = await api.post('/check-clocks/add', payload);
  return response.data;
};

export const deleteCheckClock = async (id) => {
  const response = await api.delete(`${BASE_URL}/delete${id}`);
  return response.data;
};
