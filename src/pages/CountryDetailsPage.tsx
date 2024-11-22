import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAppSelector } from '../store/hooks';
import { fetchWeather } from '../utils/fetchWeather';

const CountryDetailsPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const country = useAppSelector((state) =>
    state.country.allCountries.find((c) => c.name.toLowerCase() === name?.toLowerCase())
  );

  const [weather, setWeather] = useState<any | null>(null);
  const [additionalData, setAdditionalData] = useState<any | null>(null);

  useEffect(() => {
    if (country?.capital) {
      fetchWeather(country.capital)
        .then(setWeather)
        .catch((error) => console.error('Error fetching weather data:', error));
    }
  }, [country]);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (!name) {
        console.error('No country name provided in URL.');
        return;
      }

      const apiUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
      console.log('Fetching additional data from:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          console.error('Failed to fetch additional data:', response.status, response.statusText);
          return;
        }
        const data = await response.json();
        console.log('REST API Response:', data);

        if (Array.isArray(data) && data.length > 0) {
          setAdditionalData(data[0]);
        } else {
          console.error('No data found for country:', name);
        }
      } catch (error) {
        console.error('Error fetching additional country data:', error);
      }
    };

    fetchAdditionalData();
  }, [name]);

  if (!country) {
    return <div>Country not found.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
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

      {/* Display the country's flag */}
      <img
        src={`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
        alt={`${country.name} flag`}
        style={{ width: '150px', display: 'block', margin: '0 auto 20px' }}
      />

      {/* Country details */}
      <h1>{country.name}</h1>
      <p><strong>Capital:</strong> {country.capital || 'N/A'}</p>
      <p><strong>Region:</strong> {additionalData?.region || country.continent.name || 'N/A'}</p>
      <p><strong>Languages:</strong> {country.languages.map((lang: any) => lang.name).join(', ')}</p>
      <p><strong>Currencies:</strong> {country.currencies?.join(', ') || 'N/A'}</p>

      {/* Additional details from REST API */}
      {additionalData && (
        <div>
          <p><strong>Population:</strong> {additionalData.population?.toLocaleString() || 'N/A'}</p>
          <p><strong>Timezones:</strong> {additionalData.timezones?.join(', ') || 'N/A'}</p>
          <p>
            <strong>Neighboring Countries:</strong>{' '}
            {additionalData.borders?.join(', ') || 'None'}
          </p>
        </div>
      )}

      {/* Weather details */}
      <div style={{ marginTop: '30px' }}>
        <h2>Weather in {country.capital}</h2>
        {weather ? (
          <div>
            <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
            <p><strong>Condition:</strong> {weather.weather[0].description}</p>
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
