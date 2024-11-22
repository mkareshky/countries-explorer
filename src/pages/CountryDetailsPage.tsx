import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { fetchWeather } from '../utils/fetchWeather';

const CountryDetailsPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const [country, setCountry] = useState<any | null>(null); // Local state to handle country details on refresh
  const [weather, setWeather] = useState<any | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const [additionalData, setAdditionalData] = useState<any | null>(null);
  const [additionalLoading, setAdditionalLoading] = useState(true);
  const [additionalError, setAdditionalError] = useState<string | null>(null);

  const reduxCountry = useAppSelector((state) =>
    state.country.allCountries.find((c) => c.name.toLowerCase() === name?.toLowerCase())
  );

  // Fetch country details dynamically if not found in Redux
  useEffect(() => {
    if (reduxCountry) {
      setCountry(reduxCountry);
    } else if (name) {
      fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch country details.');
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setCountry(data[0]);
          } else {
            throw new Error('No data found for the given country.');
          }
        })
        .catch(() => setAdditionalError('Failed to load country details.'))
        .finally(() => setAdditionalLoading(false));
    }
  }, [name, reduxCountry]);

  // Fetch weather data
  useEffect(() => {
    if (country?.capital) {
      setWeatherLoading(true);
      fetchWeather(country.capital)
        .then((data) => {
          setWeather(data);
          setWeatherError(null);
        })
        .catch(() => setWeatherError('Failed to fetch weather data.'))
        .finally(() => setWeatherLoading(false));
    }
  }, [country]);

  // Fetch additional data from REST API
  useEffect(() => {
    if (name) {
      setAdditionalLoading(true);
      fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch country details.');
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setAdditionalData(data[0]);
            setAdditionalError(null);
          } else {
            throw new Error('No data found for the given country.');
          }
        })
        .catch(() => setAdditionalError('Failed to load additional country details.'))
        .finally(() => setAdditionalLoading(false));
    }
  }, [name]);

  if (!country && additionalLoading) return <p>Loading country details...</p>;
  if (!country && additionalError) return <p>{additionalError}</p>;

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

      <img
        src={`https://flagcdn.com/w320/${additionalData?.cca2?.toLowerCase() || country?.code?.toLowerCase()}.png`}
        alt={`${country?.name?.common || country?.name} flag`}
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


      <h1>{country?.name?.common}</h1>
      <p><strong>Capital:</strong> {country?.capital?.[0] || 'N/A'}</p>
      <p><strong>Region:</strong> {additionalData?.region || 'N/A'}</p>
      <p>
        <strong>Languages:</strong>{' '}
        {country?.languages ? Object.values(country.languages).join(', ') : 'N/A'}
      </p>
      <p>
        <strong>Currencies:</strong>{' '}
        {country?.currencies
          ? Object.values(country.currencies).map((currency: any) => currency.name).join(', ')
          : 'N/A'}
      </p>

      {additionalLoading ? (
        <p>Loading additional details...</p>
      ) : additionalError ? (
        <p>{additionalError}</p>
      ) : (
        additionalData && (
          <div>
            <p><strong>Population:</strong> {additionalData.population?.toLocaleString() || 'N/A'}</p>
            <p><strong>Timezones:</strong> {additionalData.timezones?.join(', ') || 'N/A'}</p>
            <p>
              <strong>Neighboring Countries:</strong>{' '}
              {additionalData.borders?.join(', ') || 'None'}
            </p>
          </div>
        )
      )}

      <div style={{ marginTop: '30px' }}>
        <h2>Weather in {country?.capital?.[0]}</h2>
        {weatherLoading ? (
          <p>Loading weather data...</p>
        ) : weatherError ? (
          <p>{weatherError}</p>
        ) : (
          weather && (
            <div>
              <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
              <p><strong>Condition:</strong> {weather.weather[0].description}</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Weather icon"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CountryDetailsPage;
