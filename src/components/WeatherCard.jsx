import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";

const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  padding: 2em;
  border-radius: 30px;
  max-width: 420px;
  width: 100%;
  margin: 2em auto;
  box-shadow: 5px 5px 15px #00000055;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchBar = styled.input`
  border: none;
  outline: none;
  padding: 0.5em 1em;
  border-radius: 24px;
  background: #7c7c7c2b;
  color: ${({ theme }) => theme.text};
  width: 80%;
`;

const Button = styled.button`
  margin-left: 1em;
  border-radius: 50%;
  border: none;
  height: 45px;
  width: 45px;
  background: #7c7c7c2b;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThemeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.5em;
`;

function WeatherCard({
  city,
  setCity,
  weather,
  fetchWeather,
  error,
  isDarkMode,
  toggleTheme,
}) {
  return (
    <>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </ThemeToggle>

      <Card>
        <Flex>
          <SearchBar
            type="text"
            placeholder="Search city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && fetchWeather(city)}
          />
          <Button onClick={() => fetchWeather(city)}>
            <FiSearch />
          </Button>
        </Flex>

        {error && <p style={{ color: "red", marginTop: "1em" }}>{error}</p>}

        {weather && (
          <div style={{ marginTop: "2em" }}>
            <h2>Weather in {weather.name}</h2>
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <Flex>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="icon"
              />
              <span style={{ textTransform: "capitalize" }}>
                {weather.weather[0].description}
              </span>
            </Flex>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind speed: {weather.wind.speed} km/h</p>
          </div>
        )}
      </Card>
    </>
  );
}

export default WeatherCard;
