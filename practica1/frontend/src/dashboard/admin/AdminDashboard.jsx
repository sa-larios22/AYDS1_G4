import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { PaymentService } from "../../service/paymentService";

export const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-02-28", username: "Juan Pérez", amount: 150.0, type: "Tarjeta" },
    { id: 2, date: "2024-02-27", username: "Ana Gómez", amount: 200.5, type: "Efectivo" },
    { id: 3, date: "2024-02-26", username: "Carlos López", amount: 300.0, type: "Transferencia" },
    { id: 4, date: "2024-02-25", username: "María Torres", amount: 120.75, type: "Tarjeta" },
  ]);
  const paymentService = PaymentService();
  useEffect(() => {
    const getPayments = async () => {
      const data = await paymentService.getPayments();
      console.log({data});
      if (!data) {
        return;
      }

      const newData = data.map((payment) => ({
        date: new Date(payment.date).toLocaleDateString(),
        id: payment.id,
        orderId: payment.order.id,
        amount: payment.amount,
        type: payment.type
      }));

      setTransactions(newData);
    }
    getPayments();
  }, [])
  const columns = [
    { field: "id", headerName: "ID de Pago", width: 100 },
    {
      field: "date",
      headerName: "Fecha",
      width: 150
    },
    { field: "orderId", headerName: "ID de Orden", width: 100 },
    { field: "amount", headerName: "Monto (Q)", width: 150, type: "number" },
    { field: "type", headerName: "Método de Pago", width: 200 },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 800, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        📊 Informe de Ingresos Detallados
      </Typography>
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={transactions}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Box>
  );
};