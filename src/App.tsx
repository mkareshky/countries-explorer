import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Removed Router import
import Home from './pages/Home';
import CountryDetailsPage from './pages/CountryDetailsPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<CountryDetailsPage />} />
      </Routes>
    </>
  );
};

export default App;
