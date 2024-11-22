import React from 'react';
import { useAppSelector } from '../store/hooks';
import CountryCard from './CountryCard';

const CountryList: React.FC = () => {
  const countries = useAppSelector((state) => {
    const { countries, filters, sortBy } = state.country;

    // Apply region filter
    const filteredByRegion = filters.region
      ? countries.filter((country) => country.continent.name === filters.region)
      : countries;

    // Apply sorting
    const sortedCountries = [...filteredByRegion].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'population') {
        return a.population - b.population; // Adjust for actual property
      } else if (sortBy === 'area') {
        return a.area - b.area; // Adjust for actual property
      }
      return 0;
    });

    return sortedCountries;
  });

  if (countries.length === 0) {
    return <p>No countries found. Try a different search or filter.</p>;
  }

  return (
    <div className="country-list">
      {countries.map((country) => (
        <CountryCard key={country.code} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
