import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import style from "./RegForm.module.scss";
import { Button, ButtonSize, ButtonTheme } from "shared/elements/Button/Button";
import { AppDispatch } from "app/store/store";
import { axiosRegistration } from "api/axios/userAuth";

type LogFormProps = {
  onClose: () => void;
};

type FormData = {
  name: string;
  email: string;
  password: string;
};

export const RegForm: React.FC<LogFormProps> = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onBlur" });

  const onSubmit = (data: FormData) => {
    axiosRegistration(data, dispatch);
    onClose();
  };

  return (
    <div className={style.LogFormWrapper}>
      <div className={style.LogFormHeader}>Регистрация</div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.InputContainer}>
        <input
          placeholder="Введите имя"
          {...register("name", { required: "Имя обязательно" })}
        />
        {errors.name && <p className={style.Error}>{errors.name.message}</p>}

        <input
          placeholder="Введите email"
          {...register("email", {
            required: "Email обязателен",
            pattern: { value: /^\S+@\S+$/i, message: "Некорректный email" },
          })}
        />
        {errors.email && <p className={style.Error}>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Введите пароль"
          {...register("password", { required: "Пароль обязателен", minLength: 4 })}
        />
        {errors.password && <p className={style.Error}>{errors.password.message}</p>}

        <div className={style.ButtonContainer}>
          <Button
            type="submit"
            isActive={isValid}
            size={ButtonSize.M}
            theme={ButtonTheme.LIGTH}
            title="Регистрация"
          />
          <Button
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
