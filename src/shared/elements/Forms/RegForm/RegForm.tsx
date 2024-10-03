import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import style from "./RegForm.module.scss";
import { Input } from "shared/elements/Input/Input";
import { Button, ButtonSize, ButtonTheme } from "shared/elements/Button/Button";
import { toLength } from "shared/hendlers/validators/toLength";
import { AppDispatch } from "app/store/store";
import { setUser } from "api/apiFetch/fetchUsers";

type LogFormProps = {
  onClose: () => void;
};

export const RegForm: React.FC<LogFormProps> = ({ onClose }) => {
  const [formValues, setFormValues] = useState({
    name: null,
    email: null,
    password: null,
  });

  const dispatch: AppDispatch = useDispatch();

  const handleChange = (name: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const isValidForn = !Object.values(formValues).some((item) => item === null);

  const submitHandler = () => {
    onClose();
    setUser(dispatch, {
      name: formValues.name!,
      email: formValues.email!,
      password: formValues.password!,
    });
  };

  return (
    <div className={style.LogFormWrapper}>
      <div className={style.LogFormHeader}>Регистрация</div>
      <div className={style.InputContainer}>
        <Input
          name="name"
          placeholder="Enter name"
          setValitedValue={handleChange}
        />
        <Input
          name="email"
          placeholder="Enter email"
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
