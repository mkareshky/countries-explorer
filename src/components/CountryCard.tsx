import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CountryCardProps {
  country: {
    name: string;
    code: string;
    capital: string;
    continent: { name: string };
    emoji: string;
  };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const navigate = useNavigate();

  // Construct the flag image URL using the country code
  const flagUrl = `https://flagcdn.com/256x192/${country.code.toLowerCase()}.png`;

  return (
    <div
      onClick={() => navigate(`/country/${country.code}`)} // Use `code` here
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        cursor: 'pointer',
        textAlign: 'center',
      }}
    >
      {/* Display the flag image */}
      <img
        src={flagUrl}
        alt={`${country.name} flag`}
        width="100"
        style={{ marginBottom: '8px' }}
      />
      <h3>{country.name}</h3>
      <p>{country.capital}</p>
      <p>{country.continent.name}</p>
    </div>
  );
};

export default CountryCard;
