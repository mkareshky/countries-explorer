import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from '../CountryCard';

const mockCountry = {
  name: 'United States',
  code: 'US',
  capital: 'Washington D.C.',
  continent: { name: 'North America' },
  emoji: '🇺🇸',
};

test('renders CountryCard correctly', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CountryCard country={mockCountry} />
    </MemoryRouter>
  );

  // Verify the rendered content
  expect(screen.getByText('United States')).toBeInTheDocument();
  expect(screen.getByText('Washington D.C.')).toBeInTheDocument();
  expect(screen.getByText('North America')).toBeInTheDocument();
  expect(screen.getByAltText('United States flag')).toHaveAttribute(
    'src',
    'https://flagcdn.com/256x192/us.png'
  );
});
