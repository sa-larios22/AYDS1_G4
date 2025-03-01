import { useEffect, useState } from 'react';
import { fetchFlights } from '../api/fetchFlights';

export const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFlights = async () => {
      try {
        const data = await fetchFlights();
        setFlights(data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los vuelos.');
      } finally {
        setLoading(false);
      }
    };

    getFlights();
  }, []);

  if (loading) {
    return <div>Cargando vuelos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Estado de Vuelos</h2>
      {flights.length === 0 ? (
        <p>No hay vuelos disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Salida</th>
              <th>Llegada</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Puerta</th>
              <th>Boletos Vendidos</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(flight => (
              <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{new Date(flight.departure).toLocaleString()}</td>
                <td>{new Date(flight.arrival).toLocaleString()}</td>
                <td>${flight.price}</td>
                <td>{flight.status}</td>
                <td>{flight.gate?.name || "No asignada"}</td>
                <td>{flight.soldTickets}/{flight.maxPassengers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};