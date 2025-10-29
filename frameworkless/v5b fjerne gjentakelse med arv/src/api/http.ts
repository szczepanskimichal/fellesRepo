import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000, // Shorter timeout to fail faster for testing
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  async get<T>(url: string): Promise<T> {
    const response = await http.get(url);
    return response.data;
  },

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await http.post(url, data);
    return response.data;
  },

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await http.put(url, data);
    return response.data;
  },

  async delete<T>(url: string): Promise<T> {
    const response = await http.delete(url);
    return response.data;
  },
};