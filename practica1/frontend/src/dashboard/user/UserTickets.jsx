import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchTickets } from "../../api/fetchTickets";
import { fetchPayments } from "../../api/fetchPayments";
import { fetchOrders } from "../../api/fetchOrders";
import { useAuth } from "../../hooks";

export const UserTickets = () => {
    const { user } = useAuth();
    const user_id = user.id;

    const [tickets, setTickets] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const loadTickets = async () => {
            try {
                // Puedes cargar todos los tickets si quieres, aunque no es estrictamente necesario
                const allTickets = await fetchTickets();
                
                const allPayments = await fetchPayments();
                // Filtramos solo los pagos del usuario actual
                const userPayments = allPayments.filter((payment) => payment.order.userId === user_id);
                setPayments(userPayments);

                const allOrders = await fetchOrders();
                
                // Obtenemos los IDs de las órdenes que pertenecen a este usuario
                const userOrderIds = userPayments.map((payment) => payment.orderId);

                // Filtramos en allOrders aquellas que coincidan con los IDs
                const userOrders = allOrders.filter((order) => userOrderIds.includes(order.id));

                // "Aplanamos" los detalles de cada órden para obtener sus tickets
                const userTickets = userOrders.flatMap((order) =>
                    order.details.map((detail) => ({
                        ticketId: detail.ticket.id,
                        type: detail.ticket.type,
                        price: detail.price,
                        purchaseDate: order.payment?.date,
                        flightId: detail.ticket.flight.id,
                        origin: detail.ticket.flight.origin,
                        destination: detail.ticket.flight.destination,
                        departure: detail.ticket.flight.departure
                    }))
                );

                setTickets(userTickets);
            } catch (error) {
                console.error(error);
            }
        };

        loadTickets();
    }, [user_id]);

    return (
        <Table>
            <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Tipo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Precio</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Fecha de Compra</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID de Vuelo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Origen</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Destino</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Fecha de Salida</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tickets.map((ticket, index) => (
                    <TableRow key={index}>
                        <TableCell>{ticket.ticketId}</TableCell>
                        <TableCell>
                            {
                                ticket.type === 'ECONOMY' ? 'Económico' :
                                    ticket.type === 'BUSINESS' ? 'Negocios' :
                                        ticket.type === 'FIRST_CLASS' ? 'Primera Clase' : 'No especificado'
                            }
                        </TableCell>
                        <TableCell>{ticket.price}</TableCell>
                        <TableCell>{new Date(ticket.purchaseDate).toLocaleString()}</TableCell>
                        <TableCell>{ticket.flightId}</TableCell>
                        <TableCell>{ticket.origin}</TableCell>
                        <TableCell>{ticket.destination}</TableCell>
                        <TableCell>{new Date(ticket.departure).toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UserTickets;
