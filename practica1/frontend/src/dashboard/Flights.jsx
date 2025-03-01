import { useEffect, useState } from 'react';
import { fetchFlights } from '../api/fetchFlights';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

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
    return <div className="loading">Cargando vuelos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (

    <TableContainer  component={Paper} sx={{ mt: 3, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Estado de Vuelos
      </Typography>
      {
        loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          flights.length === 0 ? (
            <Typography variant='h6'>No hay vuelos disponibles.</Typography>
          ) : (
            <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Origen</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Destino</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Salida</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Llegada</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Precio</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Puerta</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Boletos Vendidos</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                flights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>{flight.id}</TableCell>
                    <TableCell>{flight.origin}</TableCell>
                    <TableCell>{flight.destination}</TableCell>
                    <TableCell>{new Date(flight.departure).toLocaleString()}</TableCell>
                    <TableCell>{new Date(flight.arrival).toLocaleString()}</TableCell>
                    <TableCell>${flight.price}</TableCell>
                    <TableCell>{flight.status}</TableCell>
                    <TableCell>{flight.gate?.name || "No asignada"}</TableCell>
                    <TableCell>{flight.soldTickets}/{flight.maxPassengers}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          )
        )
      }
    </TableContainer>

    // <div>
    //   <h2>Estado de Vuelos</h2>
    //   {flights.length === 0 ? (
    //     <p>No hay vuelos disponibles.</p>
    //   ) : (
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>ID</th>
    //           <th>Origen</th>
    //           <th>Destino</th>
    //           <th>Salida</th>
    //           <th>Llegada</th>
    //           <th>Precio</th>
    //           <th>Estado</th>
    //           <th>Puerta</th>
    //           <th>Boletos Vendidos</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {flights.map(flight => (
    //           <tr key={flight.id}>
    //             <td>{flight.id}</td>
    //             <td>{flight.origin}</td>
    //             <td>{flight.destination}</td>
    //             <td>{new Date(flight.departure).toLocaleString()}</td>
    //             <td>{new Date(flight.arrival).toLocaleString()}</td>
    //             <td>${flight.price}</td>
    //             <td>{flight.status}</td>
    //             <td>{flight.gate?.name || "No asignada"}</td>
    //             <td>{flight.soldTickets}/{flight.maxPassengers}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
  );
};