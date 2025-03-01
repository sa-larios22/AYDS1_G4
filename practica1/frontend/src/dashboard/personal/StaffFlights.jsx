import { useState } from "react";

const StaffFlights = () => {
  // Estado para la lista de vuelos (simulación de datos)
  const [flights, setFlights] = useState([
    { id: 1, number: "A320", destination: "Ciudad de México", status: "En horario" },
    { id: 2, number: "B737", destination: "Nueva York", status: "Retrasado" },
    { id: 3, number: "E190", destination: "Madrid", status: "En horario" }
  ]);

  // Estado para el formulario de nuevo vuelo
  const [newFlight, setNewFlight] = useState({ number: "", destination: "", status: "En horario" });

  // Función para cambiar el estado de un vuelo
  const updateFlightStatus = (id, newStatus) => {
    setFlights(flights.map(flight => (flight.id === id ? { ...flight, status: newStatus } : flight)));
  };

  // Función para eliminar un vuelo
  const deleteFlight = (id) => {
    setFlights(flights.filter(flight => flight.id !== id));
  };

  // Función para agregar un nuevo vuelo
  const addFlight = (e) => {
    e.preventDefault();
    if (newFlight.number && newFlight.destination) {
      setFlights([...flights, { id: flights.length + 1, ...newFlight }]);
      setNewFlight({ number: "", destination: "", status: "En horario" }); // Resetear formulario
    }
  };

  return (
    <div style={styles.container}>
      <h1>✈️ Gestión de Vuelos</h1>
      <p>Aquí puedes gestionar y actualizar el estado de los vuelos.</p>

      {/* Formulario para agregar un nuevo vuelo */}
      <form onSubmit={addFlight} style={styles.form}>
        <input
          type="text"
          placeholder="Número de vuelo"
          value={newFlight.number}
          onChange={(e) => setNewFlight({ ...newFlight, number: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Destino"
          value={newFlight.destination}
          onChange={(e) => setNewFlight({ ...newFlight, destination: e.target.value })}
          required
        />
        <button type="submit">Agregar Vuelo</button>
      </form>

      {/* Lista de vuelos */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Número de Vuelo</th>
            <th>Destino</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.number}</td>
              <td>{flight.destination}</td>
              <td>
                <select
                  value={flight.status}
                  onChange={(e) => updateFlightStatus(flight.id, e.target.value)}
                >
                  <option value="En horario">En horario</option>
                  <option value="Retrasado">Retrasado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </td>
              <td>
                <button onClick={() => deleteFlight(flight.id)} style={styles.deleteButton}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "auto",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default StaffFlights;
