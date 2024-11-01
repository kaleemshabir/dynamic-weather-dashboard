import { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Box,
  Alert,
  Snackbar,
  useTheme,
  Grid2,
  IconButton,
} from "@mui/material";
import WeatherCard from "./WeatherCard";
import SearchBar from "./SearchBar";
import { useWeatherContext } from "../context/WeatherContext";
import { WeatherActionType } from "../context/weatherReducer";
import { fetchWeatherData } from "../services/weatherService";
import { useThemeContext } from "../context/ThemeContext";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const WeatherDashboard = () => {
  const theme = useTheme();
  const { state, dispatch } = useWeatherContext();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedWeatherData = JSON.parse(
      localStorage.getItem("weatherData") || "[]"
    );
    if (storedWeatherData.length) {
      dispatch({
        type: WeatherActionType.SET_WEATHER_DATA,
        payload: storedWeatherData,
      });
    }
  }, [dispatch]);

  const handleAddCity = async (city: string) => {
    if (
      state.weatherData.some(
        (data) => data.city.toLowerCase() === city.toLowerCase()
      )
    ) {
      setError("City is already added!");
      setOpen(true);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchWeatherData(city);
      dispatch({ type: WeatherActionType.ADD_CITY, payload: data });
      localStorage.setItem(
        "weatherData",
        JSON.stringify([...state.weatherData, data])
      );
    } catch (error: any) {
      setError(error.message);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCity = (city: string) => {
    const updatedState = state.weatherData.filter((data) => data.city !== city);

    localStorage.setItem("weatherData", JSON.stringify(updatedState));
    dispatch({ type: WeatherActionType.REMOVE_CITY, payload: city });
  };

  const handleClose = () => setOpen(false);

  return (
    <Grid2
      container
      padding={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={2}
        sx={{
          gap: 2,
          "@media (max-width:600px)": {
            flexDirection: "column",
          },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: isDarkMode ? "grey.100" : "grey.900",
            transition: "color 0.3s ease",
            display: "flex",
            alignItems: "center",
          }}
        >
          Weather Dashboard
        </Typography>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{
            p: 1,
            transition: "all 0.3s ease",
            fontSize: "1.5rem",
            marginBottom: "12px",
            "&:hover": {
              backgroundColor: isDarkMode ? "grey.700" : "grey.300",
            },
          }}
        >
          {isDarkMode ? (
            <Brightness7Icon fontSize="inherit" />
          ) : (
            <Brightness4Icon fontSize="inherit" />
          )}
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="center" mt={2}>
        <SearchBar onAddCity={handleAddCity} loading={loading} />
      </Box>
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
      <Grid2 container spacing={2} mt={2} justifyContent="center">
        {state.weatherData.map((weatherData, index) => (
          <WeatherCard
            key={index}
            city={weatherData.city}
            temperature={weatherData.temperature}
            minTemp={weatherData.minTemp}
            maxTemp={weatherData.maxTemp}
            currentTemp={weatherData.currentTemp}
            humidity={weatherData.humidity}
            windSpeed={weatherData.windSpeed}
            description={weatherData.description}
            onDelete={() => handleRemoveCity(weatherData.city)}
          />
        ))}
      </Grid2>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Grid2>
  );
};

export default WeatherDashboard;
