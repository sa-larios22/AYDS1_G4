import { useEffect, useState, useRef } from "react";
import { fetchFlights } from "../api/fetchFlights";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Popper,
  MenuItem,
  MenuList,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ticketClasses = ["Económica", "Ejecutiva", "Primera Clase"];
const ticketKeys = ["economy", "business", "firstClass"];

const FlightStatus = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState({});
  const menuRefs = useRef({});

  useEffect(() => {
    // Llamada a la API para obtener los vuelos
    const getFlights = async () => {
      try {
        const data = await fetchFlights();
        setFlights(data);
        setLoading(false);

        // Inicializar estado de selección por vuelo
        setSelectedClasses(
          data.reduce((acc, flight) => {
            acc[flight.id] = 0; // Inicia con clase económica (índice 0)
            return acc;
          }, {})
        );

        menuRefs.current = data.reduce((acc, flight) => {
          acc[flight.id] = { anchorRef: null, open: false };
          return acc;
        }, {});
      } catch (err) {
        setError('Error al cargar los vuelos');
        setLoading(false);
      }
    };

    getFlights();
  }, []);

  const handleToggle = (flightId) => {
    menuRefs.current[flightId].open = !menuRefs.current[flightId].open;
    setSelectedClasses({ ...selectedClasses });
  };

  const handleMenuItemClick = (flightId, index) => {
    selectedClasses[flightId] = index;
    menuRefs.current[flightId].open = false;
    setSelectedClasses({ ...selectedClasses });
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Estado de Vuelos
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Origen</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Destino</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Salida</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Llegada</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Puerta</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Clase</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Precio</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Boletos Vendidos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight) => {
              const classIndex = selectedClasses[flight.id];
              const classKey = ticketKeys[classIndex];
              const seatInfo = flight.seats ? flight.seats[classKey] : {}; // Maneja el caso de vuelos sin información de asientos

              return (
                <TableRow key={flight.id}>
                  <TableCell>{flight.id}</TableCell>
                  <TableCell>{flight.origin}</TableCell>
                  <TableCell>{flight.destination}</TableCell>
                  <TableCell>{new Date(flight.departure).toLocaleString()}</TableCell>
                  <TableCell>{new Date(flight.arrival).toLocaleString()}</TableCell>
                  <TableCell>{flight.status}</TableCell>
                  <TableCell>{flight.gate?.name || "No asignada"}</TableCell>
                  <TableCell>
                    <ButtonGroup variant="contained" ref={(el) => (menuRefs.current[flight.id].anchorRef = el)}>
                      <Button>{ticketClasses[classIndex]}</Button>
                      <Button
                        size="small"
                        aria-controls={menuRefs.current[flight.id].open ? "split-button-menu" : undefined}
                        aria-expanded={menuRefs.current[flight.id].open ? "true" : undefined}
                        aria-haspopup="menu"
                        onClick={() => handleToggle(flight.id)}
                      >
                        <ArrowDropDownIcon />
                      </Button>
                    </ButtonGroup>
                    <Popper
                      sx={{ zIndex: 1 }}
                      open={menuRefs.current[flight.id].open}
                      anchorEl={menuRefs.current[flight.id].anchorRef}
                      role={undefined}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={() => handleToggle(flight.id)}>
                              <MenuList id="split-button-menu" autoFocusItem>
                                {ticketClasses.map((option, index) => (
                                  <MenuItem
                                    key={option}
                                    selected={index === classIndex}
                                    onClick={() => handleMenuItemClick(flight.id, index)}
                                  >
                                    {option}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </TableCell>
                  <TableCell>${seatInfo.price}</TableCell>
                  <TableCell>
                    {seatInfo.sold}/{seatInfo.capacity}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default FlightStatus;
