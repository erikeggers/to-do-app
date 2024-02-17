// src/api/todos.ts

import axios from 'axios';
import { Todo } from '../types/todo';

const API_URL = 'https://nanameue-front-end-candidate-test.vercel.app/api/erike';

export const newTodo = async (text: string): Promise<Todo> => {
  const response = await axios.post(`${API_URL}/todos/create`, {
    text,
  });
	
  return response.data;
};

export const toggleTodo = async (id: string): Promise<void> => {
  await axios.put(`${API_URL}/todos/${id}/toggle`);
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/todos/${id}`);
};

export const editTodo = async (id: string, text: string): Promise<void> => {
	await axios.put(`${API_URL}/todos/${id}/edit`, {
		text,
	});
};
