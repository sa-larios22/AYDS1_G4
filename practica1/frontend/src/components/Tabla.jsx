import * as React from 'react';
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

const ticketClasses = ["Económica", "Ejecutiva", "Primera Clase"];

function createData(name, boletosd) {
  return {
    name,
    boletosd,
    history: [
      {
        date: '2020-01-05',
        time: '10:00 AM',
        price: 240,
      },
    ],
  };
}

function Row(props) {
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
          {row.name}
        </TableCell>
        <TableCell align="right">
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
        <TableCell align="center">{row.boletosd[selectedClassIndex]}</TableCell>
        <TableCell align="right">
          <IconButton color="primary">
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
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="right">{historyRow.time}</TableCell>
                      <TableCell align="right">{historyRow.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    boletosd: PropTypes.arrayOf(PropTypes.number).isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('Dubai', [6, 4, 2]),
  createData('Francia', [16, 10, 5]),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
      <TableHead>
          <TableRow sx={{ backgroundColor: '#1976d2' }}>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Destino</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Tipo</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Boletos Disponibles</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Boleto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
