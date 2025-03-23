import ProfileCard from "./ProfileCard";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import Button from "./Button/Button";
import { incrementLikeCount } from "./store/features/bodybuilders/bodybuilderSlice";
import info from "./bodybuilder";

type BodybuilderInfoProps = {
  id: string;
};

const BodybuilderInfo = ({ id }: BodybuilderInfoProps) => {
  const dispatch = useAppDispatch();
  const bodybuilder = useAppSelector((state) => state.bodybuilders.entities[id]);

  if (!bodybuilder) {
    return <div>Bodybuilder not found.</div>;
  }

  const handleLike = () => {
    dispatch(incrementLikeCount(id));
  };

  return (
    <ProfileCard title={id.replace("-", " ")} imageSrc={`/images/${id}.png`}>
      <p>{info[id] || "Bodybuilder not found."}</p>
      <Button label="Like" onClick={handleLike} />
      <p>Likes: {bodybuilder.likes}</p>
    </ProfileCard>
  );
};

export default BodybuilderInfo;
