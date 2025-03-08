export const fetchFlights = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/flights", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener vuelos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en fetchFlights:", error);
    throw error;
  }
};
