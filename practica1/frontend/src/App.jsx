import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import FlightStatus from "./components/FlightStatus";
import Comprar from "./components/Comprar";

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
                <Route path="/estado_vuelos" element={<FlightStatus />} />
                <Route path="/comprar" element={<Comprar />} />
              </Routes>
            </Box>
          </Stack>
        </Box>
      </Router> {}
    </ThemeProvider>
  );
};

export default App;
