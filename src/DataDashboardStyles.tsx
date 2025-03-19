
import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .spinning {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  padding: 16px;
  margin-bottom: 24px;
  background-color: #fee2e2;
  color: #b91c1c;
  border-radius: 4px;
`;

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.125rem;
`;

export const Section = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;

export const Footer = styled.p`
  margin-top: 24px;
  font-size: 0.875rem;
  color: #6b7280;
`;