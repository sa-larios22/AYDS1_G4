import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

export function InformeIngresos() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-02-28", client: "Juan Pérez", amount: 150.0, method: "Tarjeta" },
    { id: 2, date: "2024-02-27", client: "Ana Gómez", amount: 200.5, method: "Efectivo" },
    { id: 3, date: "2024-02-26", client: "Carlos López", amount: 300.0, method: "Transferencia" },
    { id: 4, date: "2024-02-25", client: "María Torres", amount: 120.75, method: "Tarjeta" },
  ]);

  const columns = [
    {
      field: "date",
      headerName: "Fecha",
      width: 150,
      type: "date",
      valueGetter: (params) => new Date(params.row.date), // Convierte la fecha a un objeto Date
    },
    { field: "client", headerName: "Cliente", width: 200 },
    { field: "amount", headerName: "Monto ($)", width: 150, type: "number" },
    { field: "method", headerName: "Método de Pago", width: 180 },
  ];

  return (
    <Box sx={{ width: "100%", p: 2 }}>
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
}