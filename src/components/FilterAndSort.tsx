import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilters, setSortBy } from '../store/countrySlice';

const FilterAndSort: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.country.filters);
  const sortBy = useAppSelector((state) => state.country.sortBy);

  return (
    <div>
      <label>
        Filter by Region:
        <select
          value={filters.region}
          onChange={(e) => dispatch(setFilters({ ...filters, region: e.target.value }))}
        >
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </label>
      <label>
        Sort by:
        <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
          <option value="name">Name</option>
          <option value="population">Population</option>
          <option value="area">Area</option>
        </select>
      </label>
    </div>
  );
};

export default FilterAndSort;
