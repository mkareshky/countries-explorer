import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';
import { useAppDispatch } from '../store/hooks';
import { setCountries } from '../store/countrySlice';
import SearchBar from '../components/SearchBar';
import FilterAndSort from '../components/FilterAndSort';
import CountryList from '../components/CountryList';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    onCompleted: (data) => {
      dispatch(setCountries(data.countries || []));
    },
    onError: (err) => {
      console.error('Error loading countries:', err.message);
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(setCountries(data.countries));
    }
  }, [data, dispatch]);

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error loading countries: {error.message}. Please try refreshing the page.</p>;

  return (
    <div>
      <h1>Countries Explorer</h1>
      <SearchBar />
      <FilterAndSort />
      <CountryList />
    </div>
  );
};

export default Home;
