import axios from 'axios';
import { API_BASE_URL } from './constants'; // Assuming you have the API_BASE_URL correctly set

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error('Failed to add user:', error);
    throw error;
  }
};

export const editUser = async (user) => {
  try {
    console.log('Editing user:', user); // Debugging line
    const response = await axios.put(`${API_BASE_URL}/users/${user.id}`, user);
    console.log('User updated:', response.data); // Debugging line
    return response.data;
  } catch (error) {
    console.error('Failed to edit user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};
