import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  max-width: 700px;
  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
