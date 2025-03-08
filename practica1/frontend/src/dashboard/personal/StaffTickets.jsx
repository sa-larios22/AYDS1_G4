import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTicker, getTickets, updateTicket, deleteTicket } from "../../service/tickerService";
import { fetchFlights } from "../../api/fetchFlights";
import { useAuth } from "../../hooks/useAuth";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const StaffTickets = () => {
  const { user } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [errorTickets, setErrorTickets] = useState("");

  const [flights, setFlights] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [errorFlights, setErrorFlights] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    price: "",
    totalSeats: "",
    flightId: "",
    userId: user?.id || "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Nuevo estado para mostrar información de disponibilidad
  const [availabilityInfo, setAvailabilityInfo] = useState({
    maxPassengers: 0,
    soldTickets: 0,
    availableSeats: 0,
  });

  useEffect(() => {
    const loadTickets = async () => {
      setLoadingTickets(true);
      try {
        const data = await getTickets(100, 0);
        setTickets(data);
      } catch (err) {
        setErrorTickets(err.message);
        showSnackbar(err.message, "error");
      } finally {
        setLoadingTickets(false);
      }
    };

    const loadFlights = async () => {
      setLoadingFlights(true);
      try {
        const data = await fetchFlights();
        setFlights(data);
      } catch (err) {
        setErrorFlights(err.message);
        showSnackbar(err.message, "error");
      } finally {
        setLoadingFlights(false);
      }
    };

    loadTickets();
    loadFlights();
  }, []);

  // Nuevo useEffect para actualizar la información de disponibilidad cuando cambia el vuelo seleccionado
  useEffect(() => {
    if (formData.flightId && flights.length > 0) {
      const selectedFlight = flights.find(f => f.id === Number(formData.flightId));
      if (selectedFlight) {
        // Calcular boletos ya vendidos para este vuelo
        const ticketsForFlight = tickets.filter(t => t.flightId === Number(formData.flightId));
        const totalSoldSeats = ticketsForFlight.reduce((sum, ticket) => {
          // Si estamos editando este ticket, no contarlo
          if (editingTicket && editingTicket.id === ticket.id) return sum;
          return sum + ticket.totalSeats;
        }, 0);
        
        // Determinar asientos disponibles
        const maxSeats = selectedFlight.maxPassengers || 0;
        const soldSeats = totalSoldSeats || 0;
        const availableSeats = maxSeats - soldSeats;
        
        setAvailabilityInfo({
          maxPassengers: maxSeats,
          soldTickets: soldSeats,
          availableSeats: availableSeats
        });
      }
    }
  }, [formData.flightId, flights, tickets, editingTicket]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getFlightDetails = (flightId) => {
    const flight = flights.find((f) => f.id === flightId);
    return flight
      ? `${flight.origin} - ${flight.destination} (${new Date(flight.departure).toLocaleString()})`
      : `ID: ${flightId}`;
  };

  // Función para obtener detalles de disponibilidad del vuelo
  const getFlightAvailability = (flightId) => {
    const flight = flights.find((f) => f.id === flightId);
    if (!flight) return "";

    const maxPassengers = flight.maxPassengers || 0;
    
    // Calcular asientos vendidos para este vuelo sumando todos los tickets
    const ticketsForFlight = tickets.filter(t => t.flightId === flightId);
    const soldSeats = ticketsForFlight.reduce((sum, ticket) => sum + ticket.totalSeats, 0);
    
    const availableSeats = maxPassengers - soldSeats;
    const availability = `${soldSeats}/${maxPassengers} (Disponibles: ${availableSeats})`;
    
    return availability;
  };

  const handleOpenModal = () => {
    setEditingTicket(null);
    setFormData({
      type: "",
      price: "",
      totalSeats: "",
      flightId: "",
      userId: user?.id || "",
    });
    setOpenModal(true);
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setFormData({
      type: ticket.type,
      price: ticket.price,
      totalSeats: ticket.totalSeats,
      flightId: ticket.flightId,
      userId: user?.id || "",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingTicket(null);
    setFormData({
      type: "",
      price: "",
      totalSeats: "",
      flightId: "",
      userId: user?.id || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir price, totalSeats y userId a números
    const price = Number(formData.price);
    const totalSeats = Number(formData.totalSeats);
    const userId = Number(formData.userId);
    const flightId = Number(formData.flightId);

    // Validaciones básicas
    if (isNaN(price) || price <= 0) {
      showSnackbar("El precio debe ser un número positivo.", "error");
      return;
    }

    if (isNaN(totalSeats) || totalSeats <= 0) {
      showSnackbar("El total de asientos debe ser un número positivo.", "error");
      return;
    }

    if (isNaN(userId) || userId <= 0) {
      showSnackbar("El ID de usuario debe ser un número válido.", "error");
      return;
    }

    // NUEVA VALIDACIÓN: Verificar si hay suficientes asientos disponibles
    if (totalSeats > availabilityInfo.availableSeats) {
      showSnackbar(`No hay suficientes asientos disponibles. Solo quedan ${availabilityInfo.availableSeats} asientos.`, "error");
      return;
    }

    try {
      if (editingTicket) {
        // Si estamos editando, verificar si el nuevo número de asientos es mayor que el anterior
        const seatDifference = totalSeats - editingTicket.totalSeats;
        
        // Solo validamos si estamos aumentando el número de asientos
        if (seatDifference > 0 && seatDifference > availabilityInfo.availableSeats) {
          showSnackbar(`No puedes agregar ${seatDifference} asientos más. Solo hay ${availabilityInfo.availableSeats} disponibles.`, "error");
          return;
        }
        
        // Actualizar un ticket existente
        const updated = await updateTicket(editingTicket.id, {
          type: formData.type,
          price: price,
          totalSeats: totalSeats,
          flightId: flightId,
        });
        
        setTickets((prev) =>
          prev.map((ticket) => (ticket.id === editingTicket.id ? updated : ticket))
        );
        showSnackbar("Ticket actualizado correctamente.", "success");
      } else {
        // Crear un nuevo ticket
        const newTicket = await createTicker({
          type: formData.type,
          price: price,
          totalSeats: totalSeats,
          flightId: flightId,
          userId: userId,
        });
        
        setTickets((prev) => [...prev, newTicket]);
        showSnackbar("Ticket creado correctamente.", "success");
      }
      
      handleCloseModal();
    } catch (err) {
      console.error("Error al enviar formulario:", err);
      showSnackbar(err.message, "error");
    }
  };

  const handleDelete = async (ticketId) => {
    if (window.confirm("¿Estás seguro de eliminar este ticket?")) {
      try {
        await deleteTicket(ticketId);
        setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
        showSnackbar("Ticket eliminado correctamente.", "success");
      } catch (err) {
        console.error("Error al eliminar ticket:", err);
        showSnackbar(err.message, "error");
      }
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Gestión de Tickets
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        sx={{ mb: 2 }}
      >
        Crear Ticket
      </Button>

      {loadingTickets ? (
        <Paper sx={{ p: 2, textAlign: "center", mt: 3 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Cargando tickets...
          </Typography>
        </Paper>
      ) : errorTickets ? (
        <Paper sx={{ p: 2, mt: 3 }}>
          <Typography variant="body1" color="error">
            {errorTickets}
          </Typography>
        </Paper>
      ) : tickets.length === 0 ? (
        <Typography variant="h6">No hay tickets disponibles.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Ticket ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tipo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Precio</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Asientos</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Vuelo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Ocupación</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.type}</TableCell>
                  <TableCell>${ticket.price}</TableCell>
                  <TableCell>{ticket.totalSeats}</TableCell>
                  <TableCell>{getFlightDetails(ticket.flightId)}</TableCell>
                  <TableCell>{getFlightAvailability(ticket.flightId)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(ticket)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(ticket.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {editingTicket ? "Editar Ticket" : "Crear Ticket"}
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <FormControl fullWidth required>
              <InputLabel id="type-select-label">Tipo</InputLabel>
              <Select
                labelId="type-select-label"
                name="type"
                value={formData.type}
                label="Tipo"
                onChange={handleChange}
              >
                <MenuItem value="ECONOMY">ECONOMY</MenuItem>
                <MenuItem value="BUSINESS">BUSINESS</MenuItem>
                <MenuItem value="FIRST_CLASS">FIRST_CLASS</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Precio"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Total Asientos"
              name="totalSeats"
              type="number"
              value={formData.totalSeats}
              onChange={handleChange}
              required
              inputProps={{ min: 0 }}
              helperText={formData.flightId ? `Asientos disponibles: ${availabilityInfo.availableSeats}` : ""}
              error={Number(formData.totalSeats) > availabilityInfo.availableSeats}
            />
            <FormControl fullWidth required>
              <InputLabel id="flight-select-label">Vuelo</InputLabel>
              {loadingFlights ? (
                <CircularProgress size={24} />
              ) : (
                <Select
                  labelId="flight-select-label"
                  name="flightId"
                  value={formData.flightId}
                  label="Vuelo"
                  onChange={handleChange}
                >
                  {flights.map((flight) => (
                    <MenuItem key={flight.id} value={flight.id}>
                      {flight.origin} - {flight.destination} (
                      {new Date(flight.departure).toLocaleString()})
                      {' - '} Disponibles: {
                        (flight.maxPassengers || 0) - 
                        tickets.filter(t => t.flightId === flight.id && (!editingTicket || editingTicket.id !== t.id))
                              .reduce((sum, t) => sum + t.totalSeats, 0)
                      } de {flight.maxPassengers || 0}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            
            {/* Información de disponibilidad */}
            {formData.flightId && (
              <Paper sx={{ p: 2, bgcolor: availabilityInfo.availableSeats > 0 ? '#e8f5e9' : '#ffebee' }}>
                <Typography variant="body2">
                  <strong>Capacidad máxima:</strong> {availabilityInfo.maxPassengers} pasajeros
                </Typography>
                <Typography variant="body2">
                  <strong>Asientos vendidos:</strong> {availabilityInfo.soldTickets} asientos
                </Typography>
                <Typography variant="body2">
                  <strong>Asientos disponibles:</strong> {availabilityInfo.availableSeats} asientos
                </Typography>
              </Paper>
            )}
            
            <TextField
              label="User ID"
              name="userId"
              type="number"
              value={formData.userId}
              InputProps={{ readOnly: true }}
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={formData.flightId && Number(formData.totalSeats) > availabilityInfo.availableSeats}
            >
              {editingTicket ? "Actualizar Ticket" : "Crear Ticket"}
            </Button>
          </form>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StaffTickets;