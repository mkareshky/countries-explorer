import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../utils/fetchWeather';

interface WeatherInfoProps {
  city: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ city }) => {
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchWeather(city)
      .then((data) => {
        setWeather(data);
        setError(null);
      })
      .catch((err) => {
        setError('Failed to fetch weather data');
      })
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Weather in {city}</h3>
      {weather && (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
