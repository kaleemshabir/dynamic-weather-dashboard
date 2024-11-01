import React from "react";
import "./App.css";
import WeatherDashboard from "./components/WeatherDashboard";
import { WeatherProvider } from "./context/WeatherContext";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

const ThemedApp: React.FC = () => {
  const { isDarkMode } = useThemeContext();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <WeatherProvider>
        <WeatherDashboard />
      </WeatherProvider>
    </MuiThemeProvider>
  );
};

export default App;
