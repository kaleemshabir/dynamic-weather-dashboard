import { useEffect, useState } from "react";
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
  }, []);

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

      const updatedState = [...state.weatherData, data];
      localStorage.setItem("weatherData", JSON.stringify(updatedState));
    } catch (error: any) {
      setOpen(true);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCity = (city: string) => {
    const updatedState = state.weatherData.filter((data) => data.city !== city);

    localStorage.setItem("weatherData", JSON.stringify(updatedState));
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
      <Box display="flex" justifyContent="center" mt={2}>
        <Typography variant="h4" gutterBottom>
          Dynamic Weather Dashboard
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <SearchBar onAddCity={handleAddCity} loading={loading} />
      </Box>
      {(state.loading || loading) && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      <Grid2
        container
        spacing={2}
        mt={2}
        component="div"
        justifyContent="center"
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
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
