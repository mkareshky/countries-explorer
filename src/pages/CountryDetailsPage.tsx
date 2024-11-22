import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { fetchWeather } from '../utils/fetchWeather';
import {
  PageContainer,
  BackButton,
  CardContainer,
  FlagImage,
  CardContent,
  CardSection,
  Heading,
  InfoText,
  NeighborsContainer,
  WeatherContainer,
  WeatherIcon,
} from './styles/CountryDetailsPage.styles';

const CountryDetailsPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const reduxCountry = useAppSelector((state) =>
    state.country.allCountries.find((c) => c.code.toLowerCase() === code?.toLowerCase())
  );

  const [country, setCountry] = useState<any | null>(reduxCountry || null);
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState(!reduxCountry);
  const [weatherError, setWeatherError] = useState<string | null>(null);

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

  useEffect(() => {
    if (code) {
      setLoading(true);
      fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch country details.');
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setCountry(data[0]);
          } else {
            throw new Error('No country data found.');
          }
        })
        .catch((error) => {
          console.error(error.message);
          setCountry(null);
        })
        .finally(() => setLoading(false));
    }
  }, [code]);

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
    (country?.cca2 ? `https://flagcdn.com/w320/${country.code.toLowerCase()}.png` : null);

  if (loading) return <p>Loading country details...</p>;
  if (!country) return <p>Country not found. Please check the URL.</p>;

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>

      <CardContainer>
        {flagUrl && <FlagImage src={flagUrl} alt={`${country?.name?.common || 'Country'} flag`} />}
        <CardContent>
          <Heading>{country?.name?.common || 'N/A'}</Heading>
          <CardSection>
            <InfoText>
              <strong>Capital:</strong> {country?.capital?.[0] || 'N/A'}
            </InfoText>
            <InfoText>
              <strong>Region:</strong> {country?.region || 'N/A'}
            </InfoText>
            <InfoText>
              <strong>Languages:</strong> {country?.languages ? getLanguages(country.languages) : 'N/A'}
            </InfoText>
            <InfoText>
              <strong>Currencies:</strong> {country?.currencies ? getCurrencies(country.currencies) : 'N/A'}
            </InfoText>
            <InfoText>
              <strong>Population:</strong>{' '}
              {country?.population ? country.population.toLocaleString() : 'N/A'}
            </InfoText>
            <InfoText>
              <strong>Timezones:</strong> {country?.timezones?.join(', ') || 'N/A'}
            </InfoText>
          </CardSection>
          <InfoText>
            <strong>Neighboring Countries:</strong>{' '}
            {country?.borders?.length ? (
              <NeighborsContainer>
                {country.borders.map((border: string) => (
                  <button key={border} onClick={() => navigate(`/country/${border}`)}>
                    {border}
                  </button>
                ))}
              </NeighborsContainer>
            ) : (
              'None'
            )}
          </InfoText>

          <WeatherContainer>
            <h2>Weather in {country?.capital || 'this region'}</h2>
            {weatherError ? (
              <p>{weatherError}</p>
            ) : weather ? (
              <div>
                <InfoText>
                  <strong>Temperature:</strong> {weather.main.temp}°C
                </InfoText>
                <InfoText>
                  <strong>Condition:</strong> {weather.weather[0].description}
                </InfoText>
                <WeatherIcon
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="Weather icon"
                />
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </WeatherContainer>
        </CardContent>
      </CardContainer>
    </PageContainer>
  );
};

export default CountryDetailsPage;
