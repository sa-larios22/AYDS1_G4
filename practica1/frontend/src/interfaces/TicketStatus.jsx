import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { fetchTickets } from "../api/fetchTickets";

const TicketStatus = () => {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTickets = async () => {
            try {
                const data = await fetchTickets();
                setTickets(data);
            } catch (err) {
                setError("Error al cargar los boletos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadTickets();
    }, []);

    return (
        <TableContainer component={Paper} sx={{ mt: 3, p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Estado de Boletos
            </Typography>
            {
                loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow  sx={{ backgroundColor: '#1976d2' }}>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Tipo</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Precio</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Asientos Disponibles</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Total</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID de Vuelo</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Origen</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Destino</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell>{ticket.id}</TableCell>
                                    <TableCell>
                                        {(() => {
                                            switch (ticket.type) {
                                                case "FIRST_CLASS":
                                                    return "Primera Clase";
                                                case "BUSINESS":
                                                    return "Business";
                                                case "ECONOMY":
                                                    return "Económica";
                                                default:
                                                    return ticket.type;
                                            }
                                        })()}
                                    </TableCell>
                                    <TableCell>${ticket.price}</TableCell>
                                    <TableCell>{ticket.availableSeats}</TableCell>
                                    <TableCell>{ticket.totalSeats}</TableCell>
                                    <TableCell>{ticket.flightId}</TableCell>
                                    <TableCell>{ticket.flight.origin}</TableCell>
                                    <TableCell>{ticket.flight.destination}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )
            }
        </TableContainer>
    );
}

export default TicketStatus;