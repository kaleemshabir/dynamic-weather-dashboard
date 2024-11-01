import React, { createContext, useReducer, useContext } from "react";
import weatherReducer from "./weatherReducer";
import { WeatherState, WeatherContextType } from "../types";

const initialState: WeatherState = {
  cities: [],
  weatherData: [],
  loading: false,
  error: null,
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
};
