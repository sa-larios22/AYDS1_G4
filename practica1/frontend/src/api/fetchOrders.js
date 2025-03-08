export const fetchOrders = async () => {
    const response = await fetch(`http://localhost:3000/api/ticket/user/orders`);
    return response.json();
};