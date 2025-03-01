export const fetchFlights = async () => {
    const response = await fetch(`http://localhost:3000/api/flights`);
    return response.json();
};