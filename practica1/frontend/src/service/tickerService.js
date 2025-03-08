const TICKET_API = "http://localhost:3000/api/ticket";

// Crear un ticket
export const createTicker = async (ticketData) => {
  try {
    const response = await fetch(`${TICKET_API}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData), // Envía el JSON con userId
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear ticket");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createTicker:", error);
    throw error;
  }
};

// Actualizar un ticket
export const updateTicket = async (id, updateData) => {
  try {
    const response = await fetch(`${TICKET_API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: updateData.type,
        price: updateData.price,
        totalSeats: updateData.totalSeats,
        flightId: updateData.flightId,
      }), // Envía el JSON en el formato correcto
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar ticket");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in updateTicket:", error);
    throw error;
  }
};

// Eliminar un ticket
export const deleteTicket = async (id) => {
  try {
    const response = await fetch(`${TICKET_API}/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar ticket");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in deleteTicket:", error);
    throw error;
  }
};

// Obtener tickets
export const getTickets = async (limit, offset) => {
  try {
    const response = await fetch(`${TICKET_API}?limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener tickets");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getTickets:", error);
    throw error;
  }
};