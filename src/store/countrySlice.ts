import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

interface CountryState {
  countries: any[];
  allCountries: any[];
  filters: { region: string; language: string };
  sortBy: string;
}

const initialState: CountryState = {
  countries: [], // Filtered list of countries
  allCountries: [], // Complete list of countries
  filters: { region: '', language: '' },
  sortBy: 'name',
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<any[]>) {
      state.countries = action.payload;
      if (state.allCountries.length === 0) {
        state.allCountries = action.payload;
      }
    },
    setFilters(state, action: PayloadAction<{ region: string; language: string }>) {
      state.filters = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
  },
});

// Selector for memoized filtering
export const selectFilteredCountries = createSelector(
  (state: RootState) => state.country.allCountries,
  (state: RootState) => state.country.filters,
  (allCountries, filters) => {
    return allCountries.filter((country) => {
      const matchesRegion = filters.region ? country.region === filters.region : true;
      const matchesLanguage = filters.language
        ? country.languages.some((lang: any) => lang.name === filters.language)
        : true;
      return matchesRegion && matchesLanguage;
    });
  }
);

export const { setCountries, setFilters, setSortBy } = countrySlice.actions;
export default countrySlice.reducer;
