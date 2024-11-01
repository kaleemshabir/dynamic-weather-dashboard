export interface WeatherData {
  city: string;
  temperature: number;
  minTemp: number;
  maxTemp: number;
  currentTemp: number;
  humidity: number;
  windSpeed: number;
  description: string;
}
export interface WeatherState {
  cities: string[];
  weatherData: WeatherData[];
  loading: boolean;
  error: string | null;
}

export interface WeatherContextType {
  state: WeatherState;
  dispatch: React.Dispatch<any>;
}

export interface WeatherError {
  message: "";
}
