import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCountries } from '../store/countrySlice';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const allCountries = useAppSelector((state) => state.country.allCountries || []);
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    const filteredCountries = allCountries.filter((country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
    dispatch(setCountries(filteredCountries));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by country name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
