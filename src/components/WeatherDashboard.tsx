import { useState } from "react";
import {
  Typography,
  CircularProgress,
  Box,
  Grid2,
  Alert,
  Snackbar,
} from "@mui/material";
import WeatherCard from "./WeatherCard";
import SearchBar from "./SearchBar";
import { useWeatherContext } from "../context/WeatherContext";
import { WeatherActionType } from "../context/weatherReducer";
import { fetchWeatherData } from "../services/weatherService";

const WeatherDashboard = () => {
  const { state, dispatch } = useWeatherContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleAddCity = async (city: string) => {
    dispatch({ type: WeatherActionType.ADD_CITY, payload: city });
    try {
      setLoading(true);

      const data = await fetchWeatherData(city);
      dispatch({ type: WeatherActionType.SET_WEATHER_DATA, payload: data });
    } catch (error: any) {
      setOpen(true);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCity = (city: string) => {
    dispatch({ type: WeatherActionType.REMOVE_CITY, payload: city });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid2
      container
      padding={3}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography variant="h4" gutterBottom>
        Dynamic Weather Dashboard
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <SearchBar onAddCity={handleAddCity} />
      </Box>
      {(state.loading || loading) && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      <Grid2 container spacing={2} mt={2} component="div">
        {state.weatherData.map((weatherData, index) => (
          <Grid2 key={index} component="div">
            <WeatherCard
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
          </Grid2>
        ))}
      </Grid2>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Grid2>
  );
};

export default WeatherDashboard;
