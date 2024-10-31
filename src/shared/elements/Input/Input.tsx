import { InputHTMLAttributes, FC, useState } from "react";

import style from "./Input.module.scss";


interface InputProps {
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  validator?: (data: string) => boolean;
  setValitedValue: (name: string, value: any) => void;
}

export const Input: FC<InputProps> = (props) => {
  const { name, type = 'text', placeholder, validator = (data) => true, setValitedValue } = props;

  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const valid = validator(newValue);
    setIsValid(valid);

    setValitedValue(name, valid ? newValue : null)
  };

  return (
      <input
        className={isValid ? `${style.isValid}` : `${style.noValid}`}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
      />
  );
};
