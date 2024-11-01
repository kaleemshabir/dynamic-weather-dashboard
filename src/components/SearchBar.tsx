import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface SearchBarProps {
  onAddCity: (city: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAddCity, loading }) => {
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems="center"
      gap={1}
      sx={{
        "@media (max-width:600px)": {
          flexDirection: "column",
          width: "300px",
        },
      }}
    >
      <TextField
        variant="outlined"
        disabled={loading}
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        sx={{
          fontWeight: "bold",
          paddingX: { xs: "4px", sm: "8px" },
          paddingY: { xs: "2px", sm: "4px" },
          width: { xs: "100%", sm: "auto", lg: "400px" },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={handleSearch}
        sx={{
          fontWeight: "bold",
          whiteSpace: "nowrap",
          paddingX: { xs: "4px", sm: "8px", md: "12px", lg: "32px" },
          paddingY: { xs: "2px", sm: "4px", md: "6px", lg: "16px" },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        Get Weather
      </Button>
    </Box>
  );
};

export default SearchBar;
