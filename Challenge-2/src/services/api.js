import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const todoApi = {
  getTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },
  getTodoById: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },
  createTodo: async (data) => {
    const response = await api.post('/todos', data);
    return response.data;
  },
  updateTodo: async (id, data) => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  }
};
