const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

const WeatherCard = ({ city, onSearch, data, loading, error }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim() !== "") {
      onSearch(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Card>
      <Search>
        <SearchInput
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <SearchButton onClick={handleSearch}>
          <FiSearch />
        </SearchButton>
      </Search>

      <WeatherContainer $loading={loading}>
        {error && <ErrorBox>{error}</ErrorBox>}

        {data && !error && (
          <>
            <City>Weather in {data.name}</City>
            <Temp>{Math.round(data.main.temp)}°C</Temp>
            <Flex>
              <WeatherIcon
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt="weather icon"
              />
              <Description>{data.weather[0].description}</Description>
            </Flex>
            <Humidity>Humidity: {data.main.humidity}%</Humidity>
            <Wind>Wind speed: {data.wind.speed} km/h</Wind>
          </>
        )}
      </WeatherContainer>
    </Card>
  );
};

export default WeatherCard;

// Styled Components

const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  padding: 2em;
  border-radius: 30px;
  width: 100%;
  max-width: 420px;
  margin: 1em;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 0.4em 1em;
  border-radius: 24px;
  background: #7c7c7c2b;
  color: whitesmoke;
  font-size: 105%;
  width: calc(100% - 100px);
`;

const SearchButton = styled.button`
  margin: 1.7em;
  border-radius: 50%;
  border: none;
  height: 45px;
  width: 45px;
  background: #7c7c7c2b;
  color: whitesmoke;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background: white;
    color: black;
  }
`;

const WeatherContainer = styled.div`
  text-align: center;
  visibility: ${({ $loading }) => ($loading ? "hidden" : "visible")};
  position: relative;
  min-height: 100px;

  &::after {
    content: ${({ $loading }) => ($loading ? '"Loading..."' : '""')};
    visibility: ${({ $loading }) => ($loading ? "visible" : "hidden")};
    color: white;
    position: absolute;
    top: 0;
    left: 20px;
  }
`;

const City = styled.h2``;

const Temp = styled.h1`
  margin: 0;
  margin-bottom: 0.4em;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const Description = styled.div`
  text-transform: capitalize;
  margin-left: 8px;
`;

const Humidity = styled.div``;

const Wind = styled.div``;

const ErrorBox = styled.div`
  background: #ffe0e0;
  color: red;
  padding: 1em;
  border-radius: 10px;
  margin-top: 1em;
`;
