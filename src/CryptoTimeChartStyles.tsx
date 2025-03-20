import styled from 'styled-components';

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 16px;
`;

export const TimeRangeSelector = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const TimeButton = styled.button<{ active: boolean }>`
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  background-color: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: ${props => props.active ? '#2563eb' : '#f9fafb'};
  }
`;