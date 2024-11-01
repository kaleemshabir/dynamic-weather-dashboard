import axios from "axios";
import { WeatherData } from "../types";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return {
      city,
      temperature: response.data.main.temp,
      minTemp: response.data.main.temp_min,
      maxTemp: response.data.main.temp_max,
      currentTemp: response.data.main.temp,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      description: response.data.weather[0].description,
    };
  } catch (error: any) {
    let errorMessage = "";
    if (!error.response) {
      errorMessage = "No server response.";
    } else if (error.response?.status < 500) {
      errorMessage = error.response?.data?.message || "Client error.";
    } else {
      errorMessage = "Request failed. Please try again later.";
    }

    throw new Error(errorMessage);
  }
};
