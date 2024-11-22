import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { fetchWeather } from '../utils/fetchWeather';

const CountryDetailsPage: React.FC = () => {
  const { code } = useParams<{ code: string }>(); // Use `code` instead of `name`
  const navigate = useNavigate();

  const reduxCountry = useAppSelector((state) =>
    state.country.allCountries.find((c) => c.code.toLowerCase() === code?.toLowerCase())
  );

  // Local state for country, weather, and loading/error
  const [country, setCountry] = useState<any | null>(reduxCountry || null);
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState(!reduxCountry);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Fetch weather data
  useEffect(() => {
    if (country?.capital?.[0]) {
      fetchWeather(country.capital)
        .then((data) => {
          setWeather(data);
          setWeatherError(null);
        })
        .catch(() => {
          setWeatherError('Failed to fetch weather data.');
        });
    } else {
      setWeatherError('No capital available for weather data.');
    }
  }, [country]);

  // Fetch country details on refresh
  useEffect(() => {
    if (code) {
      setLoading(true);
      fetch(`https://restcountries.com/v3.1/alpha/${code}`) // Correct endpoint for `code`
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch country details.");
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            console.log(data[0]);
            setCountry(data[0]);

          } else {
            throw new Error("No country data found.");
          }
        })
        .catch((error) => {
          console.error(error.message);
          setCountry(null);
        })
        .finally(() => setLoading(false));
    }
  }, [code]);


  

  // Helper functions for formatting
  const getLanguages = (languagesObj: Record<string, string>): string =>
    languagesObj ? Object.values(languagesObj).join(', ') : 'N/A';

  const getCurrencies = (currenciesObj: Record<string, any>): string =>
    currenciesObj
      ? Object.keys(currenciesObj)
          .map((key) => currenciesObj[key]?.name || key)
          .join(', ')
      : 'N/A';

      const flagUrl =
      country?.flags?.png ||
      (country?.cca2
        ? `https://flagcdn.com/w320/${country.code.toLowerCase()}.png`
        : null);

  // Loading state
  if (loading) return <p>Loading country details...</p>;
  if (!country) return <p>Country not found. Please check the URL.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Back
      </button>

      {flagUrl ? (
        <img
          src={flagUrl}
          alt={`${country?.name?.common || 'Country'} flag`}
          style={{
            width: '150px',
            display: 'block',
            margin: '20px auto',
            padding: '10px',
            border: '2px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        />
      ) : (
        <div
          style={{
            width: '150px',
            height: '100px',
            margin: '20px auto',
            backgroundColor: '#ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
          }}
        >
          No Flag
        </div>
      )}

      <h1>{country?.name?.common || 'N/A'}</h1>
      <p>
        <strong>Capital:</strong> {country?.capital?.[0] || 'N/A'}
      </p>
      <p>
        <strong>Region:</strong> {country?.region || 'N/A'}
      </p>
      <p>
        <strong>Languages:</strong>{' '}
        {country?.languages ? getLanguages(country.languages) : 'N/A'}
      </p>
      <p>
        <strong>Currencies:</strong>{' '}
        {country?.currencies ? getCurrencies(country.currencies) : 'N/A'}
      </p>
      <p>
        <strong>Population:</strong>{' '}
        {country?.population ? country.population.toLocaleString() : 'N/A'}
      </p>
      <p>
        <strong>Timezones:</strong> {country?.timezones?.join(', ') || 'N/A'}
      </p>
      <p>
        <strong>Neighboring Countries:</strong>{' '}
        {country?.borders?.join(', ') || 'None'}
      </p>

      <div style={{ marginTop: '30px' }}>
        <h2>Weather in {country?.capital || 'this region'}</h2>
        {weatherError ? (
          <p>{weatherError}</p>
        ) : weather ? (
          <div>
            <p>
              <strong>Temperature:</strong> {weather.main.temp}°C
            </p>
            <p>
              <strong>Condition:</strong> {weather.weather[0].description}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="Weather icon"
            />
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default CountryDetailsPage;
