import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the Home and CountryDetailsPage components
jest.mock('./pages/Home', () => () => <div>Mock Home Page</div>);
jest.mock('./pages/CountryDetailsPage', () => () => <div>Mock Country Details Page</div>);

describe('App Component', () => {
  const originalWarn = console.warn;

  beforeAll(() => {
    // Suppress warnings during tests
    console.warn = jest.fn((message) => {
      if (!message.includes('No routes matched location')) {
        originalWarn(message);
      }
    });
  });

  afterAll(() => {
    // Restore original console.warn
    console.warn = originalWarn;
  });

  test('renders Home page for default route "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </MemoryRouter>
    );

    const homePage = screen.getByText(/mock home page/i);
    expect(homePage).toBeInTheDocument();
  });

  test('renders CountryDetailsPage for route "/country/:code"', () => {
    render(
      <MemoryRouter initialEntries={['/country/usa']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </MemoryRouter>
    );

    const detailsPage = screen.getByText(/mock country details page/i);
    expect(detailsPage).toBeInTheDocument();
  });

  test('renders "Not Found" for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText(/mock home page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/mock country details page/i)).not.toBeInTheDocument();
  });
});
