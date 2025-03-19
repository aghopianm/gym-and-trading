// src/components/Button/ButtonStyles.tsx
import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* Default state */
  background-color: #3498db;
  color: white;
  border: none;
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;