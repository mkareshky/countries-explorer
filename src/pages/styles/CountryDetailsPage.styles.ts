import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BackButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 20px;
`;

export const FlagImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
`;

export const CardContent = styled.div`
  width: 100%;
`;

export const CardSection = styled.div`
  margin: 10px 0;
`;

export const Heading = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

export const InfoText = styled.p`
  font-size: 1rem;
  margin: 5px 0;
  text-align: center;

  strong {
    font-weight: bold;
  }
`;

export const NeighborsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center buttons horizontally */
  align-items: center; /* Center buttons vertically */

  button {
    margin: 5px;
    padding: 5px 10px;
    background-color: #e0e0e0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #d6d6d6;
    }
  }
`;

export const WeatherContainer = styled.div`
  margin-top: 30px;
  text-align: center;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

export const WeatherIcon = styled.img`
  margin-top: 10px;
`;
