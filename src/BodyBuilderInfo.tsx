import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import Button from './Button/Button';
import { incrementLikeCount } from './store/features/bodybuilders/bodybuilderSlice';

type BodybuilderInfoProps = {
    id: string;
}

const BodybuilderInfo = ({ id }: BodybuilderInfoProps) => {
    const dispatch = useAppDispatch();
    const bodybuilder = useAppSelector(state => state.bodybuilders.entities[id]);
    
    const info: Record<string, string> = {
        "jay-cutler": "Jay Cutler is a 4-time Mr. Olympia winner and one of the most successful bodybuilders in history.",
        "rich-piana": "Rich Piana was a bodybuilder and entrepreneur known for his extreme size and outspoken personality.",
        "ronnie-coleman": "Ronnie Coleman is an 8-time Mr. Olympia champion and one of the strongest bodybuilders ever."
    };

    if (!bodybuilder) {
        return <div>Bodybuilder not found.</div>;
    }
    
    const handleLike = () => {
        dispatch(incrementLikeCount(id));
    };

    return (
        <div style={{ padding: "20px", fontSize: "1.2rem" }}>
            <p>{info[id] || "Bodybuilder not found."}</p>
            <Button 
                label={`Like`}
                onClick={handleLike}
            />
            <p>Likes: {bodybuilder.likes}</p>
        </div>
    );
};

export default BodybuilderInfo;