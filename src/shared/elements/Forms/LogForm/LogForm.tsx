import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import style from "./LogForm.module.scss";
import { Button, ButtonSize, ButtonTheme } from "shared/elements/Button/Button";
import { AppDispatch } from "app/store/store";
import { showModal } from "app/store/slices/modalSlice";
import { axiosLogin } from "api/axios/userAuth";
import { userGet } from "api/axios/userGet";
import { walletGet } from "api/axios/walletGet";

type LogFormProps = {
  onClose: () => void;
};

type FormValues = {
  login: string;
  password: string;
};

export const LogForm: React.FC<LogFormProps> = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    await axiosLogin({ email: data.login, password: data.password }, dispatch);
    userGet(dispatch);
    walletGet(dispatch);
    onClose();
    dispatch(showModal({ modalType: "" }));
  };

  return (
    <div className={style.LogFormWrapper}>
      <div className={style.LogFormHeader}>Авторизация</div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.InputContainer}>
        <input
          placeholder="Введите email"
          {...register("login", { required: "Логин обязателен" })}
        />
        {errors.login && <span className={style.Error}>{errors.login.message}</span>}

        <input
          type="password"
          placeholder="Введите пароль"
          {...register("password", { required: "Пароль обязателен" })}
        />
        {errors.password && <span className={style.Error}>{errors.password.message}</span>}

        <div className={style.ButtonContainer}>
          <Button
            type="submit"
            isActive={isValid}
            size={ButtonSize.M}
            theme={ButtonTheme.LIGTH}
            title="Войти"
          />

          <Button
            type="button"
            cb={onClose}
            isActive={true}
            size={ButtonSize.M}
            theme={ButtonTheme.LIGTH}
            title="Отмена"
          />
        </div>
      </form>
    </div>
  );
};
