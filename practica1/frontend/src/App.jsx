import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Feed from "./interfaces/Feed";
import FlightStatus from "./interfaces/FlightStatus";
import Comprar from "./interfaces/Comprar";
import TicketStatus from "./interfaces/TicketStatus";

export const App = () => {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router> {}
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Navbar />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode} />
            <Box flex={4} p={2}>
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/comprar" element={<Comprar />} />
                <Route path="/estado_vuel0os" element={<FlightStatus />} />
                <Route path="/estado_boletos" element={<TicketStatus />} />
              </Routes>
            </Box>
          </Stack>
        </Box>
      </Router> {}
    </ThemeProvider>
  );
};

export default App;
