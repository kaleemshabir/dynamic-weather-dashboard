import WeatherCard from "./WeatherCard";
import SearchBar from "./SearchBar";

const WeatherDashboard = () => {
  return (
    <div>
      Dynamic Weather Dashboard
      <SearchBar />
      {[1, 2, 3, 4].map((card) => {
        return <WeatherCard key={card} />;
      })}
    </div>
  );
};

export default WeatherDashboard;
