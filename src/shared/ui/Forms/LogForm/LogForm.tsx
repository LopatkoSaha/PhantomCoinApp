import { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./LogForm.module.scss";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { toLength } from "shared/hendlers/validators/toLength";
import { showMessage } from "app/store/slices/messageSlice";
import { AppDispatch } from "app/store/store";

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
    onClose();
    dispatch(
      showMessage({
        msgText: "Вы успешно залогированы",
        msgType: "success",
      })
    );
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
