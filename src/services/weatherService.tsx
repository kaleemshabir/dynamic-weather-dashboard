import axios from "axios";
import { WeatherData } from "../types";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return {
    city,
    temperature: response.data.main.temp,
    minTemp: response.data.main.temp_min,
    maxTemp: response.data.main.temp_max,
    humidity: response.data.main.humidity,
    windSpeed: response.data.wind.speed,
    description: response.data.weather[0].description,
  };
};
