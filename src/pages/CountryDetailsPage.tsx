import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { fetchWeather } from '../utils/fetchWeather';

const CountryDetailsPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const country = useAppSelector((state) =>
    state.country.allCountries.find((c) => c.name === name)
  );
  const [weather, setWeather] = useState<any | null>(null);

  useEffect(() => {
    if (country?.capital) {
      fetchWeather(country.capital)
        .then(setWeather)
        .catch((err) => console.error('Error fetching weather:', err));
    }
  }, [country]);

  if (!country) {
    return <div>Country not found.</div>;
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetailsPage;
