import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilters, setSortBy } from '../store/countrySlice';
import { Wrapper, Label } from './styles/FilterAndSort.styles';

const FilterAndSort: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.country.filters);
  const sortBy = useAppSelector((state) => state.country.sortBy);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setFilters({
        ...filters,
        region: e.target.value === 'All' ? '' : e.target.value,
      })
    );
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <Wrapper>
      <Label>
        Filter by Region:
        <select value={filters.region || 'All'} onChange={handleRegionChange}>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </Label>
      <Label>
        Sort by:
        <select value={sortBy} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="population">Population</option>
          <option value="area">Area</option>
        </select>
      </Label>
    </Wrapper>
  );
};

export default FilterAndSort;
