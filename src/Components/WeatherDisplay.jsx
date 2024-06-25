
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherDisplay = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const API_KEY = "e8c24597158bcaa170b724112df7498f";

  useEffect(() => {
    if (lat && lon) {
      fetchWeatherData(lat, lon);
    }
  }, [lat, lon, units]);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat,
          lon,
          units,
          appid: API_KEY
        }
      });
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const isDaytime = () => {
    if (!weather) return true; 
    const currentTime = new Date().getTime() / 1000; 
    const { sunrise, sunset } = weather.sys;
    return currentTime >= sunrise && currentTime <= sunset;
  };

  if (!weather) {
    return <div>Loading weather data...</div>;
  }

  const {
    main: { temp, humidity },
    weather: [{ description, icon }],
    wind: { speed },
    rain,
  } = weather;
  
  let chanceOfRain = 0;
  if (rain) {
    if (rain['1h']) {
      chanceOfRain = rain['1h'];
    } else if (rain['3h']) {
      chanceOfRain = rain['3h'];
    }
  }

  const iconUrl = isDaytime()
    ? `http://openweathermap.org/img/wn/${icon}.png`
    : `http://openweathermap.org/img/wn/${icon.replace('d', 'n')}.png`;

  return (
    <div className="weather-display container my-4 p-4 rounded bg-primary text-light">
      <h3>Weather Information</h3>
      <p>Temperature: {temp}°{units === 'metric' ? 'C' : 'F'}</p>
      <p>Condition: {description}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {speed} {units === 'metric' ? 'm/s' : 'mph'}</p>
      <p>Chance of Rain: {chanceOfRain}%</p>
      <img src={iconUrl} alt="weather icon" />
      <button className="btn btn-light" onClick={() => setUnits(units === 'metric' ? 'imperial' : 'metric')}>
        Switch to {units === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default WeatherDisplay;
