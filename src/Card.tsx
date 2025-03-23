import { ReactNode } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  margin: 10px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const CardContent = styled.p`
  font-size: 1rem;
  color: #666;
`;

type CardProps = {
  title: string;
  children: ReactNode;
};

const Card = ({ title, children}: CardProps) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default Card;