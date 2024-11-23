import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryDetailsPage from './pages/CountryDetailsPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryDetailsPage />} /> 
      </Routes>
    </>
  );
};

export default App;
