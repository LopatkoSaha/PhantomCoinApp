import { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./LogForm.module.scss";
import { Input } from "shared/elements/Input/Input";
import { Button, ButtonSize, ButtonTheme } from "shared/elements/Button/Button";
import { toLength } from "shared/hendlers/validators/toLength";
import { AppDispatch } from "app/store/store";
import { whoAmI } from "api/apiFetch/fetchUsers";
import { showModal } from "app/store/slices/modalSlice";

type LogFormProps = {
  onClose: () => void;
};

export const LogForm: React.FC<LogFormProps> = ({ onClose }) => {
  const [formValues, setFormValues] = useState({ login: null, password: null });

  const dispatch: AppDispatch = useDispatch();

  const handleChange = (name: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const isValidForn = !Object.values(formValues).some((item) => item === null);

  const submitHandler = () => {
    whoAmI(dispatch, {
      email: formValues.login!,
      password: formValues.password!,
    });
    onClose();
    dispatch(showModal({ modalType: "" }));
  };

  return (
    <div className={style.LogFormWrapper}>
      <div className={style.LogFormHeader}>Авторизация</div>
      <div className={style.InputContainer}>
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
          title="Войти"
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
