import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { PaymentService } from "../../service/paymentService";

export function HistorialPagos(){
  const [payments, setPayments] = useState([
    { id: 1, username: "Juan", amount: 120.5, date: "2024-02-28" },
    { id: 2, username: "Ana", amount: 250.75, date: "2024-02-27" },
    { id: 3, username: "Carlos", amount: 98.0, date: "2024-02-26" },
  ]);

  const paymentService = PaymentService();

  useEffect(() => {
    const getPayments = async () => {
      const data = await paymentService.getPayments();
      if (!data) {
        return;
      }
      setPayments(data);
    }
    getPayments();
  }, [])

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Usuario", width: 250 },
    { field: "amount", headerName: "Monto (Q)", width: 200, type: "number" },
    { field: "date", headerName: "Fecha", width: 200},
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: '800px' }}>
      <h2>Historial de pagos</h2>
      <DataGrid
        rows={payments}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}