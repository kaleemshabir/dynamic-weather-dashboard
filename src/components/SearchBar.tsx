import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface SearchBarProps {
  onAddCity: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAddCity }) => {
  const [city, setCity] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city.trim()) {
      onAddCity(city);
      setCity("");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems="center"
      width="100%"
      gap={1}
      sx={{
        "@media (max-width:600px)": {
          flexDirection: "column",
        },
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 1,
          width: "400px",
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          fontWeight: "bold",
          width: "auto",
          whiteSpace: "nowrap",
          paddingX: "32px",
          paddingY: "16px",
        }}
      >
        Get Weather
      </Button>
    </Box>
  );
};

export default SearchBar;
