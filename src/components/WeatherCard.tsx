import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface WeatherCardProps {
  city: string;
  temperature: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  onDelete: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  minTemp,
  maxTemp,
  humidity,
  windSpeed,
  description,
  onDelete,
}) => (
  <Card variant="outlined" sx={{ width: 280, margin: 2 }}>
    <CardContent>
      <Typography variant="h5">{city}</Typography>
      <Typography variant="body2">{description}</Typography>
      <Typography>Temperature: {temperature}°C</Typography>
      <Typography>Min Temp: {minTemp}°C</Typography>
      <Typography>Max Temp: {maxTemp}°C</Typography>
      <Typography>Humidity: {humidity}%</Typography>
      <Typography>Wind Speed: {windSpeed} m/s</Typography>
      <IconButton onClick={onDelete} color="error" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </CardContent>
  </Card>
);

export default WeatherCard;
