import { useEffect, useState } from 'react';
import { fetchFlights } from '../api/fetchFlights';

const FlightStatus = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights().then(setFlights).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Estado de Vuelos</h2>
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
    </div>
  );
};

export default FlightStatus;
