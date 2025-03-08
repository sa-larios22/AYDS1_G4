import { useState, useEffect } from "react";
import {
  fetchFlights,
  createFlight,
  updateFlight,
  deleteFlight,
  assignGateToFlight,
  fetchGates,
  createGate,
  deleteGate
} from "../../service/flightService";
import "./StaffFlights.css";

const StaffFlights = () => {
  // Estados para los datos
  const [flights, setFlights] = useState([]);
  const [gates, setGates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success, error, warning
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para modales
  const [showModal, setShowModal] = useState(false); // Modal para agregar vuelo
  const [showAssignGateModal, setShowAssignGateModal] = useState(false); // Modal para asignar puerta
  const [showDeleteGateModal, setShowDeleteGateModal] = useState(false); // Modal para eliminar puerta
  const [showCreateGateModal, setShowCreateGateModal] = useState(false); // Modal para crear puerta
  const [showFlightDetailsModal, setShowFlightDetailsModal] = useState(false); // Modal para ver detalles de vuelo
  const [showManageGatesModal, setShowManageGatesModal] = useState(false); // Modal para gestionar puertas
  
  // Estados para datos temporales y selección
  const [assignFlightId, setAssignFlightId] = useState(null);
  const [assignGateId, setAssignGateId] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [gateToDelete, setGateToDelete] = useState(null);
  const [newGateName, setNewGateName] = useState("");

  // Objeto para crear un nuevo vuelo
  const [newFlight, setNewFlight] = useState({
    origin: "",
    destination: "",
    departure: "",
    arrival: "",
    price: 0,
    status: "SCHEDULED",
    maxPassengers: 0,
    soldTickets: 0,
  });

  // Función para mostrar mensajes temporales con tipo
  const showMessage = (message, type = "") => {
    setActionMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setActionMessage("");
      setMessageType("");
    }, 5000); // Mostrar mensajes por 5 segundos para mejor visibilidad
  };

  // Función para formatear fecha y hora
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    return date.toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  // Cargar datos - Vuelos y puertas
  const loadData = async () => {
    setLoading(true);
    showMessage("Cargando datos...");
    try {
      const flightsData = await fetchFlights();
      const gatesData = await fetchGates();
      flightsData.sort((a, b) => new Date(a.departure) - new Date(b.departure));
      setFlights(flightsData);
      setGates(gatesData);
      setActionMessage("");
    } catch (err) {
      showMessage("Error al cargar los datos: " + (err.message || "Error desconocido"), "error");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener vuelos y puertas al cargar el componente
  useEffect(() => {
    loadData();
  }, []);
  // Verificar si una puerta está disponible para un vuelo
  const isGateAvailable = (gateId, flightId, departure, arrival) => {
    const conflictingFlight = flights.find(
      (flight) =>
        flight.GateId === parseInt(gateId) &&
        flight.id !== parseInt(flightId) &&
        new Date(flight.departure) < new Date(arrival) &&
        new Date(flight.arrival) > new Date(departure)
    );
    return !conflictingFlight; // Devuelve true si no hay conflicto
  };

  // Asignar una puerta a un vuelo
  const handleAssignGate = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (!assignGateId) {
      showMessage("Selecciona una puerta", "warning");
      return;
    }

    const flightToAssign = flights.find((flight) => flight.id === parseInt(assignFlightId));
    if (!flightToAssign) {
      showMessage("Vuelo no encontrado", "error");
      return;
    }

    // Verificar disponibilidad de la puerta
    if (
      !isGateAvailable(
        assignGateId,
        assignFlightId,
        flightToAssign.departure,
        flightToAssign.arrival
      )
    ) {
      const gateName = gates.find(g => g.id === parseInt(assignGateId))?.name || "Seleccionada";
      showMessage(`La puerta ${gateName} no está disponible en ese horario. Hay otro vuelo programado que se solapa.`, "warning");
      return;
    }

    setIsSubmitting(true);
    showMessage("Asignando puerta...");
    try {
      const updatedFlight = await assignGateToFlight(assignFlightId, assignGateId);
      
      // Actualizar la lista de vuelos con el vuelo actualizado
      const updatedFlights = flights.map((flight) =>
        flight.id === parseInt(assignFlightId) ? updatedFlight : flight
      );
      
      updatedFlights.sort((a, b) => new Date(a.departure) - new Date(b.departure));
      setFlights(updatedFlights);
      
      const gateName = gates.find(g => g.id === parseInt(assignGateId))?.name || "Desconocida";
      showMessage(`Puerta ${gateName} asignada correctamente al vuelo ${updatedFlight.id}`, "success");
      setShowAssignGateModal(false);
    } catch (err) {
      showMessage("Error al asignar la puerta: " + (err.message || "Error desconocido"), "error");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Crear un nuevo vuelo
  const handleCreateFlight = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    // Validación básica de fechas
    const departureDate = new Date(newFlight.departure);
    const arrivalDate = new Date(newFlight.arrival);
    
    if (departureDate >= arrivalDate) {
      showMessage("La fecha de llegada debe ser posterior a la fecha de salida", "warning");
      return;
    }
    
    if (newFlight.soldTickets > newFlight.maxPassengers) {
      showMessage("El número de boletos vendidos no puede ser mayor que el máximo de pasajeros", "warning");
      return;
    }
    
    setIsSubmitting(true);
    showMessage("Creando vuelo...");
    try {
      const createdFlight = await createFlight(newFlight);
      const updatedFlights = [...flights, createdFlight];
      updatedFlights.sort((a, b) => new Date(a.departure) - new Date(b.departure));
      setFlights(updatedFlights);
      showMessage(`Vuelo creado correctamente: ${createdFlight.origin} a ${createdFlight.destination}`, "success");
      setShowModal(false); // Cierra el modal después de crear el vuelo
      
      // Reiniciar el formulario de nuevo vuelo
      setNewFlight({
        origin: "",
        destination: "",
        departure: "",
        arrival: "",
        price: 0,
        status: "SCHEDULED",
        maxPassengers: 0,
        soldTickets: 0,
      });
    } catch (err) {
      showMessage("Error al crear el vuelo: " + (err.message || "Error desconocido"), "error");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Actualizar el estado de un vuelo
  const handleUpdateFlightStatus = async (id, newStatus) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    showMessage("Actualizando estado...");
    try {
      const flightToUpdate = flights.find((flight) => flight.id === id);
      if (!flightToUpdate) {
        showMessage("Vuelo no encontrado", "error");
        return;
      }

      // Enviar el objeto completo con el nuevo estado
      const updatedFlightData = {
        origin: flightToUpdate.origin,
        destination: flightToUpdate.destination,
        departure: flightToUpdate.departure,
        arrival: flightToUpdate.arrival,
        price: flightToUpdate.price,
        status: newStatus,
        maxPassengers: flightToUpdate.maxPassengers,
        soldTickets: flightToUpdate.soldTickets,
      };

      // Si el vuelo tiene una puerta asignada, incluirla en los datos
      if (flightToUpdate.GateId) {
        updatedFlightData.GateId = flightToUpdate.GateId;
      }

      const updatedFlight = await updateFlight(id, updatedFlightData);
      const updatedFlights = flights.map((flight) =>
        flight.id === id ? updatedFlight : flight
      );
      updatedFlights.sort((a, b) => new Date(a.departure) - new Date(b.departure));
      setFlights(updatedFlights);
      showMessage(`Estado actualizado a: ${newStatus}`, "success");
    } catch (err) {
      showMessage("Error al actualizar el estado: " + (err.message || "Error desconocido"), "error");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar la eliminación de un vuelo
  const handleDeleteFlight = async (id) => {
    if (isSubmitting) return;
    
    if (window.confirm("¿Estás seguro de eliminar este vuelo?")) {
      setIsSubmitting(true);
      showMessage("Eliminando vuelo...");
      try {
        await deleteFlight(id);
        setFlights(flights.filter(flight => flight.id !== id));
        showMessage("Vuelo eliminado correctamente", "success");
      } catch (err) {
        showMessage("Error al eliminar el vuelo: " + (err.message || "Error desconocido"), "error");
        console.error("Error:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  // Eliminar una puerta
  const handleDeleteGate = async () => {
    if (!gateToDelete || isSubmitting) return;
    
    setIsSubmitting(true);
    showMessage("Eliminando puerta...");
    try {
      // Verificar si la puerta está asignada a algún vuelo
      const gateFlights = flights.filter(flight => flight.GateId === parseInt(gateToDelete));
      
      if (gateFlights.length > 0) {
        const gateName = gates.find(gate => gate.id === parseInt(gateToDelete))?.name || "Seleccionada";
        throw new Error(`No se puede eliminar la puerta ${gateName}. Está asignada a ${gateFlights.length} vuelo(s).`);
      }
      
      await deleteGate(gateToDelete);
      setGates(gates.filter((gate) => gate.id !== parseInt(gateToDelete)));
      
      const gateName = gates.find(gate => gate.id === parseInt(gateToDelete))?.name || "Seleccionada";
      showMessage(`Puerta ${gateName} eliminada correctamente`, "success");
    } catch (err) {
      showMessage("Error al eliminar la puerta: " + (err.message || "Error desconocido"), "error");
      console.error("Error:", err);
    } finally {
      setShowDeleteGateModal(false);
      setIsSubmitting(false);
    }
  };

  // Crear una nueva puerta
  const handleCreateGate = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (!newGateName.trim()) {
      showMessage("El nombre de la puerta no puede estar vacío", "warning");
      return;
    }
    
    // Verificar si ya existe una puerta con ese nombre
    const existingGate = gates.find(gate => 
      gate.name.toLowerCase() === newGateName.trim().toLowerCase()
    );
    
    if (existingGate) {
      showMessage(`Ya existe una puerta con el nombre ${newGateName}`, "warning");
      return;
    }

    setIsSubmitting(true);
    showMessage("Creando puerta...");
    try {
      const createdGate = await createGate({ name: newGateName.trim() });
      setGates([...gates, createdGate]);
      showMessage(`Puerta ${createdGate.name} creada correctamente`, "success");
      setShowCreateGateModal(false);
      setNewGateName("");
    } catch (err) {
      showMessage("Error al crear la puerta: " + (err.message || "Error desconocido"), "error");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtener el nombre de la puerta asignada
  const getGateName = (gateId) => {
    if (!gateId) return "Sin asignar";
    const gate = gates.find((gate) => gate.id === gateId);
    return gate ? gate.name : "Sin asignar";
  };

  // Abrir modal para ver detalles del vuelo
  const openFlightDetailsModal = (flight) => {
    setSelectedFlight(flight);
    setShowFlightDetailsModal(true);
  };

  // Abrir modal para asignar puerta
  const openAssignGateModal = (flightId) => {
    setAssignFlightId(flightId);
    const flight = flights.find(f => f.id === flightId);
    if (flight && flight.GateId) {
      setAssignGateId(flight.GateId.toString());
    } else {
      setAssignGateId("");
    }
    setShowAssignGateModal(true);
  };

  // Abrir modal para eliminar puerta
  const openDeleteGateModal = (gateId) => {
    setGateToDelete(gateId);
    setShowDeleteGateModal(true);
  };

  // Renderizar el estado del vuelo con color
  const renderFlightStatus = (status) => {
    let statusClass = "";
    switch (status) {
      case "SCHEDULED":
        statusClass = "status-scheduled";
        break;
      case "AT_GATE":
        statusClass = "status-at-gate";
        break;
      case "LANDED":
        statusClass = "status-landed";
        break;
      case "CANCELLED":
        statusClass = "status-cancelled";
        break;
      case "DELAYED":
        statusClass = "status-delayed";
        break;
      default:
        statusClass = "";
    }
    return <span className={`status ${statusClass}`}>{status}</span>;
  };

  return (
    <div className="container">
      <h1 className="title">✈️ Gestión de Vuelos</h1>
      {actionMessage && <p className={`message ${messageType}`}>{actionMessage}</p>}

      <div className="buttonContainer">
        <button onClick={() => setShowModal(true)} className="addButton">
          ➕ Nuevo Vuelo
        </button>
        <div>
          <button onClick={() => setShowCreateGateModal(true)} className="addButton">
            🚪 Nueva Puerta
          </button>
          <button onClick={() => setShowManageGatesModal(true)} className="manageButton">
            🔧 Gestionar Puertas
          </button>
        </div>
      </div>

      {loading ? (
        <p className="loading">⏳ Cargando vuelos...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="th">#</th>
              <th className="th">Origen</th>
              <th className="th">Destino</th>
              <th className="th">Salida</th>
              <th className="th">Llegada</th>
              <th className="th">Precio</th>
              <th className="th">Estado</th>
              <th className="th">Máx. Pasaj.</th>
              <th className="th">Vendidos</th>
              <th className="th">Puerta</th>
              <th className="th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id} className="tr">
                <td className="td">{flight.id}</td>
                <td className="td">{flight.origin}</td>
                <td className="td">{flight.destination}</td>
                <td className="td">{formatDateTime(flight.departure)}</td>
                <td className="td">{formatDateTime(flight.arrival)}</td>
                <td className="td">${flight.price}</td>
                <td className="td">
                  <select
                    value={flight.status}
                    onChange={(e) => handleUpdateFlightStatus(flight.id, e.target.value)}
                    className="select"
                  >
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="AT_GATE">AT_GATE</option>
                    <option value="LANDED">LANDED</option>
                  </select>
                </td>
                <td className="td">{flight.maxPassengers}</td>
                <td className="td">{flight.soldTickets}</td>
                <td className="td">
                  {getGateName(flight.GateId)}
                </td>
                <td className="td">
                  <button
                    onClick={() => openAssignGateModal(flight.id)}
                    className="assignButton"
                  >
                    Asignar Puerta
                  </button>
                  <button
                    onClick={() => handleDeleteFlight(flight.id)}
                    className="deleteButton"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Modal para crear vuelo */}
      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Nuevo Vuelo</h2>
            <form onSubmit={handleCreateFlight} className="modalForm">
              <label>Origen:</label>
              <input
                type="text"
                value={newFlight.origin}
                onChange={(e) => setNewFlight({ ...newFlight, origin: e.target.value })}
                className="modalInput"
                required
              />
              <label>Destino:</label>
              <input
                type="text"
                value={newFlight.destination}
                onChange={(e) => setNewFlight({ ...newFlight, destination: e.target.value })}
                className="modalInput"
                required
              />
              <label>Salida:</label>
              <input
                type="datetime-local"
                value={newFlight.departure}
                onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })}
                className="modalInput"
                required
              />
              <label>Llegada:</label>
              <input
                type="datetime-local"
                value={newFlight.arrival}
                onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })}
                className="modalInput"
                required
              />
              <label>Precio:</label>
              <input
                type="number"
                value={newFlight.price}
                onChange={(e) => setNewFlight({ ...newFlight, price: parseFloat(e.target.value) })}
                className="modalInput"
                required
              />
              <label>Estado:</label>
              <select
                value={newFlight.status}
                onChange={(e) => setNewFlight({ ...newFlight, status: e.target.value })}
                className="modalInput"
              >
                <option value="SCHEDULED">SCHEDULED</option>
                <option value="AT_GATE">AT_GATE</option>
                <option value="LANDED">LANDED</option>
              </select>
              <label>Máx. Pasajeros:</label>
              <input
                type="number"
                value={newFlight.maxPassengers}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, maxPassengers: parseInt(e.target.value, 10) })
                }
                className="modalInput"
                required
              />
              <label>Tickets Vendidos:</label>
              <input
                type="number"
                value={newFlight.soldTickets}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, soldTickets: parseInt(e.target.value, 10) })
                }
                className="modalInput"
                required
              />
              <div className="modalButtons">
                <button type="submit" className="saveButton" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="cancelButton">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para asignar puerta */}
      {showAssignGateModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Asignar Puerta</h2>
            <form onSubmit={handleAssignGate} className="modalForm">
              <label>Selecciona una puerta:</label>
              <select
                value={assignGateId}
                onChange={(e) => setAssignGateId(e.target.value)}
                className="modalInput"
                required
              >
                <option value="">Selecciona una puerta</option>
                {gates.map((gate) => (
                  <option key={gate.id} value={gate.id}>
                    {gate.name}
                  </option>
                ))}
              </select>
              <div className="modalButtons">
                <button type="submit" className="saveButton" disabled={isSubmitting}>
                  {isSubmitting ? "Asignando..." : "Asignar"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAssignGateModal(false)}
                  className="cancelButton"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para eliminar puerta */}
      {showDeleteGateModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Eliminar Puerta</h2>
            <p>¿Estás seguro de eliminar esta puerta?</p>
            <div className="modalButtons">
              <button 
                onClick={handleDeleteGate} 
                className="deleteButton"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Eliminando..." : "Eliminar"}
              </button>
              <button 
                onClick={() => setShowDeleteGateModal(false)} 
                className="cancelButton"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para crear puerta */}
      {showCreateGateModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Nueva Puerta</h2>
            <form onSubmit={handleCreateGate} className="modalForm">
              <label>Nombre de la puerta:</label>
              <input
                type="text"
                value={newGateName}
                onChange={(e) => setNewGateName(e.target.value)}
                className="modalInput"
                required
                placeholder="Ej: Gate A1"
              />
              <div className="modalButtons">
                <button type="submit" className="saveButton" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateGateModal(false)}
                  className="cancelButton"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para gestionar puertas */}
      {showManageGatesModal && (
        <div className="modalOverlay">
          <div className="modalContent modalLarge">
            <h2>Gestionar Puertas</h2>
            {gates.length === 0 ? (
              <p className="noItems">No hay puertas registradas. Crea una nueva puerta para comenzar.</p>
            ) : (
              <div className="tableWrapper">
                <table className="modalTable">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gates.map((gate) => {
                      // Verificar si la puerta está asignada a algún vuelo
                      const assignedFlight = flights.find(flight => flight.GateId === gate.id);
                      const gateStatus = assignedFlight 
                        ? `Asignada a vuelo #${assignedFlight.id} (${assignedFlight.origin} → ${assignedFlight.destination})` 
                        : "Disponible";
                      const isAssigned = !!assignedFlight;
                      
                      return (
                        <tr key={gate.id}>
                          <td>{gate.id}</td>
                          <td>{gate.name}</td>
                          <td className={isAssigned ? "gateStatusAssigned" : "gateStatusAvailable"}>
                            {gateStatus}
                          </td>
                          <td>
                            <button 
                              onClick={() => openDeleteGateModal(gate.id)}
                              className="deleteButton"
                              disabled={isAssigned}
                              title={isAssigned ? "No se puede eliminar una puerta asignada a un vuelo" : "Eliminar puerta"}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <div className="modalButtons">
              <button
                type="button"
                onClick={() => {
                  setShowManageGatesModal(false);
                  setShowCreateGateModal(true);
                }}
                className="saveButton"
              >
                Nueva Puerta
              </button>
              <button
                type="button"
                onClick={() => setShowManageGatesModal(false)}
                className="cancelButton"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver detalles del vuelo */}
      {showFlightDetailsModal && selectedFlight && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Detalles del Vuelo #{selectedFlight.id}</h2>
            <div className="flightDetails">
              <p><strong>Origen:</strong> {selectedFlight.origin}</p>
              <p><strong>Destino:</strong> {selectedFlight.destination}</p>
              <p><strong>Salida:</strong> {formatDateTime(selectedFlight.departure)}</p>
              <p><strong>Llegada:</strong> {formatDateTime(selectedFlight.arrival)}</p>
              <p><strong>Precio:</strong> ${selectedFlight.price}</p>
              <p><strong>Estado:</strong> {renderFlightStatus(selectedFlight.status)}</p>
              <p><strong>Máx. Pasajeros:</strong> {selectedFlight.maxPassengers}</p>
              <p><strong>Tickets Vendidos:</strong> {selectedFlight.soldTickets}</p>
              <p><strong>Puerta:</strong> {getGateName(selectedFlight.GateId)}</p>
            </div>
            <div className="modalButtons">
              <button
                onClick={() => setShowFlightDetailsModal(false)}
                className="cancelButton"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffFlights;