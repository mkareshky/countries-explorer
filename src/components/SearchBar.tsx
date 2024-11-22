import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCountries } from '../store/countrySlice';
import { Form, Input, Button } from './styles/SearchBar.styles';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const allCountries = useAppSelector((state) => state.country.allCountries);
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    const filteredCountries = allCountries.filter((country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
    dispatch(setCountries(filteredCountries));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submission
    handleSearch(); // Trigger the search logic
  };

  return (
    <Form onSubmit={handleKeyPress}>
      <Input
        type="text"
        placeholder="Search by country name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </Form>
  );
};

export default SearchBar;
