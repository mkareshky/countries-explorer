import React from 'react';
import { useAppSelector } from '../store/hooks';
import CountryCard from './CountryCard';

const CountryList: React.FC = () => {
  const countries = useAppSelector((state) => state.country.countries);

  if (!countries || countries.length === 0) {
    return <p>No countries found. Try a different search or reload the page.</p>;
  }

  return (
    <div className="country-list">
      {countries.map((country) => (
        <CountryCard key={country.name} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
