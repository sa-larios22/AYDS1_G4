import axios from 'axios';

export function PaymentService() {
  const API = 'http://localhost:3000/api/payments';
  const getPayments = async () => {
    try {
      const response = await axios.get(`${API}`);
      return response.data;
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }

  const deletePayment = async (id) => {
    try {
      const response = await axios.delete(`${API}/${id}`);
      return response.data; 
    } catch (error) {
      console.error('ERROR: ', error);
    }
  }

  return {getPayments, deletePayment};
}