import React from 'react';
import WeatherInfo from './WeatherInfo';

interface CountryDetailsProps {
  country: any;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Continent: {country.continent.name}</p>
      <p>Languages: {country.languages.map((lang: any) => lang.name).join(', ')}</p>
      <p>Currencies: {country.currencies.join(', ')}</p> {/* Adjusted for a list of strings */}
      <WeatherInfo city={country.capital} />
    </div>
  );
};

export default CountryDetails;
