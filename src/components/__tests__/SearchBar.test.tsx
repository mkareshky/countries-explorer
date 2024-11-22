import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchBar from '../SearchBar';

const mockStore = configureStore([]);

test('renders SearchBar and performs search', () => {
  const store = mockStore({
    country: { allCountries: [{ name: 'India' }] },
  });

  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

  const input = screen.getByPlaceholderText(/Search by country name/i) as HTMLInputElement; // Cast to HTMLInputElement
  fireEvent.change(input, { target: { value: 'India' } });

  const button = screen.getByRole('button', { name: /Search/i });
  fireEvent.click(button);

  expect(input.value).toBe('India'); // Check the value of the input
});
