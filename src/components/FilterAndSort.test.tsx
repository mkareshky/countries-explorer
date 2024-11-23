import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FilterAndSort from './FilterAndSort';

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

test("renders FilterAndSort and allows selection", () => {
  const store = mockStore({
    country: {
      filters: { region: "All", language: "" },
      sortBy: "name",
    },
  });

  render(
    <Provider store={store}>
      <FilterAndSort />
    </Provider>
  );

  const regionSelect = screen.getByLabelText(/Filter by Region:/i);
  fireEvent.change(regionSelect, { target: { value: "Asia" } });

  const sortSelect = screen.getByLabelText(/Sort by:/i);
  fireEvent.change(sortSelect, { target: { value: "population" } });

  // Verify the first action (region filter update)
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "country/setFilters",
    payload: { region: "Asia", language: "" },
  });

  // Verify the second action (sort update)
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "country/setSortBy",
    payload: "population",
  });
});
