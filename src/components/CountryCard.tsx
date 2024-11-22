import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, FlagImage, CountryName, Capital, Continent } from './styles/CountryCard.styles';

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
    <Card onClick={() => navigate(`/country/${country.code}`)}>
      <FlagImage src={flagUrl} alt={`${country.name} flag`} />
      <CountryName>{country.name}</CountryName>
      <Capital>{country.capital}</Capital>
      <Continent>{country.continent.name}</Continent>
    </Card>
  );
};

export default CountryCard;
