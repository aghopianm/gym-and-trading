// src/components/Button/Button.tsx
import { StyledButton } from "./ButtonStyles";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  toggleActive,
  incrementClickCount,
} from "../store/features/button/buttonSlice";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ label, disabled = false, onClick }: ButtonProps) => {
  const dispatch = useAppDispatch();
  const { isActive} = useAppSelector((state) => state.button);

  const handleClick = () => {
    dispatch(toggleActive());
    dispatch(incrementClickCount());

    // Execute additional onClick handler if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledButton
      className={isActive ? "active" : ""}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
