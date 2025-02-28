import axios from 'axios';

export function UserService() {
  const API = 'http://localhost:3000/api/auth';
  const getUsers = async (limit, offset) => {
    try {
      const response = await axios.get(`${API}`, {
        limit: limit,
        offset: offset,
      });
      return response.data;
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await axios.patch(`${API}/delete/${id}`);
      return response.data; 
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }

  return {getUsers, deleteUser};
}