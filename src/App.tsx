import "./App.css";
import WeatherDashboard from "./components/WeatherDashboard";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <WeatherDashboard />;
    </WeatherProvider>
  );
}

export default App;
