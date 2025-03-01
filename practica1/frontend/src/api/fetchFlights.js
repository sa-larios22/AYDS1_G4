export const fetchFlights = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/ticket`);
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      } catch (error) {
        console.error('Error al obtener los tickets:', error);
        throw error;
      }
};

