import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";

const lightTheme = {
  background: "#f0f0f0",
  text: "#222",
  cardBg: "#ffffffd0",
};

const darkTheme = {
  background: "#222",
  text: "#fff",
  cardBg: "#000000d0",
};

function App() {
  const [city, setCity] = useState("Namangan");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (query) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
      );

      if (!res.ok) {
        setError("City not found!");
        setWeather(null);
        return;
      }

      const data = await res.json();
      setWeather(data);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <WeatherCard
        city={city}
        setCity={setCity}
        weather={weather}
        fetchWeather={fetchWeather}
        error={error}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode((prev) => !prev)}
      />
    </ThemeProvider>
  );
}

export default App;
