import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const FlagImage = styled.img`
  margin-bottom: 8px;
  width: 100px;
  border-radius: 4px;
`;

export const CountryName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 8px 0;
`;

export const Capital = styled.p`
  font-size: 1rem;
  margin: 4px 0;
  color: #555;
`;

export const Continent = styled.p`
  font-size: 1rem;
  margin: 4px 0;
  color: #777;
`;
