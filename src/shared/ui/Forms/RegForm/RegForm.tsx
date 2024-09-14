import { useState, useEffect } from "react";

import style from "./RegForm.module.scss";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { toLength } from "shared/hendlers/validators/toLength";

type LogFormProps = {
  onClose: () => void;
};

export const RegForm: React.FC<LogFormProps> = ({ onClose }) => {
  const [formValues, setFormValues] = useState({ login: null, password: null });

  const handleChange = (name: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const isValidForn = !Object.values(formValues).some((item) => item === null);

  const submitHandler = () => {
    console.log(formValues);
  };

  return (
    <div className={style.LogFormWrapper}>
      <div className={style.LogFormHeader}>Регистрация</div>
      <div className={style.InputContainer}>
        <Input
          name="name"
          placeholder="Enter name"
          validator={toLength}
          setValitedValue={handleChange}
        />
        <Input
          name="login"
          placeholder="Enter login"
          validator={toLength}
          setValitedValue={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter password"
          validator={toLength}
          setValitedValue={handleChange}
        />
      </div>
      <div className={style.ButtonContainer}>
        <Button
          cb={submitHandler}
          isActive={isValidForn}
          size={ButtonSize.M}
          theme={ButtonTheme.LIGTH}
          title="Регистрация"
          // animation="animate__animated animate__bounce"
        />

        <Button
          cb={onClose}
          isActive={true}
          size={ButtonSize.M}
          theme={ButtonTheme.LIGTH}
          title="Отмена"
          // animation="animate__animated animate__backInRight"
        />
      </div>
    </div>
  );
};
