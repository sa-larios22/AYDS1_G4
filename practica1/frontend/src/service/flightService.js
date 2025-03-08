// flightService.js mejorado con validaciones

const API_URL = "http://localhost:3000/api";

/**
 * Clase para manejar errores de API con mensaje personalizado
 */
class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Función auxiliar para hacer peticiones HTTP
 * @param {string} endpoint - Ruta del endpoint
 * @param {string} method - Método HTTP (GET, POST, etc.)
 * @param {object} data - Datos a enviar en la petición
 * @returns {Promise<any>} - Datos de respuesta
 */
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const responseData = response.status !== 204 ? await response.json() : null;

    if (!response.ok) {
      throw new ApiError(
        responseData?.error || `Error en la petición: ${response.status}`, 
        response.status, 
        responseData
      );
    }

    return responseData;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Error de conexión: ${error.message}`, 500);
  }
};

// ===== SERVICIOS DE VUELOS =====

/**
 * Obtiene todos los vuelos con opciones de filtrado
 * @param {object} filters - Filtros para los vuelos (origen, destino, fecha, etc.)
 * @returns {Promise<Array>} - Lista de vuelos
 */
export const fetchFlights = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  return apiRequest(`/flights${queryString}`);
};

/**
 * Obtiene un vuelo por su ID
 * @param {number|string} id - ID del vuelo
 * @returns {Promise<object>} - Datos del vuelo
 */
export const fetchFlightById = async (id) => {
  if (!id) throw new ApiError('Se requiere un ID de vuelo válido', 400);
  return apiRequest(`/flights/${id}`);
};

/**
 * Crea un nuevo vuelo
 * @param {object} flightData - Datos del vuelo
 * @returns {Promise<object>} - Vuelo creado
 */
export const createFlight = async (flightData) => {
  validateFlightData(flightData);
  return apiRequest('/flights', 'POST', flightData);
};

/**
 * Actualiza un vuelo existente
 * @param {number|string} id - ID del vuelo
 * @param {object} flightData - Datos actualizados del vuelo
 * @returns {Promise<object>} - Vuelo actualizado
 */
export const updateFlight = async (id, flightData) => {
  if (!id) throw new ApiError('Se requiere un ID de vuelo válido', 400);
  
  // Validamos que los datos estén completos
  if (!flightData.origin || !flightData.destination || 
      !flightData.departure || !flightData.arrival || 
      flightData.price === undefined || flightData.status === undefined ||
      flightData.maxPassengers === undefined || flightData.soldTickets === undefined) {
    throw new ApiError('Faltan campos requeridos para actualizar el vuelo', 400);
  }
  
  return apiRequest(`/flights/${id}`, 'PATCH', flightData);
};

/**
 * Elimina un vuelo
 * @param {number|string} id - ID del vuelo
 * @returns {Promise<number|string>} - ID del vuelo eliminado
 */
export const deleteFlight = async (id) => {
  if (!id) throw new ApiError('Se requiere un ID de vuelo válido', 400);
  await apiRequest(`/flights/${id}`, 'DELETE');
  return id;
};

/**
 * Asigna una puerta a un vuelo verificando disponibilidad
 * @param {number|string} flightId - ID del vuelo
 * @param {number|string} gateId - ID de la puerta
 * @returns {Promise<object>} - Vuelo actualizado
 */
export const assignGateToFlight = async (flightId, gateId) => {
  if (!flightId || !gateId) {
    throw new ApiError('Se requiere un ID de vuelo y un ID de puerta válidos', 400);
  }

  try {
    // Primero verificamos que la puerta existe
    const gate = await fetchGateById(gateId);
    if (!gate) {
      throw new ApiError(`La puerta con ID ${gateId} no existe`, 404);
    }

    // Obtenemos el vuelo actual
    const flight = await fetchFlightById(flightId);
    if (!flight) {
      throw new ApiError(`El vuelo con ID ${flightId} no existe`, 404);
    }

    // Verificamos si hay conflictos con otros vuelos
    const allFlights = await fetchFlights();
    const conflictingFlight = allFlights.find(
      (f) => 
        f.GateId === parseInt(gateId) && 
        f.id !== parseInt(flightId) &&
        ((new Date(f.departure) <= new Date(flight.arrival) && 
          new Date(f.arrival) >= new Date(flight.departure)))
    );

    if (conflictingFlight) {
      throw new ApiError(
        `No se puede asignar la puerta ${gate.name}. Ya está asignada al vuelo ${conflictingFlight.id} (${conflictingFlight.origin} - ${conflictingFlight.destination}) en un horario que se solapa.`, 
        409
      );
    }

    // Si no hay conflictos, procedemos con la asignación
    return apiRequest(`/flights/${flightId}/assign-gate/${gateId}`, 'PATCH');
  } catch (error) {
    // Reenvía el error original si ya es un ApiError
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Error al asignar puerta: ${error.message}`, 500);
  }
};

// ===== SERVICIOS DE PUERTAS =====

/**
 * Obtiene todas las puertas
 * @returns {Promise<Array>} - Lista de puertas
 */
export const fetchGates = async () => {
  return apiRequest('/gates');
};

/**
 * Obtiene una puerta por su ID
 * @param {number|string} id - ID de la puerta
 * @returns {Promise<object>} - Datos de la puerta
 */
export const fetchGateById = async (id) => {
  if (!id) throw new ApiError('Se requiere un ID de puerta válido', 400);
  return apiRequest(`/gates/${id}`);
};

/**
 * Crea una nueva puerta
 * @param {object} gateData - Datos de la puerta
 * @returns {Promise<object>} - Puerta creada
 */
export const createGate = async (gateData) => {
  if (!gateData?.name || !gateData.name.trim()) {
    throw new ApiError('Se requiere un nombre válido para la puerta', 400);
  }
  return apiRequest('/gates', 'POST', gateData);
};

/**
 * Actualiza una puerta existente
 * @param {number|string} id - ID de la puerta
 * @param {object} gateData - Datos actualizados de la puerta
 * @returns {Promise<object>} - Puerta actualizada
 */
export const updateGate = async (id, gateData) => {
  if (!id) throw new ApiError('Se requiere un ID de puerta válido', 400);
  if (!gateData?.name || !gateData.name.trim()) {
    throw new ApiError('Se requiere un nombre válido para la puerta', 400);
  }
  return apiRequest(`/gates/${id}`, 'PATCH', gateData);
};

/**
 * Elimina una puerta
 * @param {number|string} id - ID de la puerta
 * @returns {Promise<number|string>} - ID de la puerta eliminada
 */
export const deleteGate = async (id) => {
  if (!id) throw new ApiError('Se requiere un ID de puerta válido', 400);
  
  // Verificamos primero si la puerta está asignada a algún vuelo
  try {
    const allFlights = await fetchFlights();
    const assignedFlight = allFlights.find(flight => flight.GateId === parseInt(id));
    
    if (assignedFlight) {
      throw new ApiError(
        `No se puede eliminar la puerta porque está asignada al vuelo ${assignedFlight.id} (${assignedFlight.origin} - ${assignedFlight.destination}).`, 
        409
      );
    }
    
    await apiRequest(`/gates/${id}`, 'DELETE');
    return id;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Error al eliminar puerta: ${error.message}`, 500);
  }
};

// ===== FUNCIONES AUXILIARES =====

/**
 * Valida los datos de un vuelo
 * @param {object} flightData - Datos del vuelo a validar
 * @throws {ApiError} - Error si los datos son inválidos
 */
const validateFlightData = (flightData) => {
  const requiredFields = ['origin', 'destination', 'departure', 'arrival', 'price', 'status', 'maxPassengers', 'soldTickets'];
  const missingFields = requiredFields.filter(field => flightData[field] === undefined || flightData[field] === '');
  
  if (missingFields.length > 0) {
    throw new ApiError(`Campos requeridos faltantes: ${missingFields.join(', ')}`, 400);
  }
  
  const departureDate = new Date(flightData.departure);
  const arrivalDate = new Date(flightData.arrival);
  
  if (isNaN(departureDate) || isNaN(arrivalDate)) {
    throw new ApiError('Las fechas de salida y llegada deben ser válidas', 400);
  }
  
  if (departureDate >= arrivalDate) {
    throw new ApiError('La fecha de llegada debe ser posterior a la fecha de salida', 400);
  }
  
  if (flightData.maxPassengers < flightData.soldTickets) {
    throw new ApiError('El número de tickets vendidos no puede ser mayor que el máximo de pasajeros', 400);
  }
  
  const validStatuses = ['SCHEDULED', 'AT_GATE', 'LANDED', 'CANCELLED', 'DELAYED'];
  if (!validStatuses.includes(flightData.status)) {
    throw new ApiError(`Estado de vuelo no válido. Estados permitidos: ${validStatuses.join(', ')}`, 400);
  }
};

/**
 * Verifica si una puerta está disponible para un vuelo en un horario específico
 * @param {number|string} gateId - ID de la puerta
 * @param {number|string} flightId - ID del vuelo (opcional, para excluir en caso de actualización)
 * @param {string} departure - Fecha y hora de salida
 * @param {string} arrival - Fecha y hora de llegada
 * @returns {Promise<boolean>} - True si la puerta está disponible
 */
export const checkGateAvailability = async (gateId, flightId = null, departure, arrival) => {
  try {
    const allFlights = await fetchFlights();
    
    // Filtrar vuelos que tienen asignada la puerta
    // y que no sean el mismo vuelo que estamos verificando (en caso de actualización)
    const conflictingFlight = allFlights.find(
      (flight) => 
        flight.GateId === parseInt(gateId) && 
        (flightId === null || flight.id !== parseInt(flightId)) &&
        ((new Date(flight.departure) <= new Date(arrival) && 
          new Date(flight.arrival) >= new Date(departure)))
    );
    
    return !conflictingFlight;
  } catch (error) {
    console.error("Error al verificar disponibilidad de puerta:", error);
    return false;
  }
};

/**
 * Obtiene los vuelos programados para una fecha específica
 * @param {string} date - Fecha en formato YYYY-MM-DD
 * @returns {Promise<Array>} - Lista de vuelos para esa fecha
 */
export const fetchFlightsByDate = async (date) => {
  if (!date) throw new ApiError('Se requiere una fecha válida', 400);
  return fetchFlights({ date });
};

/**
 * Obtiene los vuelos asignados a una puerta específica
 * @param {number|string} gateId - ID de la puerta
 * @returns {Promise<Array>} - Lista de vuelos asignados a esa puerta
 */
export const fetchFlightsByGate = async (gateId) => {
  if (!gateId) throw new ApiError('Se requiere un ID de puerta válido', 400);
  
  try {
    const allFlights = await fetchFlights();
    return allFlights.filter(flight => flight.GateId === parseInt(gateId));
  } catch (error) {
    throw new ApiError(`Error al obtener vuelos por puerta: ${error.message}`, 500);
  }
};