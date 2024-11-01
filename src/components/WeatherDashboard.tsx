import WeatherCard from "./WeatherCard";
import SearchBar from "./SearchBar";
import { useWeatherContext } from "../context/WeatherContext";
import { WeatherActionType } from "../context/weatherReducer";
import { fetchWeatherData } from "../services/weatherService";

const WeatherDashboard = () => {
  const { state, dispatch } = useWeatherContext();

  const handleAddCity = async (city: string) => {
    dispatch({ type: WeatherActionType.ADD_CITY, payload: city });
    const data = await fetchWeatherData(city);
    dispatch({ type: WeatherActionType.SET_WEATHER_DATA, payload: data });
  };

  const handleRemoveCity = (city: string) => {
    dispatch({ type: WeatherActionType.REMOVE_CITY, payload: city });
  };

  return (
    <div>
      Dynamic Weather Dashboard
      <SearchBar onAddCity={handleAddCity} />
      {state.loading && <div>loading...</div>}
      {state.error && <p>{state.error}</p>}
      {state.weatherData.map((weatherData, index) => {
        return (
          <WeatherCard
            key={index}
            city={weatherData.city}
            temperature={weatherData.temperature}
            minTemp={weatherData.minTemp}
            maxTemp={weatherData.maxTemp}
            humidity={weatherData.humidity}
            windSpeed={weatherData.windSpeed}
            description={weatherData.description}
            onDelete={() => handleRemoveCity(weatherData.city)}
          />
        );
      })}
    </div>
  );
};

export default WeatherDashboard;
