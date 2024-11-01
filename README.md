# Weather Dashboard

A responsive weather dashboard application that allows users to search for cities and view their weather forecast. The app is built with [Vite](https://vitejs.dev/) for fast development and is powered by the [OpenWeatherMap API](https://openweathermap.org/). It also includes features such as city list persistence, dark mode, and error handling.

---

## Features

- **Search Weather by City**: Users can search for weather forecasts by entering a city name.
- **City List with Forecast**: Displays a list of saved cities with their current weather data.
- **Delete City from List**: Users can remove cities from the list to manage their dashboard.
- **Data Persistence**: Weather data is saved to `localStorage`, so the list persists even after page reloads.
- **Loading Indicator**: Shows a loader when fetching weather data to enhance user experience.
- **Error Handling**: Displays relevant errors if the city weather is already present or if the city is not found.
- **Dark Mode**: Option to toggle between light and dark themes for better readability.

---

## Setup Instructions

1. **Get openweatherapi key and put it in .env after cloning the repo **:
```
VITE_OPENWEATHER_API_KEY=your-key-value

```

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/kaleemshabir/dynamic-weather-dashboard.git
   cd dynamic-weather-dashboard
   npm install
   npm run build
   npm run preview
   ```
