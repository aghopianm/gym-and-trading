import styled from "styled-components";
import Card from "./Card";

const PhotoIcon = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

type ProfileCardProps = {
  title: string;
  children: React.ReactNode;
  imageSrc: string;
};

const ProfileCard = ({ title, children, imageSrc }: ProfileCardProps) => {
  return (
    <Card title={title}>
      <PhotoIcon src={imageSrc} alt={title} />
      {children}
    </Card>
  );
};

export default ProfileCard;
