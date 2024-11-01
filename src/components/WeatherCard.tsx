import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { capitalizeFirstLetter } from "../utils/common";

interface WeatherCardProps {
  city: string;
  temperature: number;
  minTemp: number;
  maxTemp: number;
  currentTemp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  onDelete: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  minTemp,
  maxTemp,
  currentTemp,
  humidity,
  windSpeed,
  description,
  onDelete,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        width: "300px",
        cursor: "pointer",
        boxShadow: 3,
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.03)",
          transition: "transform 0.2s ease-in-out",
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            {capitalizeFirstLetter(city)}
          </Typography>
          <IconButton onClick={onDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box display="flex" alignItems="center">
            <ThermostatIcon color="primary" />
            <Typography variant="body2" ml={1}>
              Current: {currentTemp}°C
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <ThermostatIcon color="primary" />
            <Typography variant="body2" ml={1}>
              Min: {minTemp}°C
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <ThermostatIcon color="primary" />
            <Typography variant="body2" ml={1}>
              Max: {maxTemp}°C
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <WbSunnyIcon color="secondary" />
            <Typography variant="body2" ml={1}>
              {description}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <WaterDropIcon color="primary" />
            <Typography variant="body2" ml={1}>
              Humidity: {humidity}%
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <AirIcon color="secondary" />
            <Typography variant="body2" ml={1}>
              Wind: {windSpeed} m/s
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
