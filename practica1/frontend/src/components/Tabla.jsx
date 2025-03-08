import React, { useState, useEffect } from 'react';
import { fetchFlights } from '../api/fetchFlights'; 
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TextField from '@mui/material/TextField';
import { Select, MenuItem as MuiMenuItem, FormControl, InputLabel } from '@mui/material';
import { useAuth } from '../hooks';

const ticketClasses = ["Económica", "Ejecutiva", "Primera Clase"];
const paymentTypes = ["CASH", "CREDIT_CARD", "DEBIT_CARD"];

function CollapsibleTable() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [departureHour, setDepartureHour] = useState('');
  const [paymentType, setPaymentType] = useState('CREDIT_CARD'); 

  const { user } = useAuth();

  useEffect(() => {
    fetchFlights()
      .then((data) => {
        setTickets(data);
        setFilteredTickets(data); 
      })
      .catch((error) => console.error('Error al obtener los tickets:', error));
  }, []);

  const handleFilter = () => {
    const filtered = tickets.filter((ticket) => {
      const flightDate = ticket.departure.split('T')[0]; 
      const flightHour = ticket.departure.split('T')[1].split(':').slice(0, 2).join(':'); 

      const matchesDate = departureDate ? flightDate === departureDate : true;
      const matchesHour = departureHour ? flightHour === departureHour : true;

      return matchesDate && matchesHour;
    });

    setFilteredTickets(filtered);
  };

  const Row = (props) => {
    const [quantity, setQuantity] = useState(1);

    const handleBuyTicket = async () => {
      const uniqueOrderId = `${String(row.id)}-${Date.now()}`;
      const userId = row.created_by; 
  
      const orderDetails = [
        {
          quantity: Number(quantity), 
          price: row.price,
          ticketId: row.id,
        }
      ];
  
      const postData = {
        userId: user.id, 
        orderDetails: orderDetails,
      };
  
      console.log("Datos enviados para la compra:", postData);
  
      try {
        const response = await fetch("http://localhost:3000/api/ticket/shop", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        const orderResponse = await response.json()
        console.log('response', orderResponse)

        const payment = await fetch("http://localhost:3000/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: row.price * 2, 
            date: new Date().toISOString(), 
            type: paymentType, 
            orderId: orderResponse.id,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error en la compra: ${response.statusText}`);
        }
  
        alert("Compra exitosa. ID de orden: " + orderResponse.id);
      } catch (error) {
        console.error("Error al procesar la compra:", error);
        alert("Error al realizar la compra");
      }
    };
  
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [selectedClassIndex, setSelectedClassIndex] = React.useState(0);
    const anchorRef = React.useRef(null);
    const [menuOpen, setMenuOpen] = React.useState(false);
  
    const handleToggle = () => {
      setMenuOpen((prevOpen) => !prevOpen);
    };
  
    const handleMenuItemClick = (index) => {
      setSelectedClassIndex(index);
      setMenuOpen(false);
    };
  
    console.log("Fila:", row);
    const flightDate = row.departure.split('T')[0]??'';
    const flightHour = row.departure.split('T')[1].split(':').slice(0, 2).join(':')??'';
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.origin} - {row.destination}
          </TableCell>
          <TableCell align="center">
            <ButtonGroup variant="contained" ref={anchorRef}>
              <Button>{ticketClasses[selectedClassIndex]}</Button>
              <Button
                size="small"
                aria-haspopup="menu"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper open={menuOpen} anchorEl={anchorRef.current} transition>
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper>
                    <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
                      <MenuList>
                        {ticketClasses.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedClassIndex}
                            onClick={() => handleMenuItemClick(index)}
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
          <TableCell align="center">
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{ width: 50 }}
            />
          </TableCell>
          <TableCell align="center">{row.availableSeats}</TableCell>
          <TableCell align="right">
            <FormControl fullWidth>
              <InputLabel>Tipo de Pago</InputLabel>
              <Select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                label="Tipo de Pago"
              >
                {paymentTypes.map((type) => (
                  <MuiMenuItem key={type} value={type}>
                    {type}
                  </MuiMenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton color="primary" onClick={handleBuyTicket}>
              <AddShoppingCartIcon />
              Comprar
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h7" gutterBottom component="div">
                  Detalles
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha de Salida</TableCell>
                      <TableCell align="right">Hora</TableCell>
                      <TableCell align="right">Precio ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {flightDate}
                      </TableCell>
                      <TableCell align="right">{flightHour}:00</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };
  

  Row.propTypes = {
    row: PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      availableSeats: PropTypes.number.isRequired,
      flight: PropTypes.shape({
        origin: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired,
        departure: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <TextField
          label="Filtrar por Fecha"
          type="date"
          name='Filtrar por Fecha'
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          sx={{
            marginRight: 2,
            width: 300,
          }}
        />
        <TextField
          label="Filtrar por Hora"
          type="time"
          value={departureHour}
          onChange={(e) => setDepartureHour(e.target.value)}
          sx={{
            marginRight: 2,
            width: 100,
          }}
        />
        <Button onClick={handleFilter} variant="contained" sx={{ marginLeft: 2 }}>
          Filtrar
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell />
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Destino</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Tipo</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Cantidad</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Boletos Disponibles</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Boleto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <Row key={ticket.id} row={ticket} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CollapsibleTable;
