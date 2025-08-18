import { FC } from "react";
import "./Button.scss";

interface ButtonProps {
  type: "primary" | "secondary" | "tertiary";
  btnText: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ type, btnText, onClick }) => {
  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {btnText}
    </button>
  );
};

export default Button;
