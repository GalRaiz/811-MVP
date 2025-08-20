import { FC, ReactNode } from "react";
import "./Button.scss";

type ButtonType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "alert"
  | "success"
  | "warning"
  | "cancel"
  | "info"
  | "transparent-on-light"
  | "transparent-on-dark"
  | "icon-only"
  | "close"
  | "clear"
  | "reset";

type ButtonSize = "small" | "medium" | "large";
type IconPosition = "left" | "right";

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  btnText?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  icon?: ReactNode; 
  iconPosition?: IconPosition;
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  type = "primary",
  size = "medium",
  btnText,
  onClick,
  isDisabled = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
}) => {
  const classNames = [
    "btn",
    `btn--${type}`,
    `btn--${size}`,
    icon && iconPosition === "right" ? "btn--icon-right" : "",
    fullWidth ? "btn--fullWidth" : "",
    isDisabled ? "btn--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} onClick={onClick} disabled={isDisabled}>
      {icon && <span className="btn__icon">{icon}</span>}
      {btnText && <span className="btn__text">{btnText}</span>}
    </button>
  );
};

export default Button;
