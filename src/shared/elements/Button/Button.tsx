import { ButtonHTMLAttributes, FC } from "react";

import style from "./Button.module.scss";

export enum ButtonTheme {
  LIGTH = "light",
  DARK = "dark",
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  cb?: () => void;
  isActive?: boolean;
  size?: ButtonSize;
  theme?: ButtonTheme;
  animation?: string;
  title: string;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    cb,
    isActive = true,
    size = ButtonSize.M,
    theme = ButtonTheme.LIGTH,
    animation,
    title,
  } = props;


  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(typeof cb === "function") cb();
  };

  return (
    <button
      className={`${style.Button} ${style[size]} ${style[theme]} ${animation}`}
      onClick={cb}
      onTouchEnd={handleTouchEnd}
      disabled={!isActive}
    >
      {title}
    </button>
  );
};
