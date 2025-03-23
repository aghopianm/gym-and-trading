
import styled from "styled-components";

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

type PhotoIconProps = {
  src: string;
  alt?: string;
};

const PhotoIcon = ({ src, alt = "photo icon" }: PhotoIconProps) => {
  return (
    <IconContainer>
      <IconImage src={src} alt={alt} />
    </IconContainer>
  );
};

export default PhotoIcon;
