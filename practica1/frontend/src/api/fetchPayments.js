export const fetchPayments = async () => {
    const response = await fetch(`http://localhost:3000/api/payments`);
    return response.json();
};