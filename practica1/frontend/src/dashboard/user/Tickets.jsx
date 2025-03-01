import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchTickets } from "../../api/fetchTickets";
import { fetchUsers } from "../../api/fetchUsers";
import { fetchPayments } from "../../api/fetchPayments";
import { useAuth } from "../../hooks";

export const Tickets = () => {

    const { user } = useAuth();
    const id = user.id;

    const [tickets, setTickets] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {

        const loadTickets = async () => {
            try {
                const allTickets = await fetchTickets();
                const userTickets = allTickets.filter((ticket) => ticket.created_by === id);
                setTickets(userTickets);

                const allPayments = await fetchPayments();
                const myTickets = tickets.map((ticket) => {
                    

                })

                const userPayments = allPayments.filter((payment) => payment.order.orderId === id);
                setPayments(userPayments);
            } catch (error) {
                console.error(error);
            }
        };

        loadTickets();
        
    }, [id]);

    // fetchPayments
    /*
        [
            {
                "id": 1,
                "amount": 100,
                "date": "2025-02-25T12:00:00.000Z",
                "type": "CREDIT_CARD",
                "orderId": 2,
                "order": {
                "id": 2,
                "amount": 2,
                "total": 75,
                "userId": 2
                }
            }
        ]
    */

    // fetchTickets
    /*
        [
            {
                "id": 1,
                "type": "ECONOMY",
                "price": 50,
                "availableSeats": 100,
                "soldSeats": 0,
                "totalSeats": 100,
                "active": true,
                "created_by": 2,
                "flightId": 1,
                "flight": {
                "id": 1,
                "origin": "Los Angeles",
                "destination": "Tokyo",
                "departure": "2025-07-01T12:00:00.000Z",
                "arrival": "2025-07-01T20:00:00.000Z",
                "price": 700,
                "status": "SCHEDULED",
                "maxPassengers": 250,
                "soldTickets": 100,
                "GateId": null
                }
            },
            {
                "id": 2,
                "type": "ECONOMY",
                "price": 50,
                "availableSeats": 100,
                "soldSeats": 0,
                "totalSeats": 100,
                "active": true,
                "created_by": 2,
                "flightId": 1,
                "flight": {
                "id": 1,
                "origin": "Los Angeles",
                "destination": "Tokyo",
                "departure": "2025-07-01T12:00:00.000Z",
                "arrival": "2025-07-01T20:00:00.000Z",
                "price": 700,
                "status": "SCHEDULED",
                "maxPassengers": 250,
                "soldTickets": 100,
                "GateId": null
                }
            }
        ]
    */

    // fetchUsers
    /*
        [
            {
                "id": 2,
                "name": "Rosemarie Wisozk",
                "lastname": "Shanahan",
                "email": "richmond32@hotmail.com",
                "username": "Lindgren6",
                "role": "USER"
            },
            {
                "id": 3,
                "name": "Rosemarie Wisozk",
                "lastname": "Shanahan",
                "email": "richmond33@hotmail.com",
                "username": "Keeley",
                "role": "PERSONAL"
            }
        ]
    */

    return (
        <Table>
            <TableHead>
                <TableRow  sx={{ backgroundColor: '#1976d2' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Tipo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Precio</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Activo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Fecha de Compra</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID de Vuelo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Origen</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Destino</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Fecha de Salida</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    console.log(payments)
                }
                {
                    
                    tickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell>{ticket.id}</TableCell>
                            <TableCell>{ticket.type}</TableCell>
                            <TableCell>{ticket.price}</TableCell>
                            <TableCell>{ticket.active ? "Sí" : "No"}</TableCell>
                            <TableCell>{ticket.date}</TableCell>
                            <TableCell>{ticket.flightId}</TableCell>
                            <TableCell>{ticket.flight?.origin}</TableCell>
                            <TableCell>{ticket.flight?.destination}</TableCell>
                            <TableCell>{ticket.flight?.departure}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default Tickets;