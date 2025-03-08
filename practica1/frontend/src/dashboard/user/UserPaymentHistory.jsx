import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { fetchPayments } from "../../api/fetchPayments";
import { useAuth } from "../../hooks";

export const UserPaymentHistory = () => {
  const { user } = useAuth();
  const user_id = user.id;
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const allPayments = await fetchPayments();

        console.log({allPayments})

        setPayments(allPayments);

        // Filtra los pagos que coincidan con la ID del usuario en sesión.
        const userPayments = allPayments.filter(
          (payment) => payment.order.userId === user_id
        );

        setPayments(userPayments);

        console.log(payments)
      } catch (error) {
        console.error("Error al cargar los pagos:", error);
      }
    };

    if (user_id) loadPayments();
  }, [user_id]);

  return (
    <div style={{ margin: "20px" }}>
      <h1>Historial de Pagos</h1>
      
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>ID Pago</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Monto</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Tipo</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>ID Orden</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            payments.map((payment) => (
                <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleString()}</TableCell>
                <TableCell>
                    {
                        payment.type === "CASH" ? "Efectivo" : (
                            payment.type === "CREDIT_CARD" ? "Tarjeta de Crédito" : "Tarjeta de Débito"
                        )
                    }
                </TableCell>
                <TableCell>{payment.orderId}</TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default UserPaymentHistory;
