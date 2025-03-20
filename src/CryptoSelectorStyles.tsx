import styled from 'styled-components';

export const SelectContainer = styled.div`
  margin-bottom: 24px;
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  background-color: white;
  font-size: 1rem;
  min-width: 200px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;