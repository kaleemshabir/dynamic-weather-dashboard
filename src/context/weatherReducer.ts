import { WeatherState, WeatherData } from "../types";

export enum WeatherActionType {
  ADD_CITY = "ADD_CITY",
  REMOVE_CITY = "REMOVE_CITY",
  SET_WEATHER_DATA = "SET_WEATHER_DATA",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
}

type WeatherAction =
  | { type: WeatherActionType.ADD_CITY; payload: string }
  | { type: WeatherActionType.REMOVE_CITY; payload: string }
  | { type: WeatherActionType.SET_WEATHER_DATA; payload: WeatherData }
  | { type: WeatherActionType.SET_LOADING; payload: boolean }
  | { type: WeatherActionType.SET_ERROR; payload: string | null };

const weatherReducer = (
  state: WeatherState,
  action: WeatherAction
): WeatherState => {
  switch (action.type) {
    case WeatherActionType.ADD_CITY:
      return { ...state, cities: [...state.cities, action.payload] };
    case WeatherActionType.REMOVE_CITY:
      return {
        ...state,
        cities: state.cities.filter((city) => city !== action.payload),
        weatherData: state.weatherData.filter(
          (weatherInfo) => weatherInfo.city !== action.payload
        ),
      };
    case WeatherActionType.SET_WEATHER_DATA:
      return { ...state, weatherData: [...state.weatherData, action.payload] };
    case WeatherActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case WeatherActionType.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default weatherReducer;
